odocument.addEventListener('DOMContentLoaded', function() {
    // Animate statistics counters when scrolled into view
    // Only target stats in the featured-in section to avoid conflicts with testimonials
    const statNumbers = document.querySelectorAll('#featured-in .stat-number');
    let animated = false;

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

    // Function to animate counter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            
            if (current >= target) {
                element.textContent = target.toLocaleString();
                return;
            }
            
            // Add '+' for numbers >= 1000
            if (target >= 1000 && current < target - step) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    };

    // Handle scroll event
    const handleScroll = () => {
        if (!animated && statNumbers.length > 0) {
            statNumbers.forEach(stat => {
                if (isInViewport(stat)) {
                    animated = true;
                    animateCounter(stat);
                }
            });
        }
    };

    // Initialize on load
    window.addEventListener('load', () => {
        // Add a small delay to ensure all elements are rendered
        setTimeout(() => {
            handleScroll();
            window.addEventListener('scroll', handleScroll);
        }, 500);
    });
});
