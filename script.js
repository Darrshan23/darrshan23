/**
 * Evolved Hackers Club Website
 * Main JavaScript file for interactivity and animations
 */

// DOM Elements
const navToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Countdown Elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// CTF Event Date (November 15, 2023)
const ctfDate = new Date('Nov 15, 2023 09:00:00').getTime();

/**
 * Initialize all event listeners and functions
 */
function init() {
    // Mobile navigation toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Hide scroll indicator after user starts scrolling
    window.addEventListener('scroll', handleScroll);
    
    // Set current year in footer (if needed)
    setCurrentYear();
    
    console.log('Evolved Hackers Club website initialized');
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Animate hamburger to X
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('active');
}

/**
 * Close mobile navigation menu
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // In a real implementation, you would send this data to a server
    // For this demo, we'll just show a success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent!';
    submitBtn.disabled = true;
    submitBtn.classList.add('success');
    
    // Reset form
    contactForm.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('success');
    }, 3000);
    
    console.log('Form submitted:', { name, email, message });
}

/**
 * Update the CTF countdown timer
 */
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = ctfDate - now;
    
    // If the event has passed
    if (timeRemaining < 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Update display
    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Handle scroll events
 */
function handleScroll() {
    // Hide scroll indicator after user scrolls down 100px
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
    
    // Add active class to nav links based on scroll position
    highlightNavOnScroll();
}

/**
 * Highlight navigation links based on scroll position
 */
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

/**
 * Set current year in footer (if needed)
 */
function setCurrentYear() {
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
}

/**
 * Add some interactive effects to team member cards
 */
function enhanceTeamCards() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            member.style.boxShadow = '0 20px 40px -20px rgba(100, 255, 218, 0.3)';
        });
        
        member.addEventListener('mouseleave', () => {
            // Restore original shadow
            member.style.boxShadow = '';
        });
    });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Also initialize team card enhancements
document.addEventListener('DOMContentLoaded', enhanceTeamCards);