document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Toggle FAQ item
    function toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                answer.style.maxHeight = '0';
                answer.style.padding = '0 2rem';
            }
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '0 2rem 1.5rem';
            
            // Scroll to the question if it's not fully visible
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
            answer.style.padding = '0 2rem';
        }
    }
    
    // Add click event to each FAQ question
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => toggleFAQ(item));
        
        // Add keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });
    
    // Filter FAQs by category
    function filterFAQs(category) {
        const allFAQs = document.querySelectorAll('.faq-item');
        
        allFAQs.forEach(faq => {
            const faqCategory = faq.getAttribute('data-category');
            if (category === 'all' || faqCategory === category) {
                faq.style.display = 'block';
                
                // Add animation class when showing
                setTimeout(() => {
                    faq.style.opacity = '1';
                    faq.style.transform = 'translateY(0)';
                }, 50);
            } else {
                faq.style.display = 'none';
                faq.style.opacity = '0';
                faq.style.transform = 'translateY(20px)';
            }
        });
    }
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter FAQs
            const category = button.getAttribute('data-category');
            filterFAQs(category);
        });
    });
    
    // Animate FAQ items on scroll
    function animateOnScroll() {
        const faqItems = document.querySelectorAll('.faq-item:not(.visible)');
        
        faqItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100 * (index % 5));
            }
        });
    }
    
    // Initial animation on load
    setTimeout(animateOnScroll, 500);
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize first FAQ as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstAnswer.style.padding = '0 2rem 1.5rem';
    }
});
