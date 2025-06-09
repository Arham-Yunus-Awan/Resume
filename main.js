        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
// Initialize EmailJS with your User ID
(function() {
    emailjs.init("Dp-b-j8s-i4iHowEq"); // Replace with your actual EmailJS user ID
})();

// Handle form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("service_p5q0dok", "template_6udyg97", {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        alert('Message sent successfully!');
        document.querySelector('form').reset(); // Clear the form
    }, function(error) {
        alert('Failed to send message. Please try again later.');
        console.error('EmailJS Error:', error);
    });
});


document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update the button text based on the current theme
        if (theme === 'light') {
            themeToggleBtn.textContent = 'Switch to Dark';
            // You can also change button classes here if you want distinct button styles per theme
            themeToggleBtn.classList.remove('btn-dark');
            themeToggleBtn.classList.add('btn-light');
        } else {
            themeToggleBtn.textContent = 'Switch to Light';
            themeToggleBtn.classList.remove('btn-light');
            themeToggleBtn.classList.add('btn-dark');
        }
    };

    // 1. Check for a saved theme preference when the page loads
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // If a theme is saved, apply it
        setTheme(savedTheme);
    } else {
        // If no theme is saved (first visit), default to 'light'
        setTheme('light');
    }

    // 2. Add an event listener to the toggle button for theme switching
    themeToggleBtn.addEventListener('click', () => {
        // Get the current theme from the body's data-theme attribute
        const currentTheme = body.getAttribute('data-theme');
        // Determine the new theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
});