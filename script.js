/* ============================================
   CYBERSECURITY PORTFOLIO - SCRIPT.JS
   Interactive features and animations
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // INITIALIZATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeToggle();
    initEmailCopy();
    initContactForm();
    initScrollEffects();
    initYearUpdate();
    initPrintButton();
    initTypingEffect();
    initParticles();
  });

  // ============================================
  // NAVIGATION
  // ============================================
  
  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');
    const navLinks = primaryNav.querySelectorAll('a');
    
    if (!navToggle || !primaryNav) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('active');
      
      // Animate hamburger icon
      navToggle.style.transform = primaryNav.classList.contains('active') 
        ? 'rotate(90deg)' 
        : 'rotate(0deg)';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          primaryNav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.style.transform = 'rotate(0deg)';
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !primaryNav.contains(e.target) && 
          !navToggle.contains(e.target) &&
          primaryNav.classList.contains('active')) {
        primaryNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.style.transform = 'rotate(0deg)';
      }
    });
    
    // Smooth scroll with offset for fixed header
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // ============================================
  // THEME TOGGLE (Dark/Light)
  // ============================================
  
  function initThemeToggle() {
    const toggle = document.getElementById('color-toggle');
    if (!toggle) return;
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = `theme-${currentTheme}`;
    toggle.setAttribute('aria-pressed', currentTheme === 'light');
    
    toggle.addEventListener('click', function() {
      const isDark = document.body.classList.contains('theme-dark');
      const newTheme = isDark ? 'light' : 'dark';
      
      document.body.className = `theme-${newTheme}`;
      localStorage.setItem('theme', newTheme);
      toggle.setAttribute('aria-pressed', newTheme === 'light');
      
      // Add pulse animation
      toggle.style.transform = 'scale(1.2)';
      setTimeout(() => {
        toggle.style.transform = 'scale(1)';
      }, 200);
    });
  }

  // ============================================
  // EMAIL COPY FUNCTIONALITY
  // ============================================
  
  function initEmailCopy() {
    const copyButtons = document.querySelectorAll('[id^="copy-email"]');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();
        const email = this.getAttribute('data-email');
        
        try {
          await navigator.clipboard.writeText(email);
          showCopyFeedback(this, 'Copied!');
        } catch (err) {
          // Fallback for older browsers
          fallbackCopy(email);
          showCopyFeedback(this, 'Copied!');
        }
      });
    });
  }
  
  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  
  function showCopyFeedback(button, message) {
    const originalText = button.textContent;
    button.textContent = message;
    button.style.color = '#20e6d2';
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.color = '';
    }, 2000);
  }

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    
    if (!form || !statusDiv) return;
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validate
      if (!name || !email || !message) {
        showFormStatus('error', 'Please fill in all fields.');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormStatus('error', 'Please enter a valid email address.');
        return;
      }
      
      // Simulate form submission (replace with actual endpoint)
      showFormStatus('success', 'Message sent! (Demo mode - form not actually submitted)');
      
      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';
      }, 5000);
    });
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function showFormStatus(type, message) {
    const statusDiv = document.getElementById('form-status');
    statusDiv.textContent = message;
    statusDiv.className = `form-status ${type}`;
  }

  // ============================================
  // SCROLL EFFECTS
  // ============================================
  
  function initScrollEffects() {
    let ticking = false;
    
    // Parallax header effect
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    function updateScrollEffects() {
      const scrolled = window.pageYOffset;
      
      // Add shadow to header when scrolled
      if (scrolled > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      }
      
      // Reveal elements on scroll
      revealOnScroll();
    }
  }
  
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  // ============================================
  // YEAR UPDATE (Footer)
  // ============================================
  
  function initYearUpdate() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // ============================================
  // PRINT BUTTON
  // ============================================
  
  function initPrintButton() {
    const printBtn = document.getElementById('print-resume');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.print();
    });
  }

  // ============================================
  // TYPING EFFECT (Hero subtitle)
  // ============================================
  
  function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        subtitle.style.borderRight = 'none';
      }
    }
    
    // Add blinking cursor effect
    subtitle.style.borderRight = '2px solid #20e6d2';
    subtitle.style.paddingRight = '5px';
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }

  // ============================================
  // PARTICLE EFFECT (Optional enhancement)
  // ============================================
  
  function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    canvas.style.zIndex = '0';
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Resize canvas
    function resizeCanvas() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = `rgba(155, 92, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    function initParticleArray() {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      connectParticles();
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Connect nearby particles
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(155, 92, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    initParticleArray();
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  }

  // ============================================
  // KEYBOARD NAVIGATION ENHANCEMENTS
  // ============================================
  
  // Trap focus in mobile menu when open
  document.addEventListener('keydown', function(e) {
    const nav = document.getElementById('primary-nav');
    if (!nav || !nav.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      const navToggle = document.getElementById('nav-toggle');
      nav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  // ============================================
  // PERFORMANCE: Intersection Observer
  // ============================================
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // EASTER EGG: Konami Code
  // ============================================
  
  (function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateMatrixMode();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });
    
    function activateMatrixMode() {
      document.body.style.transition = 'all 1s ease';
      document.body.style.filter = 'hue-rotate(120deg) saturate(2)';
      
      setTimeout(() => {
        alert('🎮 Matrix Mode Activated! You found the Konami Code!');
        document.body.style.filter = '';
      }, 2000);
    }
  })();

  // ============================================
  // PERFORMANCE MONITORING (Development)
  // ============================================
  
  if (window.performance && console.time) {
    console.time('Page Load');
    window.addEventListener('load', function() {
      console.timeEnd('Page Load');
      
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Total page load time: ${pageLoadTime}ms`);
    });
  }

})();
