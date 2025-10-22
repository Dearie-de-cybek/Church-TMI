// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenuBtn && mobileMenu && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
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
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
}

// Copy Account Number functionality - FIXED VERSION
const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns.forEach(btn => {
    btn.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const textToCopy = this.getAttribute('data-copy');
        console.log('Attempting to copy:', textToCopy); // Debug log
        
        try {
            // Try modern Clipboard API first (works in secure contexts - HTTPS)
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                console.log('Copied using Clipboard API'); // Debug log
            } else {
                // Fallback for older browsers or non-secure contexts (HTTP)
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                
                // Make textarea invisible but accessible
                textarea.style.position = 'fixed';
                textarea.style.left = '-999999px';
                textarea.style.top = '-999999px';
                textarea.setAttribute('readonly', '');
                
                document.body.appendChild(textarea);
                
                // Select the text
                textarea.focus();
                textarea.select();
                textarea.setSelectionRange(0, 99999); // For mobile devices
                
                // Copy the text
                const successful = document.execCommand('copy');
                document.body.removeChild(textarea);
                
                if (!successful) {
                    throw new Error('execCommand failed');
                }
                console.log('Copied using execCommand'); // Debug log
            }
            
            // Visual feedback - Success
            const originalHTML = this.innerHTML;
            const originalBg = this.style.background || '';
            
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                if (originalBg) {
                    this.style.background = originalBg;
                } else {
                    this.style.background = '';
                }
                this.disabled = false;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text:', err);
            
            // Visual feedback - Error (show for a moment then restore)
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-times"></i>';
            this.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
            }, 2000);
            
            // Alert user as fallback
            alert('Account Number: ' + textToCopy + '\n\nPlease copy manually.');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
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

// Animate elements on scroll
const animateElements = document.querySelectorAll('.way-card, .account-details-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Way buttons functionality
const wayBtns = document.querySelectorAll('.way-btn');
wayBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const cardTitle = this.parentElement.querySelector('.way-title').textContent;
        
        if (cardTitle.includes('Mobile Transfer')) {
            // Scroll to account details
            const accountSection = document.querySelector('.account-details-card');
            if (accountSection) {
                accountSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                accountSection.style.animation = 'pulse 1s';
                setTimeout(() => {
                    accountSection.style.animation = '';
                }, 1000);
            }
        } else if (cardTitle.includes('In-Person')) {
            // Open Google Maps with church address
            const churchAddress = 'Ambrose Omafuvwe street behind new midwifery market, opposite the building materials market, off Okpanam road Asaba';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(churchAddress)}`;
            window.open(mapsUrl, '_blank');
        }
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .copy-btn:disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Scroll to top button
window.addEventListener('scroll', () => {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
});