// ===================================
// Text Scramble Effect
// ===================================
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.element.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// ===================================
// Terminal Typing Effect
// ===================================
class TerminalTyping {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.index = 0;
        this.speed = options.speed || 80;
        this.variableSpeed = options.variableSpeed !== false;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;

            // Variable speed - faster for vowels, slower for punctuation
            let nextDelay = this.speed;
            const char = this.text.charAt(this.index - 1);

            if (this.variableSpeed) {
                if ('aeiou'.includes(char.toLowerCase())) {
                    nextDelay = this.speed * 0.6;
                } else if ('.!?,;:'.includes(char)) {
                    nextDelay = this.speed * 3;
                } else if (char === ' ') {
                    nextDelay = this.speed * 0.5;
                }
            }

            setTimeout(() => this.type(), nextDelay);
        }
    }

    start() {
        this.element.textContent = '';
        setTimeout(() => this.type(), 300);
    }
}

// ===================================
// Enhanced Scroll Reveal with IntersectionObserver
// ===================================
class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal-on-scroll');
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.reveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        this.revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    reveal(element) {
        element.classList.add('revealed');

        // Check for staggered children
        const staggerChildren = element.querySelectorAll('.skill-tag, .cert-item, .job-responsibilities li');

        if (staggerChildren.length > 0) {
            this.staggerReveal(staggerChildren);
        }
    }

    staggerReveal(children) {
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('stagger-item');
                child.style.animationDelay = `${index * 0.1}s`;
            }, index * 100);
        });
    }
}

// ===================================
// Sticky Navigation with Smooth Slide
// ===================================
class StickyNav {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.scrollThreshold = 100;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Optional: Hide on scroll down, show on scroll up
        // if (currentScroll > this.lastScroll && currentScroll > 300) {
        //     this.navbar.classList.add('hidden');
        // } else {
        //     this.navbar.classList.remove('hidden');
        // }

        this.lastScroll = currentScroll;
    }
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
class SmoothScroll {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
        });

        // Also handle scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const experienceSection = document.querySelector('#experience');
                if (experienceSection) {
                    this.scrollToElement(experienceSection);
                }
            });
        }

        // Handle contact button
        const contactBtn = document.querySelector('.btn-secondary');
        if (contactBtn && contactBtn.getAttribute('href') === '#contact') {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    this.scrollToElement(contactSection);
                }
            });
        }
    }

    handleClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            this.scrollToElement(targetElement);
        }
    }

    scrollToElement(element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Active Navigation Link Highlighting
// ===================================
class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
    }

    updateActiveLink() {
        let current = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--neon-cyan)';
            }
        });
    }
}

// ===================================
// Scroll Indicator Fade Out
// ===================================
class ScrollIndicatorControl {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        if (!this.indicator) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        if (window.pageYOffset > 200) {
            this.indicator.style.opacity = '0';
            this.indicator.style.pointerEvents = 'none';
        } else {
            this.indicator.style.opacity = '1';
            this.indicator.style.pointerEvents = 'auto';
        }
    }
}

// ===================================
// Animated Grid Background (Canvas - Optional Enhancement)
// ===================================
class AnimatedGridCanvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.maxDistance = 150;

        this.init();
    }

    init() {
        // Only run on desktop for performance
        if (window.innerWidth < 768) return;

        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.1;
            pointer-events: none;
        `;

        document.body.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00f3ff';
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.5})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Footer Year Update
// ===================================
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear}`;
    }
}

// ===================================
// Page Load Fade In
// ===================================
function pageLoadAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===================================
// Performance Monitor (Development Only)
// ===================================
function performanceMonitor() {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        let lastTime = performance.now();
        let frames = 0;

        function checkFPS() {
            const currentTime = performance.now();
            frames++;

            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                console.log(`FPS: ${fps}`);
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(checkFPS);
        }

        requestAnimationFrame(checkFPS);
    }
}

// ===================================
// Console Easter Egg
// ===================================
function consoleArt() {
    console.log(`
%c╔════════════════════════════════════╗
%c║  DARRSHAN ERETTAI MUNIANDY        ║
%c║  Cybersecurity Analyst             ║
%c║                                    ║
%c║  System Status: ONLINE             ║
%c║  Security Level: MAXIMUM           ║
%c║  Access: GRANTED                   ║
%c║                                    ║
%c║  darrshan2003@gmail.com           ║
%c╚════════════════════════════════════╝
`,
        'color: #00f3ff; font-weight: bold; font-family: monospace;',
        'color: #00ff9d; font-family: monospace;',
        'color: #00f3ff; font-family: monospace;',
        'color: #00f3ff; font-family: monospace;',
        'color: #00ff9d; font-family: monospace;',
        'color: #00ff9d; font-family: monospace;',
        'color: #00ff9d; font-family: monospace;',
        'color: #00f3ff; font-family: monospace;',
        'color: #00f3ff; font-family: monospace;',
        'color: #00f3ff; font-weight: bold; font-family: monospace;'
    );

    console.log('%c[SYSTEM] Welcome to the cyber interface. All systems operational. 🔐',
        'color: #00f3ff; font-size: 14px; font-weight: bold; font-family: monospace;');
}

// ===================================
// Initialize All Functions
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Page load animation
    pageLoadAnimation();

    // Core text effects (with delays for sequential appearance)
    setTimeout(() => {
        const nameElement = document.querySelector('.glitch');
        if (nameElement) {
            const scramble = new TextScramble(nameElement);
            scramble.setText('Darrshan Erettai Muniandy');
        }
    }, 500);

    setTimeout(() => {
        const subtitleElement = document.querySelector('.typewriter');
        if (subtitleElement) {
            const typing = new TerminalTyping(
                subtitleElement,
                'Cybersecurity Analyst | Web Developer',
                { speed: 80, variableSpeed: true }
            );
            typing.start();
        }
    }, 2500); // Start after scramble completes

    // Scroll-based features
    new ScrollReveal();
    new StickyNav();
    new SmoothScroll();
    new ActiveNavLink();
    new ScrollIndicatorControl();

    // Optional: Animated particle background (comment out if too heavy)
    // new AnimatedGridCanvas();

    // Utilities
    updateFooterYear();
    consoleArt();

    // Performance monitoring (development only)
    // performanceMonitor();
});

// ===================================
// Optimized Scroll Event Debouncing
// ===================================
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll handlers are already attached with passive listeners
        // This just ensures we're using RAF for any custom scroll logic
    });
}, { passive: true });

// ===================================
// Prevent Animation Jank on Resize
// ===================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Force reflow for any layout-dependent animations
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
    }, 250);
});
