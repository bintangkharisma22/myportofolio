// ===== Navigation Toggle (Mobile) =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(255, 20, 147, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 20, 147, 0.2)';
    }
});

// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const textArray = [
    'Spesialis Digital Marketing',
    'Social Media Expert',
    'Content Creator',
    'SEO Specialist',
    'Business Strategist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before next text
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// ===== Scroll Reveal Animation for Skill Cards =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
                
                // Animate progress bars
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 300);
                }
            }, index * 150);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    observer.observe(card);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && subject && message) {
        // Simulate form submission
        formMessage.className = 'form-message success';
        formMessage.textContent = `Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda melalui ${email}.`;
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } else {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Mohon lengkapi semua field!';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
    }
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scroll for all links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Home Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelector('.home-image');
    
    if (parallaxElements && scrolled < 800) {
        parallaxElements.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Add hover sound effect (optional - can be removed) =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Animate elements on scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-text, .about-image, .contact-info, .contact-form-wrapper');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial setup for animated elements
document.querySelectorAll('.about-text, .about-image, .contact-info, .contact-form-wrapper').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Cursor Effect (optional - adds a custom cursor trail) =====
let cursorDot = null;
let cursorOutline = null;

function createCursor() {
    // Create cursor dot
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: #FF1493;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s;
    `;
    
    // Create cursor outline
    cursorOutline = document.createElement('div');
    cursorOutline.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #FF1493;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursorOutline.style.left = (e.clientX - 15) + 'px';
        cursorOutline.style.top = (e.clientY - 15) + 'px';
    });
    
    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .skill-card, .contact-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    });
}

// Only create custom cursor on desktop
if (window.innerWidth > 968) {
    createCursor();
}

// ===== Image Lazy Loading (if you add real images later) =====
document.addEventListener('DOMContentLoaded', () => {
    // Handle profile photo loading
    const profilePhoto = document.querySelector('.profile-photo');
    const placeholder = document.querySelector('.about-img-placeholder');
    
    if (profilePhoto && profilePhoto.getAttribute('src') !== 'your-photo.jpg') {
        profilePhoto.addEventListener('load', () => {
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });
        
        profilePhoto.addEventListener('error', () => {
            // If image fails to load, show placeholder
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    }
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== Add ripple effect to buttons =====
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');

    const rippleEffect = button.getElementsByClassName('ripple')[0];
    if (rippleEffect) {
        rippleEffect.remove();
    }

    button.appendChild(ripple);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ===== Console Welcome Message =====
console.log('%c🎨 Welcome to Digital Portfolio! 🎨', 'color: #FF1493; font-size: 20px; font-weight: bold;');
console.log('%cDesigned with ❤️ using HTML, CSS, and JavaScript', 'color: #FF69B4; font-size: 14px;');
console.log('%cInterested in collaboration? Contact me! 🚀', 'color: #FFB6C1; font-size: 14px;');

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #FF1493; font-weight: bold;');
});