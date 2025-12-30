// ===========================
// QA Engineer Portfolio - Anti-Gravity Space Theme
// ===========================

// ===========================
// Star Particle System
// ===========================
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star particle class
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity >= 1 || this.opacity <= 0.3) {
            this.twinkleDirection *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();

        // Add glow effect for larger stars
        if (this.size > 1.5) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'rgba(162, 136, 140, 0.5)';
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

// Create stars
const stars = [];
const starCount = 150;

for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Animation loop
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// ===========================
// Navigation & Mobile Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// Smooth Scrolling
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Active Link on Scroll
// ===========================
const sections = document.querySelectorAll('section');

function setActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// ===========================
// Navbar Glass Effect Enhancement on Scroll
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.08)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});

// ===========================
// Dynamic Navbar Theme (Light/Dark)
// ===========================
function updateNavbarTheme() {
    const scrollPosition = window.scrollY + 100; // Offset for navbar height
    const whiteSections = ['skills', 'projects']; // IDs of sections with white background
    let isWhiteSection = false;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (whiteSections.includes(sectionId)) {
                isWhiteSection = true;
            }
        }
    });

    if (isWhiteSection) {
        navbar.classList.add('navbar-light-theme');
    } else {
        navbar.classList.remove('navbar-light-theme');
    }
}

window.addEventListener('scroll', updateNavbarTheme);
window.addEventListener('load', updateNavbarTheme);

// ===========================
// Skill Progress Bar Animation
// ===========================
const skillCards = document.querySelectorAll('.skill-card');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const skillCard = entry.target;
            const progressBar = skillCard.querySelector('.skill-progress-bar');
            const targetProgress = skillCard.getAttribute('data-progress');

            // Add staggered delay
            setTimeout(() => {
                progressBar.style.width = targetProgress + '%';
                skillCard.classList.add('animated');

                // Remove animation class after animation completes
                setTimeout(() => {
                    skillCard.classList.remove('animated');
                }, 2000);
            }, index * 100);

            skillsObserver.unobserve(skillCard);
        }
    });
}, {
    threshold: 0.2
});

skillCards.forEach(card => {
    skillsObserver.observe(card);
});

// ===========================
// Scroll Reveal Animation for Cards
// ===========================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .project-card, .soft-skill-card');

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for reveal elements
window.addEventListener('load', () => {
    const reveals = document.querySelectorAll('.service-card, .project-card, .soft-skill-card');
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Trigger reveal on scroll
window.addEventListener('scroll', revealOnScroll);

// Initial check
revealOnScroll();

// ===========================
// Contact Form Validation
// ===========================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (nameValue.length < 3) {
        nameError.textContent = 'Name must be at least 3 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validateMessage() {
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
        messageError.textContent = 'Message is required';
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

// Real-time validation on input
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show success message
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Clear error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // Log form data (in production, send to server)
        console.log('Form submitted successfully!');
    }
});

// ===========================
// Enhanced Glassmorphism Hover Effects
// ===========================
const glassElements = document.querySelectorAll('.glass-card, .service-card, .project-card');

glassElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    element.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        // Subtle 3D tilt effect
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    element.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Theme Toggle (Optional - For Future Enhancement)
// ===========================
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Placeholder for theme toggle functionality
        console.log('Theme toggle clicked - can be enhanced in future');
    });
}

// ===========================
// Parallax Effect on Hero Image
// ===========================
const heroImage = document.querySelector('.hero-image-wrapper');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;

        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ===========================
// Add Floating Animation to Random Elements
// ===========================
const floatingElements = document.querySelectorAll('.skill-card, .service-card');

floatingElements.forEach((element, index) => {
    const delay = index * 0.5;
    element.style.animationDelay = `${delay}s`;
});

// ===========================
// Performance Optimization - Reduce Animations on Low-End Devices
// ===========================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.floating').forEach(el => {
        el.style.animation = 'none';
    });
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🚀 QA Engineer Portfolio', 'color: #3A7D44; font-size: 20px; font-weight: bold;');
console.log('%c✨ Anti-Gravity Space Theme Active', 'color: #a2888c; font-size: 14px;');
console.log('%cGlassmorphism effects and floating animations enabled!', 'color: #6B7280; font-size: 12px;');

// ===========================
// Page Load Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});
