// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show target section
                sections.forEach(section => section.classList.remove('active'));
                targetSection.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Smooth scroll to top of section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.querySelector('span').textContent;
            submitButton.querySelector('span').textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.querySelector('span').textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Initialize sparkles
    createSparkles();
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Initialize intersection observer for animations
    initScrollAnimations();
});

// Create dynamic sparkles
function createSparkles() {
    const sparkleContainers = document.querySelectorAll('.sparkle-bg');
    
    sparkleContainers.forEach(container => {
        // Create additional sparkles
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'dynamic-sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-sparkle ${Math.random() * 5 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8);
            `;
            container.appendChild(sparkle);
        }
    });
}

// Add hover effects
function addHoverEffects() {
    // Add shimmer effect to buttons on hover
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating effect to cards
    const cards = document.querySelectorAll('.story-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Add sparkle trail to mouse movement on hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        let mouseTimer;
        heroSection.addEventListener('mousemove', function(e) {
            clearTimeout(mouseTimer);
            mouseTimer = setTimeout(() => {
                createMouseSparkle(e.clientX, e.clientY);
            }, 50);
        });
    }
}

// Create sparkle at mouse position
function createMouseSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: rgba(255, 105, 180, 0.8);
        border-radius: 50%;
        pointer-events: none;
        animation: mouse-sparkle 0.8s ease-out forwards;
        z-index: 9999;
    `;
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

// Add mouse sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes mouse-sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(3) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
function initScrollAnimations() {
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

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.story-card, .product-card, .benefit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff69b4' : '#ff1493'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(255, 105, 180, 0.4);
        z-index: 10000;
        transform: translateX(400px);
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
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Show target section
        const sections = document.querySelectorAll('.section');
        sections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');
        
        // Smooth scroll
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Add parallax effect to decorative beads
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const beads = document.querySelectorAll('.bead');
    
    beads.forEach((bead, index) => {
        const speed = 0.5 + (index * 0.1);
        bead.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add dynamic bead generation
function generateBeads() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        for (let i = 0; i < 8; i++) {
            const bead = document.createElement('div');
            bead.className = 'dynamic-bead';
            bead.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ff69b4, #ff1493);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-bead ${Math.random() * 4 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 105, 180, 0.6);
                pointer-events: none;
                opacity: 0.6;
            `;
            section.appendChild(bead);
        }
    });
}

// Initialize dynamic beads
generateBeads();

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Reinitialize animations if needed
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    }
});

// Performance optimization - debounce scroll events
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

// Debounced scroll handler
const debouncedScroll = debounce(() => {
    // Add scroll-based animations here
}, 100);

window.addEventListener('scroll', debouncedScroll);
