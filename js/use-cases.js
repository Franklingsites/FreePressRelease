document.addEventListener('DOMContentLoaded', function() {
    // Animate use case cards on scroll
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    // Function to handle scroll animation
    const animateOnScroll = () => {
        useCaseCards.forEach((card, index) => {
            if (isInViewport(card) && !card.classList.contains('visible')) {
                // Add delay based on card position for staggered animation
                setTimeout(() => {
                    card.classList.add('visible');
                }, 150 * index);
            }
        });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta-box .btn-large');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Add click animation to cards
    useCaseCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
