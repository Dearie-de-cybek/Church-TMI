// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

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
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-opacity-95');
        } else {
            nav.classList.remove('bg-opacity-95');
        }
    });
}

// Carousel Functionality
const carouselSlides = document.querySelector('.carousel-slides');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const indicators = document.querySelectorAll('.indicator');

if (carouselSlides && prevBtn && nextBtn) {
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
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
    }
}

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
            entry.target.classList.add('zoom-in');
            setTimeout(() => {
                entry.target.classList.remove('zoom-in');
            }, 2000);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

galleryImages.forEach(image => {
    galleryObserver.observe(image);
});

// Directions Button Click Handler
const directionsBtn = document.querySelector('.directions-btn');

if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
        const churchAddress = 'Ambrose Omafuvwe street behind new midwifery market, opposite the building materials market, off Okpanam road Asaba';
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

document.querySelectorAll('.quote-text, .scripture-ref, .welcome-card').forEach(el => {
    directionsObserver.observe(el);
});

// Testimonies Carousel
const testimonyCards = document.querySelectorAll('.testimony-card');
const testimonyPrevBtn = document.querySelector('.testimony-prev');
const testimonyNextBtn = document.querySelector('.testimony-next');
const testimonyDots = document.querySelectorAll('.testimony-dots .dot');

if (testimonyCards.length > 0) {
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

    if (testimonyPrevBtn) {
        testimonyPrevBtn.addEventListener('click', prevTestimony);
    }

    if (testimonyNextBtn) {
        testimonyNextBtn.addEventListener('click', nextTestimony);
    }

    testimonyDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimony(index));
    });

    updateTestimoniesCarousel();

    let testimonyAutoplay = setInterval(nextTestimony, 6000);

    const testimoniesWrapper = document.querySelector('.testimonies-carousel-wrapper');
    if (testimoniesWrapper) {
        testimoniesWrapper.addEventListener('mouseenter', () => {
            clearInterval(testimonyAutoplay);
        });

        testimoniesWrapper.addEventListener('mouseleave', () => {
            testimonyAutoplay = setInterval(nextTestimony, 6000);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevTestimony();
        } else if (e.key === 'ArrowRight') {
            nextTestimony();
        }
    });

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
}

// Give Button Click Handler
const giveButton = document.querySelector('.give-button');

if (giveButton) {
    giveButton.addEventListener('click', () => {
        window.location.href = 'giving.html';
    });
}

// Smooth scroll to top
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

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

// ============================================
// CONTACT FORM - SEND TO WHATSAPP
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // ⚠️ IMPORTANT: Replace with your WhatsApp number
        // Format: Country code + number (no + or spaces or hyphens)
        // Examples:
        // Nigeria: 234 803 236 0189 becomes 2348032360189
        // USA: +1 555 123 4567 becomes 15551234567
        const whatsappNumber = '2348032360189'; // 👈 REPLACE WITH YOUR NUMBER
        
        // Create formatted WhatsApp message
        const whatsappMessage = 
            `*🙏 New Contact Form Message*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A%0A` +
            `*Message:*%0A${encodeURIComponent(message)}%0A%0A` +
            `_✉️ Sent from Twainman Ministry Website_`;
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showNotification('Opening WhatsApp... Please send the message.', 'success');
        
        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 1500);
    });
}

// Notification function
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.whatsapp-notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #25D366, #128C7E)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 9999;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
        max-width: 90%;
    `;
    
    notification.innerHTML = `
        <i class="fab fa-whatsapp" style="font-size: 24px;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .whatsapp-notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Copy Account Number functionality
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
    btn.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const textToCopy = this.getAttribute('data-copy');
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                textarea.style.position = 'fixed';
                textarea.style.left = '-999999px';
                textarea.setAttribute('readonly', '');
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
                this.disabled = false;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Account Number: ' + textToCopy);
        }
    });
});

// Events Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
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
const heroScrollBtn = document.querySelector('.hero-scroll-btn');
if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#all-events');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}