document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('active');
        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        // Hamburger Animation
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(item => {
                item.style.animation = '';
            });
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Form Submission
    const pressReleaseForm = document.getElementById('pressReleaseForm');
    if (pressReleaseForm) {
        pressReleaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const headline = document.getElementById('headline').value;
            const content = document.getElementById('content').value;
            const email = document.getElementById('email').value;
            
            // Simple validation
            if (!headline || !content || !email) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Your press release has been submitted successfully! We\'ll review it shortly.', 'success');
                
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 2000);
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Show notification function
    function showNotification(message, type = 'success') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add notification to the page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .section-header, .form-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check for elements in viewport
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 0.5) / 100;
            const y = (window.innerHeight - e.pageY * 0.5) / 100;
            
            hero.style.backgroundPosition = `${x}px ${y}px`;
        });
    }
    
    // Add animation to form inputs on focus
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value !== '') {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Add character counter for textarea
    const contentTextarea = document.getElementById('content');
    if (contentTextarea) {
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.textContent = '0/2000';
        contentTextarea.parentNode.appendChild(charCount);
        
        contentTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 2000;
            charCount.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength) {
                charCount.style.color = '#ff4757';
            } else {
                charCount.style.color = '#94a3b8';
            }
        });
    }
});

// Add CSS for animations and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .header.scroll-down {
        transform: translateY(-100%);
    }
    
    .header.scroll-up {
        transform: translateY(0);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 9999;
        max-width: 90%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        background: #2ecc71;
    }
    
    .notification.error {
        background: #e74c3c;
    }
    
    .char-count {
        position: absolute;
        bottom: 10px;
        right: 15px;
        font-size: 0.8rem;
        color: #94a3b8;
        pointer-events: none;
    }
    
    /* Animation for feature cards */
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    .feature-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Glow effect on hover */
    .feature-card::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 15px;
        padding: 2px;
        background: linear-gradient(135deg, rgba(67, 97, 238, 0.4) 0%, rgba(76, 201, 240, 0.4) 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    }
    
    .feature-card:hover::after {
        opacity: 1;
    }
    
    /* Pulse animation for CTA button */
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(67, 97, 238, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(67, 97, 238, 0);
        }
    }
    
    .btn-primary {
        animation: pulse 2s infinite;
    }
    
    .btn-primary:hover {
        animation: none;
    }
`;

document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', function() {
    // Animate testimonial cards on scroll
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Testimonial Popup Functions
function openTestimonialPopup() {
    const popup = document.getElementById("testimonial-popup");
    if (popup) {
        popup.style.display = "block";
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    }
}

function closeTestimonialPopup() {
    const popup = document.getElementById("testimonial-popup");
    if (popup) {
        popup.style.display = "none";
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Image Preview Function
function previewImage(input) {
    const preview = document.getElementById('profile-preview');
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.objectFit = 'cover';
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Initialize star rating functionality
document.addEventListener('DOMContentLoaded', function() {
    // Star rating functionality
    const stars = document.querySelectorAll('.rating-stars .fa-star');
    const ratingInput = document.getElementById('rating');
    
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                ratingInput.value = rating;
                
                // Update star display
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
            
            // Hover effect for stars
            star.addEventListener('mouseover', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const currentRating = parseInt(ratingInput.value);
                stars.forEach((s, index) => {
                    if (index >= currentRating) {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }
    
    // Close popup when clicking outside the form
    const popup = document.getElementById('testimonial-popup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeTestimonialPopup();
            }
        });
    }
});

// Form Submission Handler
function submitTestimonial(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('full-name').value.trim();
    const profession = document.getElementById('profession').value.trim();
    const rating = document.getElementById('rating').value;
    const testimonial = document.getElementById('testimonial-text').value.trim();
    const profileImage = document.getElementById('profile-image').files[0];
    
    // Basic validation
    if (!name || !profession || rating === '0' || !testimonial) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would typically send this data to a server
    console.log('Submitting testimonial:', {
        name,
        profession,
        rating,
        testimonial,
        profileImage: profileImage ? profileImage.name : 'No image'
    });
    
    // Show success message
    alert('Thank you for your testimonial! It will be reviewed and published soon.');
    
    // Reset form
    document.getElementById('testimonial-form').reset();
    document.getElementById('profile-preview').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    document.querySelectorAll('.rating-stars .fa-star').forEach(star => {
        star.classList.remove('fas');
        star.classList.add('far');
    });
    
    // Close popup
    closeTestimonialPopup();
}

// Add hover effect to CTA button
const ctaButton = document.querySelector('.case-studies-cta .btn-gradient');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
}