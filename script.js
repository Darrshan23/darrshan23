// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Enhanced Intersection Observer for Smooth Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            entry.target.classList.add('animate-in');
            
            // Optional: Stop observing after animation (remove if you want repeat animations)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements with staggered delays
const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category, .timeline-item, .cert-item, .contact-item, .about-text, .about-details'
);

animatedElements.forEach((el, index) => {
    // Add initial hidden state
    el.classList.add('fade-in-element');
    
    // Add staggered delay for elements in the same section
    const delay = (index % 4) * 0.1; // Stagger by 0.1s for every 4 items
    el.style.transitionDelay = `${delay}s`;
    
    observer.observe(el);
});

// Separate observer for section titles
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('title-animate-in');
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('fade-in-title');
    titleObserver.observe(title);
});

// Active Navigation Link Highlight
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Typing Effect for Hero Section (Optional Enhancement)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            subtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Parallax Effect for Cyber Grid
window.addEventListener('scroll', () => {
    const cyberGrid = document.querySelector('.cyber-grid');
    const scrolled = window.pageYOffset;
    cyberGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Project Cards Hover Effect Enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Skill Items Interactive Effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
    
    item.addEventListener('click', () => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = '';
        }, 10);
    });
});

// Add glitch effect to main title on hover
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.style.animation = 'glitchPulse 0.3s infinite';
    });
    
    glitchTitle.addEventListener('mouseleave', () => {
        glitchTitle.style.animation = 'glitchPulse 3s infinite';
    });
}

// Console Easter Egg
console.log('%c🔒 Cybersecurity Portfolio', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Darrshan Erettai Muniandy', 'color: #a78bfa; font-size: 14px;');
console.log('%cInterested in the code? Feel free to reach out!', 'color: #94a3b8; font-size: 12px;');

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Detect scroll direction for additional effects
let scrollDirection = 'down';
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);
