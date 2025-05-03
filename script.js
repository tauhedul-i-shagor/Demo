// Add JavaScript for smooth scrolling, click-to-call buttons, etc.

document.addEventListener('DOMContentLoaded', () => {
    // Background gradient animation
    const updateGradientPosition = () => {
        const scrollY = window.scrollY;
        const scrollFactor = 0.1; // Adjust this value to control the animation speed
        
        // Calculate new positions based on scroll
        const pos1 = `${20 + scrollY * scrollFactor * 0.5}% ${20 + scrollY * scrollFactor * 0.3}%`;
        const pos2 = `${80 - scrollY * scrollFactor * 0.4}% ${80 - scrollY * scrollFactor * 0.2}%`;
        const pos3 = `${50 + Math.sin(scrollY * 0.001) * 10}% ${50 + Math.cos(scrollY * 0.001) * 10}%`;
        
        // Update CSS variables
        document.documentElement.style.setProperty('--gradient-pos-1', pos1);
        document.documentElement.style.setProperty('--gradient-pos-2', pos2);
        document.documentElement.style.setProperty('--gradient-pos-3', pos3);
    };

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateGradientPosition);
    });

    // Initial call to set positions
    updateGradientPosition();

    // Handle image fallbacks
    document.querySelectorAll('img').forEach(img => {
        // Check if image failed to load
        if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
            img.parentElement.classList.add('use-placeholder');
        }
        
        // Add error handling for images that fail to load
        img.addEventListener('error', function() {
            this.parentElement.classList.add('use-placeholder');
        });
    });

    // Hamburger menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default behavior
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Click-to-call functionality for buttons with data-tel attribute
    document.querySelectorAll('button[data-tel]').forEach(button => {
        button.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('data-tel');
            if (phoneNumber) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
    });

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

    function updateActiveSection() {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Update active section on scroll and initial load
    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();
}); 