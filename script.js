// ===== GLOBAL VARIABLES =====
let particlesCanvas;
let particlesCtx;
let particles = [];
let galleryData = [];
let currentGalleryPage = 0;
const galleryItemsPerPage = 12;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    initializeNavigation();
    initializeParticles();
    initializeCounters();
    initializeContactForm();
    initializeScrollEffects();
    initializeFloatingCTA();
    initializeResourceTabs();
    // Gallery is now handled by dynamic-content.js
});

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARTICLES ANIMATION =====
function initializeParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;

    particlesCtx = particlesCanvas.getContext('2d');
    resizeCanvas();

    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }

    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function createParticle() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: `rgba(45, 90, 39, ${Math.random() * 0.3 + 0.1})`
    };
}

function animateParticles() {
    if (!particlesCtx) return;

    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x > particlesCanvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = particlesCanvas.width;
        if (particle.y > particlesCanvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = particlesCanvas.height;

        // Draw particle
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesCtx.fillStyle = particle.color;
        particlesCtx.fill();
    });

    requestAnimationFrame(animateParticles);
}

// ===== ANIMATED COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const progressBars = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.hasAttribute('data-count')) {
                    animateCounter(entry.target);
                }
                if (entry.target.classList.contains('progress-fill')) {
                    animateProgressBar(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
    progressBars.forEach(bar => observer.observe(bar));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

function animateProgressBar(element) {
    const progress = element.getAttribute('data-progress');
    setTimeout(() => {
        element.style.width = progress + '%';
    }, 200);
}

// ===== GALLERY (Legacy - now handled by dynamic-content.js) =====
// Fallback gallery data for when Firebase is not available
const fallbackGalleryData = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop&crop=center',
            caption: 'Community tree planting event in Central Park - volunteers working together',
            alt: 'People planting trees in a park'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=500&h=500&fit=crop&crop=center',
            caption: 'Young volunteers caring for newly planted saplings with dedication',
            alt: 'Volunteers watering young trees'
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=500&fit=crop&crop=center',
            caption: 'Dense urban forest canopy providing natural air purification',
            alt: 'Dense green forest canopy'
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop&crop=center',
            caption: 'Children learning hands-on environmental conservation techniques',
            alt: 'Kids participating in tree planting'
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=500&fit=crop&crop=center',
            caption: 'Mature oak trees providing essential shade in urban environments',
            alt: 'Large trees in city environment'
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&h=500&fit=crop&crop=center',
            caption: 'Thriving community garden showcasing biodiversity and sustainability',
            alt: 'Diverse plants and trees in community space'
        },
        {
            id: 7,
            src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop&crop=center',
            caption: 'Volunteers celebrating successful tree planting milestone achievement',
            alt: 'Happy volunteers after tree planting'
        },
        {
            id: 8,
            src: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=500&h=500&fit=crop&crop=center',
            caption: 'Native species flourishing in carefully restored natural habitat',
            alt: 'Native trees in natural setting'
        },
        {
            id: 9,
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=500&fit=crop&crop=center',
            caption: 'Stunning sunrise through ancient forest demonstrating nature\'s beauty',
            alt: 'Sunrise through forest trees'
        },
        {
            id: 10,
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop&crop=center',
            caption: 'Diverse group of environmental activists planting for future generations',
            alt: 'Environmental activists planting trees'
        },
        {
            id: 11,
            src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=500&h=500&fit=crop&crop=center',
            caption: 'Lush green canopy filtering sunlight in protected forest reserve',
            alt: 'Sunlight filtering through tree canopy'
        },
        {
            id: 12,
            src: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=500&h=500&fit=crop&crop=center',
            caption: 'Professional arborists demonstrating proper tree care techniques',
            alt: 'Tree care professionals at work'
        },
        {
            id: 13,
            src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&h=500&fit=crop&crop=center',
            caption: 'Urban rooftop garden showcasing innovative green space solutions',
            alt: 'Rooftop garden with various plants'
        },
        {
            id: 14,
            src: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=500&fit=crop&crop=center',
            caption: 'Majestic century-old trees standing as guardians of the city',
            alt: 'Ancient trees in urban setting'
        },
        {
            id: 15,
            src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop&crop=center',
            caption: 'International volunteers united in global reforestation efforts',
            alt: 'International tree planting volunteers'
        },
        {
            id: 16,
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=500&fit=crop&crop=center',
            caption: 'Pristine wilderness area protected through community conservation',
            alt: 'Protected wilderness forest'
        },
        {
            id: 17,
            src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=500&h=500&fit=crop&crop=center',
            caption: 'Educational nature walk teaching sustainable forestry practices',
            alt: 'Nature education in forest setting'
        },
        {
            id: 18,
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop&crop=center',
            caption: 'Corporate team building through environmental stewardship activities',
            alt: 'Corporate environmental volunteering'
        },
        {
            id: 19,
            src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&h=500&fit=crop&crop=center',
            caption: 'Innovative vertical gardens transforming urban concrete landscapes',
            alt: 'Vertical garden installation'
        },
        {
            id: 20,
            src: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=500&h=500&fit=crop&crop=center',
            caption: 'Seasonal tree maintenance ensuring long-term forest health',
            alt: 'Seasonal tree maintenance work'
        },
        {
            id: 21,
            src: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=500&fit=crop&crop=center',
            caption: 'Historic trees serving as living monuments to environmental heritage',
            alt: 'Historic heritage trees'
        },
        {
            id: 22,
            src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop&crop=center',
            caption: 'Youth environmental leaders inspiring next generation of conservationists',
            alt: 'Young environmental leaders'
        },
        {
            id: 23,
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&h=500&fit=crop&crop=center',
            caption: 'Dawn breaking over reforested area showing restoration success',
            alt: 'Dawn over reforested landscape'
        },
        {
            id: 24,
            src: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=500&h=500&fit=crop&crop=center',
            caption: 'Biodiversity hotspot created through strategic tree planting initiatives',
            alt: 'Biodiverse forest ecosystem'
        }
    ];

// Legacy gallery functions - kept for fallback
function loadFallbackGallery() {
    galleryData = fallbackGalleryData;
    loadGalleryItems();
}

function loadGalleryItems() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const startIndex = currentGalleryPage * galleryItemsPerPage;
    const endIndex = startIndex + galleryItemsPerPage;
    const itemsToShow = galleryData.slice(startIndex, endIndex);

    itemsToShow.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });

    // Hide load more button if all items are loaded
    const loadMoreBtn = document.querySelector('.gallery-controls .btn');
    if (endIndex >= galleryData.length && loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-aos', 'fade-up');
    div.setAttribute('data-aos-delay', '200');
    
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    
    // Add error handling for images
    img.onerror = function() {
        this.style.background = 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.color = 'white';
        this.style.fontSize = '3rem';
        this.innerHTML = '🌳';
        this.removeAttribute('src');
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = '<i class="fas fa-expand"></i>';
    
    div.appendChild(img);
    div.appendChild(overlay);
    div.addEventListener('click', () => openLightbox(item));
    
    return div;
}

function loadMoreGallery() {
    // This function is now handled by dynamic content system
    // Keep for backward compatibility
    if (typeof window.loadMoreDynamicGallery === 'function') {
        window.loadMoreDynamicGallery();
    } else {
        currentGalleryPage++;
        loadGalleryItems();
        AOS.refresh();
    }
}

// Make loadMoreGallery globally available
window.loadMoreGallery = loadMoreGallery;

// ===== LIGHTBOX =====
function openLightbox(src, caption = '', alt = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Handle both old object format and new string format
    if (typeof src === 'object') {
        lightboxImage.src = src.src.replace('w=400&h=400', 'w=800&h=600');
        lightboxImage.alt = src.alt;
        lightboxCaption.textContent = src.caption;
    } else {
        lightboxImage.src = src.replace('w=400&h=400', 'w=800&h=600');
        lightboxImage.alt = alt;
        lightboxCaption.textContent = caption;
    }

    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Make openLightbox globally available
window.openLightbox = openLightbox;

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close lightbox on escape key or background click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// ===== CONTACT FORM =====
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate all fields
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
    submitBtn.disabled = true;

    // Save to Firebase database and localStorage
    saveToFirebase('contact-submissions', data)
        .then(() => {
            showFormSuccess();
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        })
        .catch((error) => {
            console.error('Error saving form:', error);
            alert('There was an error submitting your form. Please try again.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearFieldError(e);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }

    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormSuccess() {
    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('form-success');
    
    form.style.display = 'none';
    successDiv.classList.add('show');
    
    // Reset after 5 seconds
    setTimeout(() => {
        form.style.display = 'block';
        successDiv.classList.remove('show');
    }, 5000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// ===== FLOATING CTA =====
function initializeFloatingCTA() {
    const floatingCTA = document.getElementById('floating-cta');
    if (!floatingCTA) return;

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            floatingCTA.style.opacity = '1';
            floatingCTA.style.pointerEvents = 'auto';
        } else {
            floatingCTA.style.opacity = '0';
            floatingCTA.style.pointerEvents = 'none';
        }
    });

    // Click handler
    floatingCTA.addEventListener('click', () => {
        scrollToSection('help');
    });
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== QUICK ACTION FUNCTIONS =====
function downloadGuide() {
    // Simulate file download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,GreenRoots Tree Planting Guide\n\n1. Choose native species\n2. Find appropriate location\n3. Dig proper hole size\n4. Plant with care\n5. Water regularly\n6. Monitor growth';
    link.download = 'greenroots-planting-guide.txt';
    link.click();
    
    // Show notification
    showNotification('Planting guide downloaded! 📄', 'success');
}

function findEvents() {
    // Simulate finding local events
    showNotification('Redirecting to local events... 📅', 'info');
    setTimeout(() => {
        window.open('https://www.eventbrite.com/d/online/tree-planting/', '_blank');
    }, 1000);
}

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'GreenRoots - Plant a Tree, Grow a Future',
            text: 'Join the green movement and help make our planet breathe again!',
            url: window.location.href
        });
    } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Website URL copied to clipboard! 🔗', 'success');
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// ===== RESOURCE TABS =====
function initializeResourceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== ENHANCED GALLERY FUNCTIONS =====
// Update the createGalleryItem function to handle the new image sources better
function createGalleryItemEnhanced(item) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.setAttribute('data-aos', 'fade-up');
    div.setAttribute('data-aos-delay', Math.min(800, Math.random() * 600 + 200));
    
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    
    // Enhanced error handling with retry mechanism
    let retryCount = 0;
    const maxRetries = 2;
    
    img.onerror = function() {
        retryCount++;
        if (retryCount <= maxRetries) {
            // Try different image parameters
            const newSrc = item.src.replace('w=500&h=500', `w=400&h=400&q=80&auto=format`);
            this.src = newSrc;
        } else {
            // Fallback to gradient placeholder
            this.style.background = 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = 'white';
            this.style.fontSize = '3rem';
            this.innerHTML = '🌳';
            this.removeAttribute('src');
        }
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = '<i class="fas fa-expand"></i>';
    
    div.appendChild(img);
    div.appendChild(overlay);
    div.addEventListener('click', () => openLightbox(item));
    
    return div;
}

// ===== ADDITIONAL EVENT HANDLERS =====
// Add smooth scrolling for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
});

// ===== ENHANCED ANIMATIONS =====
// Add staggered animations for testimonials
function initializeTestimonialAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize testimonial animations
document.addEventListener('DOMContentLoaded', initializeTestimonialAnimations);

// ===== PERFORMANCE ENHANCEMENTS =====
// Lazy load images in events and testimonials sections
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ===== MODAL FUNCTIONS =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// ===== EVENT REGISTRATION FUNCTIONS =====
function openEventRegistration(eventType, eventName, eventDate, eventLocation) {
    // Check if event date is in the past
    if (eventDate && isEventDatePast(eventDate)) {
        showNotification('❌ Registration is closed for past events. Please check our upcoming events!', 'error');
        return;
    }
    
    const modal = document.getElementById('event-registration-modal');
    const modalHeader = modal.querySelector('.modal-header h2');
    
    // Set event details in hidden fields
    document.getElementById('event-name').value = eventName || 'Community Tree Planting';
    document.getElementById('event-date').value = eventDate || 'TBD';
    document.getElementById('event-location').value = eventLocation || 'TBD';
    
    // Update event details display
    const eventDetails = document.getElementById('event-details');
    eventDetails.innerHTML = `
        <strong>Event:</strong> ${eventName || 'Community Tree Planting'}<br>
        <strong>Date:</strong> ${eventDate || 'To be announced'}<br>
        <strong>Location:</strong> ${eventLocation || 'To be announced'}
    `;
    
    // Customize modal based on event type
    switch(eventType) {
        case 'community-planting':
            modalHeader.innerHTML = '🌳 Community Tree Planting Registration';
            break;
        default:
            modalHeader.innerHTML = '🌳 Event Registration';
    }
    
    openModal('event-registration-modal');
}

// Function to check if event date is in the past
function isEventDatePast(eventDateString) {
    try {
        // Parse various date formats
        let eventDate;
        
        // Handle different date formats
        if (eventDateString.includes('at')) {
            // Format: "Saturday, March 15, 2025 at 9:00 AM"
            const datePart = eventDateString.split(' at ')[0];
            eventDate = new Date(datePart);
        } else {
            eventDate = new Date(eventDateString);
        }
        
        // If date parsing failed, assume it's a future event
        if (isNaN(eventDate.getTime())) {
            return false;
        }
        
        // Compare with current date (set to start of day for fair comparison)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        
        return eventDate < today;
    } catch (error) {
        console.error('Error parsing event date:', error);
        return false; // If there's an error, allow registration
    }
}

function registerSchool() {
    openModal('school-registration-modal');
}

function startPlanning() {
    openModal('event-planning-modal');
}

function joinWebinar() {
    showNotification('Redirecting to webinar platform...', 'info');
    setTimeout(() => {
        window.open('https://zoom.us/webinar/register', '_blank');
    }, 1000);
}

function learnMoreTour() {
    showNotification('Opening tour information...', 'info');
    setTimeout(() => {
        window.open('https://www.nps.gov/goga/planyourvisit/index.htm', '_blank');
    }, 1000);
}

// ===== RESOURCE FUNCTIONS =====
function downloadResource(resourceType) {
    let fileName, content, url;
    
    switch(resourceType) {
        case 'planting-guide':
            fileName = 'GreenRoots-Tree-Planting-Guide.pdf';
            showNotification('Downloading planting guide...', 'success');
            setTimeout(() => {
                window.open('https://www.arborday.org/trees/planting/', '_blank');
            }, 1000);
            break;
        default:
            fileName = 'GreenRoots-Resource.pdf';
    }
    
    // Simulate download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,GreenRoots Resource\n\nThank you for downloading our resource!\n\nFor the complete guide, please visit our website or contact us directly.';
    link.download = fileName;
    link.click();
}

function exploreDatabase() {
    showNotification('Opening native species database...', 'info');
    setTimeout(() => {
        window.open('https://www.nwf.org/NativePlantFinder/', '_blank');
    }, 1000);
}

function watchVideos() {
    showNotification('Opening video tutorials...', 'info');
    setTimeout(() => {
        window.open('https://www.youtube.com/results?search_query=tree+planting+tutorial', '_blank');
    }, 1000);
}

// ===== FORM SUBMISSION HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Event Registration Form
    const eventForm = document.getElementById('event-registration-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventRegistration);
    }
    
    // School Registration Form
    const schoolForm = document.getElementById('school-registration-form');
    if (schoolForm) {
        schoolForm.addEventListener('submit', handleSchoolRegistration);
    }
    
    // Event Planning Form
    const planningForm = document.getElementById('event-planning-form');
    if (planningForm) {
        planningForm.addEventListener('submit', handleEventPlanning);
    }
    
    // Story Form
    const storyForm = document.getElementById('story-form');
    if (storyForm) {
        storyForm.addEventListener('submit', handleStorySubmission);
    }
    
    // Work Form
    const workForm = document.getElementById('work-form');
    if (workForm) {
        workForm.addEventListener('submit', handleWorkSubmission);
    }
});

function handleEventRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Add registration timestamp
    data.registrationDate = new Date().toISOString();
    data.registrationId = generateUniqueId();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    submitBtn.disabled = true;
    
    // Save to Firebase database
    saveToFirebase('event-registrations', data)
        .then(() => {
            closeModal('event-registration-modal');
            showSuccessModal('Event Registration Successful!', 
                `Thank you ${data.name}! You're registered for ${data.eventName || 'the event'}. We'll send confirmation details to ${data.email}.`);
            
            // Reset form
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success notification
            showNotification('🎉 Registration successful! Check your email for confirmation.', 'success');
        })
        .catch((error) => {
            console.error('Registration error:', error);
            showNotification('❌ Registration failed. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function handleSchoolRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    submitBtn.disabled = true;
    
    // Save to Firebase database
    saveToFirebase('school-registrations', data);
    
    setTimeout(() => {
        closeModal('school-registration-modal');
        showSuccessModal('School Registration Successful!', 
            `Thank you ${data.contactName}! We've received ${data.schoolName}'s registration. Our education coordinator will contact you within 2 business days.`);
        
        // Reset form
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect to educational resources
        setTimeout(() => {
            window.open('https://www.plt.org/', '_blank');
        }, 3000);
    }, 2000);
}

function handleEventPlanning(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Save to Firebase database
    saveToFirebase('event-planning', data);
    
    setTimeout(() => {
        closeModal('event-planning-modal');
        showSuccessModal('Event Planning Request Submitted!', 
            `Thank you ${data.organizerName}! We're excited to help you plan your event in ${data.eventLocation}. Our team will reach out within 24 hours with next steps.`);
        
        // Reset form
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Redirect to planning resources
        setTimeout(() => {
            window.open('https://www.arborday.org/programs/communityForests/', '_blank');
        }, 3000);
    }, 2000);
}

// ===== SUCCESS MODAL =====
function showSuccessModal(title, message) {
    // Create success modal if it doesn't exist
    let successModal = document.getElementById('success-modal');
    if (!successModal) {
        successModal = document.createElement('div');
        successModal.id = 'success-modal';
        successModal.className = 'modal';
        successModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-body">
                    <div class="form-success-modal">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 id="success-title">${title}</h3>
                        <p id="success-message">${message}</p>
                        <button class="btn btn-primary" onclick="closeModal('success-modal')">
                            <i class="fas fa-thumbs-up"></i>
                            Awesome!
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(successModal);
    } else {
        document.getElementById('success-title').textContent = title;
        document.getElementById('success-message').textContent = message;
    }
    
    openModal('success-modal');
}

// ===== ADDITIONAL BUTTON FUNCTIONS =====
function downloadGuide() {
    showNotification('Downloading comprehensive planting guide...', 'success');
    
    // Create and download actual file
    const content = `GreenRoots Tree Planting Guide

🌳 COMPLETE TREE PLANTING GUIDE 🌳

1. PLANNING YOUR TREE PLANTING
   - Choose the right location
   - Select appropriate species
   - Check local regulations
   - Plan for long-term care

2. PREPARATION
   - Test soil conditions
   - Mark utility lines
   - Gather necessary tools
   - Choose optimal planting time

3. PLANTING PROCESS
   - Dig proper hole size (2-3x root ball width)
   - Remove container/burlap carefully
   - Position tree at correct depth
   - Backfill with native soil
   - Water thoroughly

4. AFTERCARE
   - Water regularly (2-3 times per week)
   - Apply mulch around base
   - Prune dead/damaged branches
   - Monitor for pests and diseases

5. LONG-TERM MAINTENANCE
   - Establish watering schedule
   - Annual health assessments
   - Proper pruning techniques
   - Community involvement

For complete resources and local guidance, visit:
- National Arbor Day Foundation: arborday.org
- Local extension services
- GreenRoots community forums

Together, we can grow a greener future! 🌱`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GreenRoots-Complete-Planting-Guide.txt';
    link.click();
    window.URL.revokeObjectURL(url);
    
    // Also redirect to comprehensive online resource
    setTimeout(() => {
        window.open('https://www.arborday.org/trees/planting/', '_blank');
    }, 1500);
}

function findEvents() {
    showNotification('Finding local environmental events...', 'info');
    setTimeout(() => {
        window.open('https://www.eventbrite.com/d/online/environmental-volunteering/', '_blank');
    }, 1000);
}

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'GreenRoots - Plant a Tree, Grow a Future',
            text: 'Join the green movement! Help plant trees and restore our environment.',
            url: window.location.href
        }).then(() => {
            showNotification('Thanks for sharing GreenRoots! 🌱', 'success');
        });
    } else {
        // Fallback sharing options
        const shareModal = document.createElement('div');
        shareModal.className = 'modal show';
        shareModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🌱 Share GreenRoots</h2>
                    <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Help spread the word about environmental conservation!</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
                        <button class="btn btn-primary" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')">
                            <i class="fab fa-facebook"></i> Facebook
                        </button>
                        <button class="btn btn-primary" onclick="window.open('https://twitter.com/intent/tweet?text=Join the green movement with GreenRoots! 🌱&url=' + encodeURIComponent(window.location.href), '_blank')">
                            <i class="fab fa-twitter"></i> Twitter
                        </button>
                        <button class="btn btn-outline" onclick="navigator.clipboard.writeText(window.location.href).then(() => showNotification('Link copied! 📋', 'success'))">
                            <i class="fas fa-copy"></i> Copy Link
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(shareModal);
        
        // Auto-remove share modal after 10 seconds
        setTimeout(() => {
            if (shareModal.parentNode) {
                shareModal.remove();
            }
        }, 10000);
    }
}

// ===== STORY AND WORK SUBMISSION HANDLERS =====
function handleStorySubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate image URL if provided
    if (data.imageUrl && data.imageUrl.trim()) {
        if (!isValidImageUrl(data.imageUrl.trim())) {
            showNotification('❌ Please enter a valid image URL (jpg, jpeg, png, gif, webp)', 'error');
            return;
        }
        data.imageUrl = data.imageUrl.trim();
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sharing...';
    submitBtn.disabled = true;
    
    // Save to Firebase database
    saveToFirebase('story-submissions', data)
        .then(() => {
            showSuccessModal('Story Shared Successfully!', 
                `Thank you ${data.name}! Your story "${data.title}" has been shared and will inspire others in our community.`);
            
            // Reset form
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show notification
            showNotification('🌟 Your story has been shared with the community!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing story:', error);
            showNotification('❌ Error sharing story. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function handleWorkSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate image URL (required for work submissions)
    if (!data.imageUrl || !data.imageUrl.trim()) {
        showNotification('❌ Project image URL is required', 'error');
        return;
    }
    
    if (!isValidImageUrl(data.imageUrl.trim())) {
        showNotification('❌ Please enter a valid image URL (jpg, jpeg, png, gif, webp)', 'error');
        return;
    }
    
    data.imageUrl = data.imageUrl.trim();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sharing...';
    submitBtn.disabled = true;
    
    // Save to Firebase database
    saveToFirebase('work-submissions', data)
        .then(() => {
            showSuccessModal('Work Shared Successfully!', 
                `Thank you ${data.name}! Your project "${data.title}" has been showcased and will inspire others to take environmental action.`);
            
            // Reset form
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show notification
            showNotification('🚀 Your work has been showcased!', 'success');
        })
        .catch((error) => {
            console.error('Error sharing work:', error);
            showNotification('❌ Error sharing work. Please try again.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

// ===== FIREBASE DATABASE FUNCTIONS =====
async function saveToFirebase(collectionName, formData) {
    try {
        // Add timestamp and additional metadata
        const dataToSave = {
            ...formData,
            timestamp: Date.now(),
            submissionDate: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct',
            id: generateUniqueId()
        };

        // Try to save to Firebase Realtime Database first
        if (window.realtimeDatabase) {
            const { ref, push } = await import('https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js');
            await push(ref(window.realtimeDatabase, `submissions/${collectionName}`), dataToSave);
            console.log('Data saved to Firebase Realtime Database');
        }
        // Fallback to Firestore if available
        else if (window.firebaseDB) {
            const docRef = await window.firebaseAddDoc(
                window.firebaseCollection(window.firebaseDB, collectionName), 
                dataToSave
            );
            console.log('Document written with ID: ', docRef.id);
        }
        
        // Also store locally as backup
        storeDataLocally(collectionName, dataToSave);
        console.log('Form submitted successfully!');
        
    } catch (error) {
        console.error('Error saving to Firebase:', error);
        
        // Fallback to local storage only
        storeDataLocally(collectionName, formData);
        console.log('Form submitted to localStorage (Firebase unavailable)');
    }
}

// ===== LOCAL STORAGE BACKUP =====
function storeDataLocally(collectionName, formData) {
    try {
        // Get existing data
        const existingData = JSON.parse(localStorage.getItem(`greenroots_${collectionName}`) || '[]');
        
        // Add new submission
        const newSubmission = {
            ...formData,
            id: generateUniqueId(),
            timestamp: new Date().toISOString(),
            localStorageBackup: true
        };
        
        existingData.push(newSubmission);
        
        // Save back to localStorage
        localStorage.setItem(`greenroots_${collectionName}`, JSON.stringify(existingData));
        
        console.log(`Data stored locally in ${collectionName}:`, newSubmission);
        
    } catch (error) {
        console.error('Error storing data locally:', error);
    }
}

// ===== UTILITY FUNCTIONS =====
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Image URL validation function
function isValidImageUrl(url) {
    try {
        const urlObj = new URL(url);
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
        const pathname = urlObj.pathname.toLowerCase();
        return validExtensions.some(ext => pathname.includes(ext)) || 
               url.includes('imgur.com') || 
               url.includes('cloudinary.com') || 
               url.includes('unsplash.com') || 
               url.includes('pexels.com') || 
               url.includes('pixabay.com');
    } catch {
        return false;
    }
}

// ===== VIEW STORED DATA FUNCTION =====
function viewStoredSubmissions() {
    const collections = ['event-registrations', 'school-registrations', 'event-planning', 'contact-submissions', 'story-submissions', 'work-submissions'];
    let allData = {};
    
    collections.forEach(collection => {
        // Get Firebase data (if available)
        // Note: In a real app, you'd query Firebase here
        
        // Get local storage data
        const localData = JSON.parse(localStorage.getItem(`greenroots_${collection}`) || '[]');
        allData[collection] = localData;
    });
    
    console.log('All stored submissions:', allData);
    
    // Create a summary
    let summary = 'GreenRoots Form Submissions Summary:\n\n';
    Object.keys(allData).forEach(collection => {
        summary += `${collection.toUpperCase()}: ${allData[collection].length} submissions\n`;
    });
    
    alert(summary + '\nCheck browser console for detailed data.');
    return allData;
}

// ===== EXPORT DATA FUNCTION =====
function exportSubmissionsToCSV() {
    const collections = ['event-registrations', 'school-registrations', 'event-planning', 'contact-submissions', 'story-submissions', 'work-submissions'];
    
    collections.forEach(collection => {
        const data = JSON.parse(localStorage.getItem(`greenroots_${collection}`) || '[]');
        
        if (data.length > 0) {
            // Convert to CSV
            const headers = Object.keys(data[0]);
            let csv = headers.join(',') + '\n';
            
            data.forEach(row => {
                const values = headers.map(header => {
                    const value = row[header] || '';
                    return `"${value.toString().replace(/"/g, '""')}"`;
                });
                csv += values.join(',') + '\n';
            });
            
            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `greenroots_${collection}_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    });
    
    showNotification('📊 Data exported to CSV files!', 'success');
}

// ===== ADMIN PANEL FUNCTIONS =====
function createAdminPanel() {
    const adminPanel = document.createElement('div');
    adminPanel.id = 'admin-panel';
    adminPanel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 2px solid #2d5a27;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        font-family: Arial, sans-serif;
        max-width: 300px;
    `;
    
    adminPanel.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #2d5a27;">📊 Admin Panel</h3>
        <button onclick="viewStoredSubmissions()" style="width: 100%; margin: 5px 0; padding: 8px; background: #4a7c59; color: white; border: none; border-radius: 5px; cursor: pointer;">
            View All Submissions
        </button>
        <button onclick="exportSubmissionsToCSV()" style="width: 100%; margin: 5px 0; padding: 8px; background: #7fb069; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Export to CSV
        </button>
        <button onclick="clearAllData()" style="width: 100%; margin: 5px 0; padding: 8px; background: #d4a574; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Clear All Data
        </button>
        <button onclick="document.getElementById('admin-panel').remove()" style="width: 100%; margin: 5px 0; padding: 8px; background: #8b5a3c; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Close Panel
        </button>
    `;
    
    document.body.appendChild(adminPanel);
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all stored form data? This cannot be undone.')) {
        const collections = ['event-registrations', 'school-registrations', 'event-planning', 'contact-submissions', 'story-submissions', 'work-submissions'];
        collections.forEach(collection => {
            localStorage.removeItem(`greenroots_${collection}`);
        });
        showNotification('🗑️ All data cleared successfully!', 'info');
    }
}

// ===== ADMIN LOGIN FUNCTIONS =====
function initializeAdminLogin() {
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
}

function openAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on email input
        setTimeout(() => {
            const emailInput = document.getElementById('admin-email');
            if (emailInput) emailInput.focus();
        }, 100);
    }
}

function closeAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Clear form
        const form = document.getElementById('admin-login-form');
        if (form) form.reset();
        
        // Hide error message
        const errorDiv = document.getElementById('admin-login-error');
        if (errorDiv) errorDiv.style.display = 'none';
    }
}

async function handleAdminLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const submitBtn = document.getElementById('admin-login-submit');
    const errorDiv = document.getElementById('admin-login-error');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    submitBtn.classList.add('admin-login-loading');
    
    // Hide previous errors
    errorDiv.style.display = 'none';
    
    try {
        // Authenticate with Firebase
        if (window.auth && window.signInWithEmailAndPassword) {
            await window.signInWithEmailAndPassword(window.auth, email, password);
            
            // Success - redirect to admin dashboard
            showNotification('✅ Login successful! Redirecting to admin dashboard...', 'success');
            
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1500);
            
        } else {
            throw new Error('Firebase authentication not initialized');
        }
        
    } catch (error) {
        console.error('Admin login error:', error);
        
        // Show error message
        let errorMessage = 'Login failed. Please check your credentials.';
        
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No admin account found with this email address.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Please enter a valid email address.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMessage = 'Too many failed attempts. Please try again later.';
        }
        
        errorDiv.textContent = errorMessage;
        errorDiv.style.display = 'block';
        
        // Reset form state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('admin-login-loading');
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('admin-login-modal');
    if (modal && e.target === modal) {
        closeAdminLogin();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAdminLogin();
    }
});

// Make functions globally available
window.openAdminLogin = openAdminLogin;
window.closeAdminLogin = closeAdminLogin;
window.initializeAdminLogin = initializeAdminLogin;
window.openEventRegistration = openEventRegistration;
window.isEventDatePast = isEventDatePast;

// ===== MOBILE NAVIGATION =====
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Make mobile menu function globally available
window.toggleMobileMenu = toggleMobileMenu;

// ===== EVENT DATE MANAGEMENT =====
// Function to update event button states based on dates
function updateEventButtonStates() {
    const eventButtons = document.querySelectorAll('[onclick*="openEventRegistration"]');
    
    eventButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        
        // Extract event date from onclick attribute
        const match = onclickAttr.match(/openEventRegistration\([^,]+,\s*[^,]+,\s*['"]([^'"]+)['"]/);
        
        if (match && match[1]) {
            const eventDate = match[1];
            
            if (isEventDatePast(eventDate)) {
                // Disable registration for past events
                button.classList.add('btn-disabled');
                button.innerHTML = '<i class="fas fa-calendar-times"></i> Registration Closed';
                button.style.background = '#6c757d';
                button.style.cursor = 'not-allowed';
                button.onclick = function(e) {
                    e.preventDefault();
                    showNotification('❌ Registration is closed for past events. Please check our upcoming events!', 'error');
                };
            } else {
                // Enable registration for future events
                button.classList.remove('btn-disabled');
                if (!button.innerHTML.includes('Register Now')) {
                    button.innerHTML = '<i class="fas fa-calendar-check"></i> Register Now';
                }
                button.style.background = '';
                button.style.cursor = 'pointer';
            }
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the page to fully load
    setTimeout(updateEventButtonStates, 100);
});

// Add admin panel access (Ctrl+Shift+A)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (!document.getElementById('admin-panel')) {
            createAdminPanel();
        }
    }
});

// ===== MOBILE MENU NAVIGATION =====
// Add click handler for mobile menu button
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 1024;
    }
    
    // Add click handler to logo for mobile menu
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            if (isMobile()) {
                e.preventDefault();
                window.location.href = 'mobile-menu.html';
            }
        });
    }
    
    // Add click handler for hamburger icon in right corner
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.addEventListener('click', function(e) {
            if (isMobile()) {
                // Check if click is in the right corner area (where hamburger is)
                const rect = navContainer.getBoundingClientRect();
                const clickX = e.clientX;
                const screenWidth = window.innerWidth;
                
                // If clicked within 80px from right edge, open menu
                if (clickX > screenWidth - 80) {
                    e.preventDefault();
                    window.location.href = 'mobile-menu.html';
                }
            }
        });
    }
});
