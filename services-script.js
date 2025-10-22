// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.schedule-card, .fellowship-card, .service-unit-card, .school-feature-card, .faq-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Add click handlers for buttons
document.addEventListener('DOMContentLoaded', () => {
    // Join Service Button
    const joinServiceBtn = document.querySelector('.join-service-btn');
    if (joinServiceBtn) {
        joinServiceBtn.addEventListener('click', () => {
            // Scroll to FAQ section or open contact
            const faqSection = document.querySelector('.faq-item');
            if (faqSection) {
                faqSection.scrollIntoView({ behavior: 'smooth' });
                // Auto-open the "How can I join" FAQ
                setTimeout(() => {
                    const joinFAQ = document.querySelectorAll('.faq-item')[1];
                    if (joinFAQ && !joinFAQ.classList.contains('active')) {
                        joinFAQ.querySelector('.faq-question').click();
                    }
                }, 600);
            }
        });
    }

    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('primary')) {
                // Plan Your Visit - scroll to schedule
                const scheduleSection = document.querySelector('.service-schedule-section');
                if (scheduleSection) {
                    scheduleSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (button.classList.contains('secondary')) {
                // Contact Us - scroll to contact FAQ
                const contactFAQ = document.querySelectorAll('.faq-item')[4];
                if (contactFAQ) {
                    contactFAQ.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        if (!contactFAQ.classList.contains('active')) {
                            contactFAQ.querySelector('.faq-question').click();
                        }
                    }, 600);
                }
            }
        });
    });

    // Service Unit Cards - Show tooltip or feedback
    const serviceUnitCards = document.querySelectorAll('.service-unit-card');
    serviceUnitCards.forEach(card => {
        card.addEventListener('click', () => {
            // Visual feedback
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);

            // Scroll to join section
            const joinBtn = document.querySelector('.join-service-btn');
            if (joinBtn) {
                joinBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                joinBtn.style.animation = 'pulse 1s';
                setTimeout(() => {
                    joinBtn.style.animation = '';
                }, 1000);
            }
        });
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);