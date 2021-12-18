window.addEventListener('load', function() {
    let revealElements = Array.from(document.querySelectorAll('.reveal')); 
    window.addEventListener('scroll', function() {
        const viewportHeight = window.innerHeight;        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if(elementTop < viewportHeight && elementTop > 0) {
                element.classList.add('reveal_active');
            }
        });
    });
});