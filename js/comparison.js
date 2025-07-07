document.addEventListener('DOMContentLoaded', function() {
    // Add animation to table rows
    const tableRows = document.querySelectorAll('.comparison-table tbody tr');
    
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
    const animateTableRows = () => {
        tableRows.forEach((row, index) => {
            if (isInViewport(row) && !row.classList.contains('visible')) {
                // Add delay based on row index for staggered animation
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, 100 * index);
            }
        });
    };
    
    // Set initial styles for animation
    tableRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial check on load
    animateTableRows();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateTableRows);
    
    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.comparison-cta .btn-gradient');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add click animation to table rows
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            this.style.transform = 'translateX(5px)';
            setTimeout(() => {
                this.style.transform = 'translateX(0)';
            }, 150);
        });
    });
});
