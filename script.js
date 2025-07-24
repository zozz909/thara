// Welcome Music Functionality
function initWelcomeMusic() {
    const welcomeAudio = document.getElementById('welcomeAudio');

    if (welcomeAudio) {
        // Set volume to 50% for better user experience
        welcomeAudio.volume = 0.5;

        // Function to play welcome music
        function playWelcomeMusic() {
            // Check if audio can be loaded
            if (welcomeAudio.readyState === 0) {
                console.log('Audio file not found or cannot be loaded');
                return;
            }

            welcomeAudio.currentTime = 0; // Start from beginning

            const playPromise = welcomeAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Welcome music started playing');

                    // Stop music after 10 seconds
                    setTimeout(() => {
                        welcomeAudio.pause();
                        welcomeAudio.currentTime = 0;
                        console.log('Welcome music stopped after 10 seconds');
                    }, 20000); // 10 seconds

                }).catch(error => {
                    console.log('Auto-play was prevented or audio error:', error);
                    // Auto-play was blocked, but we won't show a play button
                });
            }
        }

        // Handle audio loading errors
        welcomeAudio.addEventListener('error', function(e) {
            console.log('Audio loading error:', e);
            console.log('Please add a welcome-music.mp3 file to the assets folder');
        });

        welcomeAudio.addEventListener('canplaythrough', function() {
            console.log('Audio file loaded successfully');
        });



        // Try to play music when page loads
        window.addEventListener('load', function() {
            // Small delay to ensure everything is loaded
            setTimeout(playWelcomeMusic, 500);
        });

        // Also try when user first interacts with page
        let hasInteracted = false;
        function handleFirstInteraction() {
            if (!hasInteracted) {
                hasInteracted = true;
                playWelcomeMusic();
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('touchstart', handleFirstInteraction);
                document.removeEventListener('keydown', handleFirstInteraction);
            }
        }

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
    }
}

// Initialize welcome music
initWelcomeMusic();

// Enhanced Performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Comprehensive mobile optimization
    if (window.innerWidth <= 768) {
        // Reduce image quality on mobile for better performance
        const images = document.querySelectorAll('img[src*=".jpg"], img[src*=".png"]');
        images.forEach(img => {
            if (img.src.includes('unsplash')) {
                img.src = img.src.replace('w=1920&q=80', 'w=800&q=60');
            }
        });

        // Disable parallax effects on mobile for better performance
        document.body.classList.add('mobile-device');

        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }

    // Detect if device is mobile
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
        document.body.classList.add('is-mobile');
    }

// Smooth scrolling for navigation links
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Enhanced navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Counter animation for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Enhanced responsive design helper
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function isTablet() {
        return window.innerWidth <= 992 && window.innerWidth > 768;
    }

    function isDesktop() {
        return window.innerWidth > 992;
    }

    // Optimized parallax effect (disabled on mobile for performance)
    let ticking = false;

    function updateParallax() {
        if (isMobile()) return; // Skip parallax on mobile

        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection) {
            const rate = scrolled * -0.2;
            heroSection.style.transform = `translateY(${rate}px)`;
        }

        ticking = false;
    }

    if (!isMobile()) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Counter animation for statistics (if needed in future)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Form validation and submission (for future contact forms)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
        
        return isValid;
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Enhanced mobile menu functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (navbarToggler && navbarCollapse) {
        // Close menu when clicking on nav links (mobile)
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992 && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });

        // Improve mobile menu accessibility
        navbarToggler.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navbarToggler.click();
            }
        });
    }

    // Touch-friendly enhancements
    if ('ontouchstart' in window) {
        // Add touch class to body for CSS targeting
        document.body.classList.add('touch-device');

        // Improve button touch targets
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.minHeight = '44px'; // iOS recommended touch target
        });

        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            });

            input.addEventListener('blur', function() {
                const viewport = document.querySelector('meta[name="viewport"]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }
            });
        });
    }
    
    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top btn btn-primary';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        border: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Enhanced loading animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            // Add a minimum loading time for better UX
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 1500); // Minimum 1.5 seconds loading time
        }
    });

    // Loading progress simulation
    document.addEventListener('DOMContentLoaded', function() {
        const progressFill = document.querySelector('.progress-fill');
        const loaderText = document.querySelector('.loader-text');

        if (progressFill && loaderText) {
            const loadingTexts = [
                'جاري التحميل...',
                'تحضير المحتوى...',
                'تحميل الصور...',
                'تجهيز الصفحة...',
                'اكتمل التحميل!'
            ];

            let currentText = 0;
            const textInterval = setInterval(() => {
                if (currentText < loadingTexts.length - 1) {
                    loaderText.textContent = loadingTexts[currentText];
                    currentText++;
                } else {
                    clearInterval(textInterval);
                    loaderText.textContent = loadingTexts[loadingTexts.length - 1];
                }
            }, 400);
        }
    });
    
    // Social media sharing (if needed)
    function shareOnSocialMedia(platform, url, text) {
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    // Add click handlers for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.includes('twitter') ? 'twitter' :
                            this.querySelector('i').className.includes('facebook') ? 'facebook' :
                            this.querySelector('i').className.includes('whatsapp') ? 'whatsapp' : '';

            if (platform) {
                shareOnSocialMedia(platform, window.location.href, 'مؤسسة ثرى للضيافة - نرتقي بتجربة الضيافة');
            }
        });
    });

    // Service Slideshow Functionality
    function initServiceSlideshows() {
        const slideshows = document.querySelectorAll('.service-slideshow');

        slideshows.forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.slide');
            const dots = slideshow.querySelectorAll('.slideshow-dot');
            let currentSlide = 0;

            // Function to show next slide
            function showNextSlide() {
                // Remove active class from current slide and dot
                slides[currentSlide].classList.remove('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.remove('active');
                }

                // Move to next slide
                currentSlide = (currentSlide + 1) % slides.length;

                // Add active class to new slide and dot
                slides[currentSlide].classList.add('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.add('active');
                }
            }

            // Function to go to specific slide
            function goToSlide(index) {
                slides[currentSlide].classList.remove('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.remove('active');
                }

                currentSlide = index;

                slides[currentSlide].classList.add('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.add('active');
                }
            }

            // Add click handlers to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => goToSlide(index));
            });

            // Start slideshow with different intervals for each service
            const serviceType = slideshow.getAttribute('data-service');
            let interval = 3000; // Default 3 seconds

            // Vary intervals slightly to avoid all slideshows changing at once
            switch(serviceType) {
                case 'coffee': interval = 3000; break;
                case 'food': interval = 3500; break;
                case 'drinks': interval = 4000; break;
                case 'corporate': interval = 4500; break;
                case 'workshop': interval = 5000; break;
                default: interval = 3000;
            }

            // Start the slideshow
            setInterval(showNextSlide, interval);
        });
    }

    // Initialize slideshows when page loads
    initServiceSlideshows();
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Enhanced Mobile-specific optimizations
    function initMobileOptimizations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add('reduced-motion');
        }

        // Optimize scroll performance on mobile
        let ticking = false;

        function updateScrollEffects() {
            // Update scroll-based effects here
            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        // Use passive listeners for better performance
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });

        // Prevent overscroll bounce on iOS
        document.body.addEventListener('touchmove', function(e) {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });

        // Fix viewport height issues on mobile
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);

        // Improve touch scrolling on iOS
        document.body.style.webkitOverflowScrolling = 'touch';

        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" if not already present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }

            // Optimize image quality for mobile
            if (img.src && img.src.includes('unsplash') && window.innerWidth <= 768) {
                img.src = img.src.replace(/w=\d+/, 'w=800').replace(/q=\d+/, 'q=70');
            }
        });

        // Better mobile menu handling
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // Close menu when clicking on a link
            const navLinks = navbarCollapse.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                });
            });

            // Close menu when clicking outside
            document.addEventListener('touchstart', (e) => {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        }

        // Optimize animations for mobile
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    mobileObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        animatedElements.forEach(el => mobileObserver.observe(el));
    }

    // Initialize mobile optimizations
    if (isMobile()) {
        initMobileOptimizations();
    }

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

    // Final responsive fixes
    function handleResize() {
        // Update viewport height variable
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Close mobile menu on resize
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (window.innerWidth > 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }

    // Handle resize events
    window.addEventListener('resize', debounce(handleResize, 250));
    window.addEventListener('orientationchange', debounce(handleResize, 250));

    // Initial setup
    handleResize();

    // Ensure images are responsive and load properly
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        if (!img.classList.contains('img-fluid')) {
            img.classList.add('img-fluid');
        }

        // Add error handling for images
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // Try to reload the image once
            if (!this.hasAttribute('data-retry')) {
                this.setAttribute('data-retry', 'true');
                setTimeout(() => {
                    this.src = this.src + '?retry=' + Date.now();
                }, 1000);
            }
        });

        // Add load success handler
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });

        // Set initial opacity for smooth loading
        if (!img.complete) {
            img.style.opacity = '0';
        }
    });

    // Fix for iOS Safari viewport issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.classList.add('ios-device');

        // Fix for iOS Safari address bar
        const fixIOSViewport = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', fixIOSViewport);
        window.addEventListener('orientationchange', () => {
            setTimeout(fixIOSViewport, 500);
        });
    }
});

// Additional utility functions
function formatPhoneNumber(phone) {
    // Format Saudi phone numbers
    return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
}

function isRTL() {
    return document.documentElement.dir === 'rtl';
}

// Initialize tooltips and popovers if Bootstrap is available
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}
