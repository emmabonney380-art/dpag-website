// ============================================
// DPAG - DIASPORA PROJECT ASSIST GHANA
// JavaScript for Interactive Features
// ============================================

// ============================================
// Mobile Menu Toggle
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// Gallery Filter
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Form Submission
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message

        console.log('Form Data:', data);

        // Show success message
        showFormSuccess();

        // Reset form
        contactForm.reset();
    });
}

function showFormSuccess() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="background-color: #d4a574; color: #0a1628; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; text-align: center; font-weight: 600;">
            Thank you for reaching out! We'll get back to you soon.
        </div>
    `;

    const formWrapper = document.querySelector('.contact-form-wrapper');
    formWrapper.insertBefore(successDiv, contactForm);

    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// ============================================
// Scroll Animations - Intersection Observer
// ============================================

const observerOptions = {
    threshold: 0.1,
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

// Observe service cards, value cards, etc.
document.querySelectorAll('.service-card, .value-card, .choose-item, .gallery-item, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// Navbar Sticky Behavior
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// Counter Animation (for statistics if needed)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// WhatsApp Integration
// ============================================

// WhatsApp button already has href, this ensures compatibility
const whatsappBtn = document.querySelector('.btn-whatsapp');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        // Allow default href behavior
        const phoneNumber = '233502140800';
        const message = 'Hello DPAG! I would like to discuss my project in Ghana.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// ============================================
// Active Navigation Link Highlighting
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Lazy Loading Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Accessibility - Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ============================================
// Print Styles Check
// ============================================

window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = '#ffffff';
});

// ============================================
// Page Load Animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay for smooth page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// ============================================
// Utility: Debounce Function
// ============================================

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

// ============================================
// Handle Window Resize
// ============================================

const handleResize = debounce(() => {
    // Close mobile menu on resize if window is large
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ============================================
// Service Cards Hover Effect Enhancement
// ============================================

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    });
});

// ============================================
// Form Validation
// ============================================

function validateForm(formData) {
    const errors = [];

    if (!formData.fullname.trim()) {
        errors.push('Full Name is required');
    }

    if (!formData.email.trim()) {
        errors.push('Email is required');
    } else if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email');
    }

    if (!formData.phone.trim()) {
        errors.push('Phone number is required');
    }

    if (!formData.country.trim()) {
        errors.push('Country of residence is required');
    }

    if (!formData.service) {
        errors.push('Please select a service');
    }

    if (!formData.location.trim()) {
        errors.push('Project location is required');
    }

    if (!formData.message.trim()) {
        errors.push('Message is required');
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// Initialize Everything
// ============================================

console.log('DPAG Website Loaded Successfully');
console.log('Diaspora Project Assist Ghana - Your Trusted Representative');
