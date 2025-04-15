// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
};

// Apply the current theme
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getCurrentTheme());

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll to top button functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Skills scroll functionality
const skillsContainer = document.querySelector('.skills-scroll-container');
let isDown = false;
let scrollLeft;
let scrollInterval;
let scrollDirection = 1;
const scrollSpeed = 1;

// Initialize container scroll position and cursor style
skillsContainer.scrollLeft = 0;

// Auto scroll functionality
function autoScroll() {
    const maxScroll = skillsContainer.scrollWidth - skillsContainer.clientWidth;
    
    if (scrollDirection > 0 && skillsContainer.scrollLeft >= maxScroll) {
        scrollDirection = -1; // Reverse direction at the end
    } else if (scrollDirection < 0 && skillsContainer.scrollLeft <= 0) {
        scrollDirection = 1; // Reverse direction at the start
    }
    
    skillsContainer.scrollLeft += scrollSpeed * scrollDirection;
    
}

function startAutoScroll() {
    stopAutoScroll(); // Clear any existing interval
    scrollInterval = setInterval(autoScroll, 30);
}

function stopAutoScroll() {
    if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

startAutoScroll();


skillsContainer.addEventListener('mouseenter', stopAutoScroll);
skillsContainer.addEventListener('mouseleave', startAutoScroll);


skillsContainer.addEventListener('touchstart', stopAutoScroll);
skillsContainer.addEventListener('touchend', startAutoScroll);
