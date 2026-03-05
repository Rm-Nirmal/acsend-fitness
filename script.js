// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    function toggleMenu() {
        if (!mobileMenu) return; // Guard clause
        const isHidden = mobileMenu.classList.contains('translate-x-full');
        if (isHidden) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('bg-brand-black/95', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('bg-brand-black/95', 'backdrop-blur-md', 'shadow-lg');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // Contact Form Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get standard submit button
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;

            // Simple validation simulation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Simulate sending state
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;
            submitBtn.classList.remove('hover:bg-white');

            // Simulate API call to EmailJS (mock)
            setTimeout(() => {
                // Success state
                submitBtn.innerText = 'MESSAGE SENT!';
                submitBtn.classList.add('bg-green-600', 'text-white', 'border-transparent');
                submitBtn.classList.remove('bg-brand-silver', 'text-brand-black');

                // Clear form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-green-600', 'text-white', 'border-transparent');
                    submitBtn.classList.add('bg-brand-silver', 'text-brand-black', 'hover:bg-white');
                }, 3000);

            }, 1500);

            // NOTE FOR USER:
            // To make this actually send emails, you can use EmailJS (emailjs.com).
            // 1. Sign up for free.
            // 2. Add the script to your <head>: <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
            // 3. Initialize it: emailjs.init("YOUR_USER_ID");
            // 4. In this function, replace the setTimeout with:
            // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            //     .then(function() { ...success... }, function(error) { ...error... });
        });
    }
});
