document.addEventListener('DOMContentLoaded', function() {
    // Animate steps on scroll
    const stepCards = document.querySelectorAll('.step-card');
    const connectingLine = document.querySelector('.connecting-line');
    
    // Check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Handle scroll animation
    const handleScroll = () => {
        stepCards.forEach((card, index) => {
            if (isInViewport(card)) {
                card.classList.add('in-view');
                
                // Animate connecting line for this card
                const lineFill = document.querySelector('.connecting-line::after');
                if (lineFill) {
                    const progress = (index + 1) / stepCards.length;
                    lineFill.style.height = `${progress * 100}%`;
                }
            }
        });
    };

    // Initialize animation on load
    window.addEventListener('load', () => {
        // Add a small delay to ensure all elements are rendered
        setTimeout(() => {
            handleScroll();
            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);
        }, 500);
    });

    // Add hover effect for step cards
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });

    // Watch demo button functionality
    const watchDemoBtn = document.querySelector('.btn-watch-demo');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you can add a modal or video player
            alert('Demo video would play here!');
        });
    }
});
