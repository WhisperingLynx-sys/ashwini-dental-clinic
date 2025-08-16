/**
 * Ashwini Dental Clinic Website - script.js
 * Author: AI Assistant
 * Version: 1.0 (Complete Rebuild - Premium Look Finalized)
 * Date: August 16, 2025
 *
 * This script provides all the necessary interactivity for the Ashwini Dental Clinic website,
 * including navigation enhancements, content carousels, accordion functionality,
 * scroll animations, and a preloader.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Hide
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Ensure preloader is visible initially, then fade out
        preloader.style.opacity = '1';
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => preloader.style.display = 'none', { once: true });
        }, 500); // Wait for 0.5s before fading out
    }

    // 2. Navbar Sticky & Active Link Logic
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section');

    const updateNavbar = () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update active nav link based on scroll position
        let currentActive = 'hero'; // Default to hero if at top
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 30; // Offset for sticky header
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call to set state on load

    // 3. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Prevent scrolling body when menu is open
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu); // Close when clicking outside

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                // Check if it's a mobile nav link, not a desktop one that's hidden
                if (link.classList.contains('mobile-nav-link')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Carousel Functionality (Testimonials and Doctors)
    const setupCarousel = (trackId, prevBtnId, nextBtnId, slideWidthFactor = 1) => {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        if (!track || !prevBtn || !nextBtn) return; // Exit if elements not found

        let currentSlide = 0;
        const slides = track.children; // Get all slide elements
        const totalSlides = slides.length;

        // Function to update carousel position
        const updateCarousel = () => {
            let offset = slides[currentSlide].offsetLeft;
            track.style.transform = `translateX(-${offset}px)`;

            // Adjust for partial slide visibility based on window width
            let visibleSlides = 1;
            if (window.innerWidth >= 768) { // md breakpoint
                visibleSlides = 2;
            }
            if (window.innerWidth >= 1024) { // lg breakpoint
                visibleSlides = 3;
            }

            // Hide/show controls based on current slide
            prevBtn.style.display = currentSlide === 0 ? 'none' : 'block';
            nextBtn.style.display = currentSlide >= (totalSlides - visibleSlides) ? 'none' : 'block';
        };

        prevBtn.addEventListener('click', () => {
            currentSlide = Math.max(0, currentSlide - 1);
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            let visibleSlides = 1;
            if (window.innerWidth >= 768) {
                visibleSlides = 2;
            }
            if (window.innerWidth >= 1024) {
                visibleSlides = 3;
            }
            currentSlide = Math.min(totalSlides - visibleSlides, currentSlide + 1);
            updateCarousel();
        });

        // Update carousel on window resize to adjust visible slides and offsets
        window.addEventListener('resize', updateCarousel);

        updateCarousel(); // Initial positioning
    };

    setupCarousel('testimonialTrack', 'prevTestimonial', 'nextTestimonial');
    setupCarousel('doctorTrack', 'prevDoctor', 'nextDoctor');


    // 6. Accordion Functionality (FAQ Section)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = document.getElementById(`accordion-content-${header.dataset.accordion}`);
            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    document.getElementById(`accordion-content-${otherHeader.dataset.accordion}`).classList.remove('active');
                }
            });

            // Toggle current accordion
            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });

    // 7. Form Validation and Submission (Contact Form)
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Simple validation for Name
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Simple validation for Email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Simple validation for Message (optional, but good practice)
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (messageInput.value.trim() === '') {
             messageError.style.display = 'block';
             isValid = false;
        } else {
            messageError.style.display = 'none';
        }


        if (isValid) {
            // In a real application, you would send this data to a server
            console.log('Form Submitted!', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: messageInput.value.trim()
            });

            // Show success message
            formSuccessMessage.style.display = 'block';
            contactForm.reset(); // Clear the form
            // Hide success message after a few seconds
            setTimeout(() => {
                formSuccessMessage.style.display = 'none';
            }, 5000);
        }
    });

    // 8. Fade-in-up animations on scroll (Intersection Observer)
    const faders = document.querySelectorAll('.fade-in-up');
    const appearOptions = {
        threshold: 0.15, // Trigger when 15% of the element is in view
        rootMargin: "0px 0px -50px 0px" // Shrink viewport by 50px from bottom
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 9. Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    const toggleBackToTop = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop(); // Initial check

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
