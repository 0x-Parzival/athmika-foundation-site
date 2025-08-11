// Personal Branding Website JavaScript
// Enhanced functionality for Amarjeet Kumar's website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Initialize all features
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initNavbarScrollEffect();
    initScrollProgressIndicator();
    
    // Delay some animations for better UX
    setTimeout(() => {
        initTypingEffect();
        initInteractiveBackground();
    }, 2000);
});

// Smooth scrolling for navigation links - FIXED
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    console.log(`Scrolling to section: ${targetId}`);
                }
            }
        });
    });
}

// Animated counters for statistics - ENHANCED
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Starting counter animation');
                entry.target.closest('.stat-card').classList.add('animated');
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate individual counter - ENHANCED
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500; // 2.5 seconds for better visibility
    const frameRate = 60;
    const increment = target / (duration / (1000 / frameRate));
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
            console.log(`Counter completed: ${target}`);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 1000 / frameRate);
}

// Format numbers with commas
function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('en-IN');
    }
    return num.toString();
}

// Initialize scroll animations - ENHANCED
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.focus-card, .quote-card, .contact-card');
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    console.log('Element animated:', entry.target.className);
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar scroll effect - ENHANCED
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Enhanced background blur based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 30px rgba(255, 107, 53, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll progress indicator
function initScrollProgressIndicator() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(Math.max(scrollProgress, 0), 100) + '%';
    });
}

// Add dynamic text typing effect to hero quote
function initTypingEffect() {
    const quoteHindi = document.querySelector('.hero-quote .quote-hindi');
    const quoteEnglish = document.querySelector('.hero-quote .quote-english');
    
    if (quoteHindi && quoteEnglish) {
        const hindiText = quoteHindi.textContent;
        const englishText = quoteEnglish.textContent;
        
        // Clear initial text
        quoteHindi.textContent = '';
        quoteEnglish.textContent = '';
        quoteHindi.style.opacity = '1';
        quoteEnglish.style.opacity = '1';
        
        console.log('Starting typing effect');
        
        // Type Hindi text first
        setTimeout(() => {
            typeText(quoteHindi, hindiText, 100, () => {
                // Type English text after Hindi is complete
                setTimeout(() => {
                    typeText(quoteEnglish, englishText, 80);
                }, 800);
            });
        }, 1000);
    }
}

// Text typing animation
function typeText(element, text, speed, callback) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// Add interactive background elements
function initInteractiveBackground() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = 'rgba(255, 255, 255, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `floatParticle ${6 + Math.random() * 4}s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.zIndex = '1';
            
            hero.appendChild(particle);
        }
        
        console.log('Interactive background particles added');
    }
}

// Enhanced hover effects for cards
function initEnhancedHoverEffects() {
    const cards = document.querySelectorAll('.focus-card, .contact-card, .stat-card, .quote-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 50px rgba(255, 107, 53, 0.25)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.15)';
        });
    });
}

// Initialize enhanced hover effects
initEnhancedHoverEffects();

// Initialize image slider when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallerySlider();
});

// Initialize the gallery slider
function initGallerySlider() {
    console.log('Initializing gallery slider...');
    
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || slides.length === 0) {
        console.error('❌ Slider or slides not found');
        return;
    }
    
    console.log(`Found ${slides.length} slides`);
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots for navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });
    
    console.log('✨ Gallery slider initialized');
}

// Mouse movement parallax effect for hero image
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.scrollY < window.innerHeight) {
        const moveX = (mouseX - 0.5) * 15;
        const moveY = (mouseY - 0.5) * 15;
        
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Section reveal animations
function initSectionRevealAnimations() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                console.log('Section revealed:', entry.target.id);
            }
        });
    }, options);
    
    sections.forEach(section => {
        section.style.opacity = '0.9';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Initialize section reveal animations
initSectionRevealAnimations();

// Add CSS animations dynamically
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-15px) translateX(5px) rotate(90deg);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-25px) translateX(10px) rotate(180deg);
                opacity: 1;
            }
            75% {
                transform: translateY(-15px) translateX(5px) rotate(270deg);
                opacity: 0.8;
            }
        }
        
        .section-revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-link.active {
            color: var(--primary-orange);
            font-weight: 600;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .enhanced-hover {
            transform: translateY(-5px) scale(1.02) !important;
            box-shadow: 0 20px 40px rgba(255, 107, 53, 0.3) !important;
        }
    `;
    document.head.appendChild(style);
}

// Add custom animations
addCustomAnimations();

// Smooth reveal for profile image
function initProfileImageReveal() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        setTimeout(() => {
            profilePlaceholder.style.opacity = '1';
            profilePlaceholder.style.transform = 'scale(1)';
        }, 1500);
        
        // Initial state
        profilePlaceholder.style.opacity = '0';
        profilePlaceholder.style.transform = 'scale(0.9)';
        profilePlaceholder.style.transition = 'opacity 1s ease, transform 1s ease';
    }
}

// Initialize profile image reveal
initProfileImageReveal();

// Add loading animation for better UX
function showLoadingComplete() {
    console.log('✅ Amarjeet Kumar\'s website loaded successfully!');
    console.log('✅ All animations and interactions are ready');
    console.log('✅ Navigation links are functional');
    console.log('✅ Counter animations will trigger on scroll');
    console.log('✅ Orange ribbon animation is active');
}

// Show loading complete message
setTimeout(showLoadingComplete, 3000);

// Accessibility enhancements
function initAccessibilityFeatures() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation .nav-link:focus,
        .keyboard-navigation .btn:focus {
            outline: 2px solid var(--primary-orange);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize accessibility features
initAccessibilityFeatures();

// Image Slider Functionality
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Show current slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide and update dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start auto slide
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Stop auto slide
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideShow();
            startSlideShow();
        });
    });
    
    // Pause on hover
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', stopSlideShow);
    slider.addEventListener('mouseleave', startSlideShow);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        }
    });
    
    // Initialize first slide and start slideshow
    showSlide(currentSlide);
    startSlideShow();
}