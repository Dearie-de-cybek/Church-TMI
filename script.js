// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            mobileMenu.classList.add('hidden');
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-opacity-95');
    } else {
        nav.classList.remove('bg-opacity-95');
    }
});

// Carousel Functionality
const carouselSlides = document.querySelector('.carousel-slides');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.carousel-slide').length;

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active', 'bg-purple-600');
            indicator.classList.remove('bg-gray-300');
        } else {
            indicator.classList.remove('active', 'bg-purple-600');
            indicator.classList.add('bg-gray-300');
        }
    });
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

// Indicator click functionality
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto-play carousel
let autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
});

// Timeline scroll animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Gallery Image Scroll Zoom and Pause Effect
const galleryImages = document.querySelectorAll('.gallery-image');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Zoom in when in view
            entry.target.classList.add('zoom-in');
            
            // Pause for a moment, then zoom out
            setTimeout(() => {
                entry.target.classList.remove('zoom-in');
            }, 2000); // Pause for 2 seconds
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

galleryImages.forEach(image => {
    galleryObserver.observe(image);
});

// Alternative: Scroll-based zoom effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    galleryImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            const scrollProgress = 1 - (rect.top / window.innerHeight);
            const scale = 1 + (scrollProgress * 0.15); // Zoom up to 1.15x
            
            if (scale <= 1.15) {
                image.style.transform = image.style.transform.replace(/scale\([^)]*\)/, '') + ` scale(${scale})`;
            }
        }
    });
}, { passive: true });

// Directions Button Click Handler
const directionsBtn = document.querySelector('.directions-btn');

if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
        // Replace with your actual church address
        const churchAddress = '123 Church Street, City, State, ZIP';
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchAddress)}`;
        window.open(mapsUrl, '_blank');
    });
}

// Intersection Observer for scroll animations
const directionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe directions section elements
document.querySelectorAll('.quote-text, .scripture-ref, .welcome-card').forEach(el => {
    directionsObserver.observe(el);
});

// Testimonies Carousel
const testimonyCards = document.querySelectorAll('.testimony-card');
const testimonyPrevBtn = document.querySelector('.testimony-prev');
const testimonyNextBtn = document.querySelector('.testimony-next');
const testimonyDots = document.querySelectorAll('.testimony-dots .dot');
let currentTestimony = 0;
const totalTestimonies = testimonyCards.length;

function updateTestimoniesCarousel() {
    testimonyCards.forEach((card, index) => {
        card.classList.remove('active', 'left', 'right');
        
        if (index === currentTestimony) {
            card.classList.add('active');
        } else if (index === (currentTestimony - 1 + totalTestimonies) % totalTestimonies) {
            card.classList.add('left');
        } else if (index === (currentTestimony + 1) % totalTestimonies) {
            card.classList.add('right');
        }
    });

    // Update dots
    testimonyDots.forEach((dot, index) => {
        if (index === currentTestimony) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimony() {
    currentTestimony = (currentTestimony + 1) % totalTestimonies;
    updateTestimoniesCarousel();
}

function prevTestimony() {
    currentTestimony = (currentTestimony - 1 + totalTestimonies) % totalTestimonies;
    updateTestimoniesCarousel();
}

function goToTestimony(index) {
    currentTestimony = index;
    updateTestimoniesCarousel();
}

// Event Listeners
if (testimonyPrevBtn) {
    testimonyPrevBtn.addEventListener('click', prevTestimony);
}

if (testimonyNextBtn) {
    testimonyNextBtn.addEventListener('click', nextTestimony);
}

testimonyDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimony(index));
});

// Initialize carousel
updateTestimoniesCarousel();

// Auto-play testimonies
let testimonyAutoplay = setInterval(nextTestimony, 6000);

// Pause on hover
const testimoniesWrapper = document.querySelector('.testimonies-carousel-wrapper');
if (testimoniesWrapper) {
    testimoniesWrapper.addEventListener('mouseenter', () => {
        clearInterval(testimonyAutoplay);
    });

    testimoniesWrapper.addEventListener('mouseleave', () => {
        testimonyAutoplay = setInterval(nextTestimony, 6000);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimony();
    } else if (e.key === 'ArrowRight') {
        nextTestimony();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (testimoniesWrapper) {
    testimoniesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testimoniesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextTestimony();
    }
    if (touchEndX > touchStartX + 50) {
        prevTestimony();
    }
}

// Give Button Click Handler
const giveButton = document.querySelector('.give-button');

if (giveButton) {
    giveButton.addEventListener('click', () => {
        // Replace with your actual donation page URL
        window.location.href = '#donate';
        // Or open in new tab: window.open('https://your-donation-page.com', '_blank');
    });
}

// Smooth scroll to top
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send to your email service or backend API
        // fetch('your-api-endpoint', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(formData)
        // });
    });
}


// Copy Account Number functionality
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        
        // Create temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Select and copy
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        // Visual feedback
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = 'linear-gradient(135deg, #9333ea, #a855f7)';
        }, 2000);
    });
});


// Events Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter events
        eventCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Smooth scroll for hero button
document.querySelector('.hero-scroll-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#all-events').scrollIntoView({
        behavior: 'smooth'
    });
});