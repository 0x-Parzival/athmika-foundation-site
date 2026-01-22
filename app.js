/*
   Aathmika Foundation - Ethereal Patriotism Interactive Layer
   "Motion & Physics"
*/

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallaxEffects();
    init3DTilt();
    initNavbarScroll();
    initTypingHero();
    initSmoothAnchors();
    initAnimatedCounters();
    initSingleFlag();
});

/* --- 6. SINGLE WAVY SCROLL FLAG --- */
function initSingleFlag() {
    const canvas = document.getElementById('patriotic-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.05; // Wave speed

        const scrollY = window.scrollY;
        // Make the flag wave phase interact slightly with scroll for dynamic feel
        const scrollFactor = scrollY * 0.005;

        // Flag dimensions
        const flagWidth = Math.min(width * 0.8, 600);
        const flagHeight = flagWidth * 0.6; // 3:2 ratio

        // Position: Centered horizontally, slight float vertically
        const startX = (width - flagWidth) / 2;
        const startY = (height - flagHeight) / 2 + Math.sin(time * 0.5) * 10;

        const amplitude = 15;
        const frequency = 0.015;
        const boxHeight = flagHeight / 3;

        // Helper to draw wavy strip
        function drawStrip(color, yOffset) {
            ctx.fillStyle = color;
            ctx.beginPath();

            // Top edge
            for (let x = 0; x <= flagWidth; x += 10) {
                const y = Math.sin((x * frequency) + time + scrollFactor) * amplitude;
                ctx.lineTo(startX + x, startY + y + yOffset);
            }

            // Right edge down
            const yRight = Math.sin((flagWidth * frequency) + time + scrollFactor) * amplitude;
            ctx.lineTo(startX + flagWidth, startY + yRight + yOffset + boxHeight);

            // Bottom edge back
            for (let x = flagWidth; x >= 0; x -= 10) {
                const y = Math.sin((x * frequency) + time + scrollFactor) * amplitude;
                ctx.lineTo(startX + x, startY + y + yOffset + boxHeight);
            }

            ctx.closePath();
            ctx.fill();
        }

        // Draw Stripes (Translucent)
        drawStrip('rgba(255, 153, 51, 0.25)', 0);      // Saffron
        drawStrip('rgba(255, 255, 255, 0.25)', boxHeight);  // White
        drawStrip('rgba(19, 136, 8, 0.25)', boxHeight * 2); // Green

        // Draw Chakra (simplified blue circle with spokes)
        const midX = flagWidth / 2;
        const midY = startY + boxHeight * 1.5 + Math.sin((midX * frequency) + time + scrollFactor) * amplitude;
        const radius = boxHeight * 0.4;

        ctx.save();
        ctx.translate(startX + midX, midY);
        // Rotate chakra slowly
        ctx.rotate(time * 0.2);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 0, 128, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Spokes
        ctx.beginPath();
        for (let i = 0; i < 24; i++) {
            ctx.moveTo(0, 0);
            const angle = (Math.PI * 2 * i) / 24;
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx.strokeStyle = 'rgba(0, 0, 128, 0.2)';
        ctx.stroke();
        ctx.restore();

        requestAnimationFrame(animate);
    }

    animate();
}


/* --- 0. STATISTICS COUNTERS --- */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = { threshold: 0.5, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;

    const duration = 2000;
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    const increment = target / totalFrames;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('en-IN');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('en-IN');
        }
    }, 1000 / frameRate);
}


/* --- 1. STAGGERED REVEAL ANIMATIONS --- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.hero-text, .hero-image, .section-header, .glass-card, .sector-card, .focus-card, .media-item');

    elementsToReveal.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

        // Add specific class for CSS to trigger
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });

    // Dynamic Style Injection for Reveal Class
    const style = document.createElement('style');
    style.textContent = `
        .revealed { opacity: 1 !important; transform: translateY(0) !important; }
        .reveal-item:nth-child(1) { transition-delay: 0.1s; }
        .reveal-item:nth-child(2) { transition-delay: 0.2s; }
        .reveal-item:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

/* --- 2. HERO PARALLAX & MOUSE PHYSICS --- */
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image');
    const decorations = document.querySelectorAll('.lotus-decoration');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        if (heroImage) {
            const rotX = (mouseY - 0.5) * 10;
            const rotY = (mouseX - 0.5) * -10;
            heroImage.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }

        decorations.forEach((dec, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            dec.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/* --- 3. 3D TILT EFFECT FOR CARDS --- */
function init3DTilt() {
    const cards = document.querySelectorAll('.glass-card, .media-item');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = 'none'; // Instant follow
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.5s ease-out';
        });
    });
}

/* --- 4. FLOATING NAVBAR LOGIC --- */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* --- 5. SMOOTH SCROLL ANCHORS --- */
function initSmoothAnchors() {
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
}

/* --- 6. TYPING EFFECT FOR HERO --- */
function initTypingHero() {
    const quotes = [
        { text: "Service is the cement that binds life with love and trust", lang: "en" },
        { text: "सेवा ही वह सिमेंट है जो जीवन को प्रेम और विश्वास के साथ जोड़े रखता है", lang: "hi" }
    ];

    // Simple rotation logic if needed, or just static elegant display
    // For now, let's keep the CSS animation do the heavy lifting for the gradient text
}