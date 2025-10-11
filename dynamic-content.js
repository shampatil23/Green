// Dynamic Content Management System
import { database } from './firebase-config.js';
import { ref, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Default/fallback content
const defaultContent = {
    hero: {
        title: "Plant a Tree, Grow a Future",
        subtitle: "Together, we can turn cities green and make our planet breathe again"
    },
    about: {
        title: "Why GreenRoots Matters",
        subtitle: "Understanding the real-world problem we're solving together",
        problemTitle: "The Problem",
        solutionTitle: "Our Solution",
        problemText: "Urban areas are losing green spaces rapidly. Deforestation and climate change threaten our future, while community participation in environmental initiatives remains low.",
        solutionText: "We connect communities with simple, actionable ways to contribute to urban greenery. Every small step today can grow into a forest tomorrow."
    },
    impact: {
        treesPlanted: 5000,
        volunteers: 2000,
        cities: 15,
        co2Absorbed: 240000
    }
};

// Initialize dynamic content loading
export function initializeDynamicContent() {
    loadHeroContent();
    loadAboutContent();
    loadImpactStats();
    loadTestimonialsContent();
    loadEventsContent();
    loadGalleryContent();
    
    // Set up real-time listeners for content updates
    setupRealtimeListeners();
}

// Load hero section content
async function loadHeroContent() {
    try {
        const snapshot = await get(ref(database, 'content/hero'));
        let heroData = defaultContent.hero;
        
        if (snapshot.exists()) {
            heroData = { ...heroData, ...snapshot.val() };
        }
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            heroTitle.innerHTML = `${heroData.title.split(',')[0]}, <br><span class="gradient-text">${heroData.title.split(',')[1] || 'Grow a Future'}</span> 🌱`;
        }
        
        if (heroSubtitle) {
            heroSubtitle.textContent = heroData.subtitle;
        }
        
    } catch (error) {
        console.error('Error loading hero content:', error);
        // Use default content on error
        loadDefaultHeroContent();
    }
}

// Load about section content
async function loadAboutContent() {
    try {
        const snapshot = await get(ref(database, 'content/about'));
        let aboutData = defaultContent.about;
        
        if (snapshot.exists()) {
            aboutData = { ...aboutData, ...snapshot.val() };
        }
        
        // Update about section
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const sectionHeader = aboutSection.querySelector('.section-header h2');
            const sectionSubtitle = aboutSection.querySelector('.section-header p');
            const problemCard = aboutSection.querySelector('.about-card:nth-child(1)');
            const solutionCard = aboutSection.querySelector('.about-card:nth-child(2)');
            
            if (sectionHeader) sectionHeader.textContent = aboutData.title;
            if (sectionSubtitle) sectionSubtitle.textContent = aboutData.subtitle;
            
            if (problemCard) {
                const problemTitle = problemCard.querySelector('h3');
                const problemText = problemCard.querySelector('p');
                if (problemTitle) problemTitle.textContent = aboutData.problemTitle;
                if (problemText) problemText.textContent = aboutData.problemText;
            }
            
            if (solutionCard) {
                const solutionTitle = solutionCard.querySelector('h3');
                const solutionText = solutionCard.querySelector('p');
                if (solutionTitle) solutionTitle.textContent = aboutData.solutionTitle;
                if (solutionText) solutionText.textContent = aboutData.solutionText;
            }
        }
        
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load impact statistics
async function loadImpactStats() {
    try {
        const snapshot = await get(ref(database, 'content/impact'));
        let impactData = defaultContent.impact;
        
        if (snapshot.exists()) {
            impactData = { ...impactData, ...snapshot.val() };
        }
        
        // Update impact stats with animation
        updateStatCounter('trees-planted', impactData.treesPlanted);
        updateStatCounter('volunteers', impactData.volunteers);
        updateStatCounter('cities', impactData.cities);
        updateStatCounter('co2-absorbed', impactData.co2Absorbed);
        
        // Also update the counters in impact section
        const impactSection = document.getElementById('impact');
        if (impactSection) {
            const statCards = impactSection.querySelectorAll('.stat-card');
            if (statCards[0]) {
                const statNumber = statCards[0].querySelector('.stat-number');
                if (statNumber) statNumber.setAttribute('data-count', impactData.treesPlanted);
            }
            if (statCards[1]) {
                const statNumber = statCards[1].querySelector('.stat-number');
                if (statNumber) statNumber.setAttribute('data-count', impactData.volunteers);
            }
            if (statCards[2]) {
                const statNumber = statCards[2].querySelector('.stat-number');
                if (statNumber) statNumber.setAttribute('data-count', impactData.cities);
            }
            if (statCards[3]) {
                const statNumber = statCards[3].querySelector('.stat-number');
                if (statNumber) statNumber.setAttribute('data-count', impactData.co2Absorbed);
            }
        }
        
    } catch (error) {
        console.error('Error loading impact stats:', error);
    }
}

// Load gallery content
async function loadGalleryContent() {
    try {
        const snapshot = await get(ref(database, 'content/gallery'));
        const galleryGrid = document.getElementById('gallery-grid');
        
        if (!galleryGrid) return;
        
        if (snapshot.exists()) {
            const images = snapshot.val();
            const imageArray = Object.values(images);
            
            // Clear existing gallery
            galleryGrid.innerHTML = '';
            
            // Add images to gallery
            imageArray.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-aos', 'fade-up');
                galleryItem.setAttribute('data-aos-delay', (index * 100).toString());
                
                galleryItem.innerHTML = `
                    <img src="${image.url}" alt="${image.caption || 'Gallery image'}" onclick="openLightbox('${image.url}', '${image.caption || 'Gallery image'}')">
                    <div class="gallery-overlay">
                        <div class="gallery-info">
                            <h4>${image.caption || 'Gallery Image'}</h4>
                            <p>Environmental Conservation</p>
                        </div>
                    </div>
                `;
                
                galleryGrid.appendChild(galleryItem);
            });
            
            // Reinitialize AOS for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
        } else {
            // Show message when no images are uploaded by admin
            galleryGrid.innerHTML = `
                <div class="no-images-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 15px; border: 2px dashed #e1e8e1;">
                    <i class="fas fa-images" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 0.5rem;">No Images Uploaded</h3>
                    <p style="color: #6c757d;">The admin hasn't uploaded any gallery images yet. Check back soon for beautiful moments from our environmental conservation efforts!</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading gallery content:', error);
        // Show error message
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #f8d7da; border-radius: 10px; color: #721c24;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Unable to load gallery images. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Load testimonials content
async function loadTestimonialsContent() {
    try {
        const snapshot = await get(ref(database, 'content/testimonials'));
        const testimonialsSection = document.getElementById('testimonials');
        
        if (!testimonialsSection) return;
        
        const testimonialsGrid = testimonialsSection.querySelector('.testimonials-grid');
        if (!testimonialsGrid) return;
        
        if (snapshot.exists()) {
            const testimonials = snapshot.val();
            const testimonialsArray = Object.values(testimonials);
            
            // Clear existing testimonials
            testimonialsGrid.innerHTML = '';
            
            // Add testimonials to grid
            testimonialsArray.forEach((testimonial, index) => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                testimonialCard.setAttribute('data-aos', 'fade-up');
                testimonialCard.setAttribute('data-aos-delay', (index * 100).toString());
                
                const stars = '⭐'.repeat(testimonial.rating || 5);
                
                testimonialCard.innerHTML = `
                    <div class="testimonial-content">
                        <div class="testimonial-text">
                            <p>"${testimonial.text}"</p>
                        </div>
                        <div class="testimonial-rating">
                            ${stars}
                        </div>
                        <div class="testimonial-author">
                            ${testimonial.image ? `<img src="${testimonial.image}" alt="${testimonial.name}" class="author-image" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">` : '<div class="author-placeholder">👤</div>'}
                            ${testimonial.image ? '<div class="author-placeholder" style="display: none;">👤</div>' : ''}
                            <div class="author-info">
                                <h4>${testimonial.name}</h4>
                                <p>${testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                testimonialsGrid.appendChild(testimonialCard);
            });
            
            // Reinitialize AOS for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
        } else {
            // Show dummy testimonial when no testimonials are available
            const dummyTestimonial = {
                name: 'Sarah Johnson',
                role: 'Environmental Activist',
                text: 'This initiative has completely transformed our community. The tree-planting events are well-organized and impactful. I\'ve seen more birds and cleaner air in our neighborhood since we started participating.',
                rating: 5,
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80'
            };
            
            // Clear existing testimonials
            testimonialsGrid.innerHTML = '';
            
            // Create and append the dummy testimonial card
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.setAttribute('data-aos', 'fade-up');
            
            const stars = '⭐'.repeat(dummyTestimonial.rating || 5);
            
            testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <div class="testimonial-text">
                        <p>"${dummyTestimonial.text}"</p>
                    </div>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                    <div class="testimonial-author">
                        <img src="${dummyTestimonial.image}" alt="${dummyTestimonial.name}" class="author-image" onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="author-placeholder" style="display: none;">👤</div>
                        <div class="author-info">
                            <h4>${dummyTestimonial.name}</h4>
                            <p>${dummyTestimonial.role}</p>
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsGrid.appendChild(testimonialCard);
            
            // Add a small note that this is a sample testimonial
            const note = document.createElement('p');
            note.style.textAlign = 'center';
            note.style.marginTop = '1rem';
            note.style.color = '#6c757d';
            note.style.fontStyle = 'italic';
            note.textContent = 'This is a sample testimonial. Check back soon for real stories from our community members!';
            testimonialsGrid.appendChild(note);
            
            // Reinitialize AOS for the new element
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
        
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Load events content
async function loadEventsContent() {
    try {
        const snapshot = await get(ref(database, 'content/events'));
        const eventsSection = document.getElementById('events');
        
        if (!eventsSection) return;
        
        const eventsGrid = eventsSection.querySelector('.events-grid');
        if (!eventsGrid) return;
        
        if (snapshot.exists()) {
            const events = snapshot.val();
            let eventsArray = Object.values(events);
            
            // Filter and sort events (show upcoming and ongoing events first, then past events)
            const now = new Date();
            eventsArray = eventsArray
                .filter(event => event.status !== 'cancelled')
                .map(event => ({
                    ...event,
                    isPast: isEventInPast(event.date, event.time)
                }))
                .sort((a, b) => {
                    // Sort by date (future events first, then past events)
                    const dateA = new Date(a.date + 'T' + a.time);
                    const dateB = new Date(b.date + 'T' + b.time);
                    
                    // If one is in the past and the other isn't, show future events first
                    if (a.isPast !== b.isPast) {
                        return a.isPast ? 1 : -1;
                    }
                    
                    // If both are in the same time category (past or future), sort by date
                    return dateA - dateB;
                })
                .slice(0, 6); // Show max 6 events
            
            // Clear existing events
            eventsGrid.innerHTML = '';
            
            // Add events to grid
            eventsArray.forEach((event, index) => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.setAttribute('data-aos', 'fade-up');
                eventCard.setAttribute('data-aos-delay', (index * 100).toString());
                
                const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                const statusColors = {
                    'upcoming': '#17a2b8',
                    'ongoing': '#28a745',
                    'full': '#ffc107',
                    'completed': '#6c757d'
                };
                
                const categoryIcons = {
                    'tree-planting': '🌳',
                    'cleanup': '🧹',
                    'education': '📚',
                    'workshop': '🔧',
                    'fundraiser': '💰',
                    'other': '🌱'
                };
                
                const isPastEvent = isEventInPast(event.date, event.time);
                const status = isPastEvent ? 'completed' : (event.status || 'upcoming');
                const statusText = isPastEvent ? 'PAST EVENT' : status.toUpperCase();
                
                eventCard.innerHTML = `
                    <div class="event-content">
                        ${event.image ? `<div class="event-image"><img src="${event.image}" alt="${event.title}"></div>` : ''}
                        <div class="event-info">
                            <div class="event-category">
                                ${categoryIcons[event.category] || '🌱'} ${event.category.replace('-', ' ').toUpperCase()}
                            </div>
                            <h3>${event.title}</h3>
                            <div class="event-details">
                                <p><i class="fas fa-calendar"></i> ${eventDate}</p>
                                <p><i class="fas fa-clock"></i> ${event.time}</p>
                                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                                <p><i class="fas fa-users"></i> ${event.registrations || 0}/${event.capacity} registered</p>
                            </div>
                            <p class="event-description">${event.description}</p>
                            <div class="event-footer">
                                <span class="event-status" style="background: ${isPastEvent ? '#6c757d' : (statusColors[status] || '#6c757d')};">
                                    ${statusText}
                                </span>
                                <button class="btn ${isPastEvent ? 'btn-outline-secondary' : 'btn-primary'}" 
                                    onclick="registerForEvent('${event.id}', '${event.title.replace(/'/g, "\\'")}', '${event.date}', '${event.time}')"
                                    ${isPastEvent ? 'disabled' : ''}>
                                    ${isPastEvent ? 'Event Ended' : (status === 'full' ? 'Join Waitlist' : 'Register Now')}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                eventsGrid.appendChild(eventCard);
            });
            
            // Reinitialize AOS for new elements
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
        } else {
            // Show default events message
            eventsGrid.innerHTML = `
                <div class="no-events-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #f8f9fa; border-radius: 15px; border: 2px dashed #e1e8e1;">
                    <i class="fas fa-calendar-plus" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
                    <h3 style="color: #6c757d; margin-bottom: 0.5rem;">No Events Scheduled</h3>
                    <p style="color: #6c757d;">We're planning exciting environmental events for our community. Stay tuned for updates!</p>
                </div>
            `;
        }
        
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

// Check if an event is in the past
function isEventInPast(eventDate, eventTime) {
    const now = new Date();
    const [hours, minutes] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(hours, minutes, 0, 0);
    
    return eventDateTime < now;
}

// Event registration function
window.registerForEvent = async function(eventId, eventTitle, eventDate, eventTime) {
    // Format the date and time for the registration system
    const eventDateTimeString = `${eventDate} at ${eventTime}`;
    
    // Check if the event is in the past
    if (isEventInPast(eventDate, eventTime)) {
        if (window.showNotification) {
            window.showNotification('❌ Registration is closed for past events. Please check our upcoming events!', 'error');
        } else {
            alert(`Sorry, registration for "${eventTitle}" is closed as this event has already occurred.`);
        }
        return;
    }
    
    // Use the proper registration system
    if (window.openEventRegistration) {
        window.openEventRegistration('dynamic-event', eventTitle, eventDateTimeString, 'Event Location');
    } else {
        // Fallback if registration system is not loaded
        alert(`Please wait for the page to fully load and try again.`);
    }
};

// Set up real-time listeners for content updates
function setupRealtimeListeners() {
    // Listen for hero content changes
    onValue(ref(database, 'content/hero'), (snapshot) => {
        if (snapshot.exists()) {
            loadHeroContent();
        }
    });
    
    // Listen for about content changes
    onValue(ref(database, 'content/about'), (snapshot) => {
        if (snapshot.exists()) {
            loadAboutContent();
        }
    });
    
    // Listen for impact stats changes
    onValue(ref(database, 'content/impact'), (snapshot) => {
        if (snapshot.exists()) {
            loadImpactStats();
        }
    });
    
    // Listen for testimonials changes
    onValue(ref(database, 'content/testimonials'), (snapshot) => {
        loadTestimonialsContent();
    });
    
    // Listen for events changes
    onValue(ref(database, 'content/events'), (snapshot) => {
        loadEventsContent();
    });
    
    // Listen for gallery changes
    onValue(ref(database, 'content/gallery'), (snapshot) => {
        loadGalleryContent();
    });
}

// Helper function to update stat counters with animation
function updateStatCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Load default hero content
function loadDefaultHeroContent() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.innerHTML = `Plant a Tree, <br><span class="gradient-text">Grow a Future</span> 🌱`;
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = "Together, we can turn cities green and make our planet breathe again";
    }
}

// Make functions globally available
window.initializeDynamicContent = initializeDynamicContent;
