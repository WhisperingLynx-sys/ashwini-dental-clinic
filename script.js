/*
 * Ashwini Dental Clinic Website - script.js
 * Author: AI Assistant
 * Version: 1.0
 * Date: August 16, 2025
 *
 * This file contains all the JavaScript functionality for the Ashwini Dental Clinic website,
 * including preloader management, dynamic navigation, mobile menu toggling,
 * testimonial carousel, FAQ accordion, scroll animations, form validation, and back-to-top button.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all core functionalities after the DOM is fully loaded.
    initializePreloader();
    setupNavbarScrollEffect();
    setupMobileMenu();
    setupTestimonialCarousel();
    setupAccordion();
    setupScrollAnimations();
    setupContactFormValidation();
    setupBackToTopButton();
    updateCopyrightYear(); // Call the function to update the copyright year
});

/**
 * Hides the preloader once the page content is loaded.
 * Uses a short delay to ensure all assets are ready and provide a smooth transition.
 */
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Wait for window to fully load all assets (images, etc.) before hiding.
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0'; // Start fading out
                // After fade, hide it completely to prevent blocking interactions
                preloader.addEventListener('transitionend', () => {
                    preloader.style.display = 'none';
                }, { once: true }); // Ensure event listener runs only once
            }, 500); // 500ms delay to ensure smooth transition
        });
    } else {
        console.warn('Preloader element with ID "preloader" not found.');
    }
}


/**
 * Adds a scroll effect to the navigation bar, making it shrink and add a shadow
 * when the user scrolls down the page.
 */
function setupNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) {
        console.warn('Navbar element with ID "navbar" not found.');
        return;
    }

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add scrolled class after 50px scroll
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Optional: Hide/Show navbar on scroll down/up (for mobile or complex designs)
        // if (window.scrollY > lastScrollY && window.scrollY > 200) {
        //     // Scrolling down
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     // Scrolling up
        //     navbar.style.transform = 'translateY(0)';
        // }
        lastScrollY = window.scrollY;
    });
}

/**
 * Sets up the mobile navigation menu toggle functionality.
 * Handles opening and closing the mobile menu and its overlay.
 */
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileMenuButton || !closeMenuButton || !mobileMenu || !mobileMenuOverlay) {
        console.warn('One or more mobile menu elements not found. Mobile menu functionality will be limited.');
        return;
    }

    // Function to open the mobile menu
    const openMenu = () => {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when menu is open
    };

    // Function to close the mobile menu
    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
    };

    mobileMenuButton.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu); // Close when clicking outside menu

    // Close mobile menu when a navigation link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Give a slight delay to allow smooth scroll before closing menu
            setTimeout(closeMenu, 300);
        });
    });
}

/**
 * Initializes the testimonial carousel, allowing users to navigate through testimonials.
 */
function setupTestimonialCarousel() {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('testimonial-prev');
    const nextButton = document.getElementById('testimonial-next');

    if (!testimonialTrack || testimonialSlides.length === 0 || !prevButton || !nextButton) {
        console.warn('Testimonial carousel elements not found. Carousel functionality disabled.');
        return;
    }

    let currentIndex = 0;
    const slidesPerView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const totalSlides = testimonialSlides.length;

    const updateCarousel = () => {
        const slideWidth = testimonialSlides[0].offsetWidth; // Get current width of a single slide
        let offset = -currentIndex * slideWidth; // Calculate the offset based on current index and slide width

        // Adjust offset if trying to go beyond bounds (looping effect for end/start)
        if (currentIndex >= totalSlides - (slidesPerView -1)) {
            offset = -(totalSlides - slidesPerView) * slideWidth;
            currentIndex = totalSlides - slidesPerView;
        }
        if (currentIndex < 0) {
            offset = 0;
            currentIndex = 0;
        }

        testimonialTrack.style.transform = `translateX(${offset}px)`;

        // Update button visibility (optional: could loop testimonials)
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex >= totalSlides - slidesPerView ? 'none' : 'block';
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Optional: Loop to end
            // currentIndex = totalSlides - slidesPerView;
        }
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalSlides - slidesPerView) {
            currentIndex++;
        } else {
            // Optional: Loop to start
            // currentIndex = 0;
        }
        updateCarousel();
    });

    // Recalculate layout on window resize
    window.addEventListener('resize', () => {
        // Re-determine slidesPerView on resize as well
        const newSlidesPerView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
        if (slidesPerView !== newSlidesPerView) {
            slidesPerView = newSlidesPerView; // Update the variable for slidesPerView
            currentIndex = 0; // Reset index on layout change to avoid weird jumps
        }
        updateCarousel();
    });

    // Initial update to set correct state
    updateCarousel();
}

/**
 * Sets up the accordion functionality for the FAQ section.
 * Toggles the visibility of accordion content when headers are clicked.
 */
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling; // Get the content div immediately after the header

            if (!content || !content.classList.contains('accordion-content')) {
                console.warn('Accordion content not found for header:', header);
                return;
            }

            // Close all other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle the clicked accordion
            header.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}

/**
 * Implements scroll-triggered animations for elements with the 'fade-in-up' class.
 * Elements become visible as they enter the viewport.
 */
function setupScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in-up');

    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Start animation 50px before entering viewport
    };

    const appearOnScroll = new IntersectionObserver((entries, appearObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearObserver.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

/**
 * Handles form validation for the contact form.
 * Prevents submission if fields are invalid and shows error messages.
 */
function setupContactFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    const errorMessage = document.getElementById('form-error-message');

    if (!contactForm || !successMessage || !errorMessage) {
        console.warn('Contact form or messages not found. Form validation disabled.');
        return;
    }

    // Function to show error message for a specific input
    const showError = (inputElement, errorElementId, message) => {
        const errorDiv = document.getElementById(errorElementId);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            inputElement.classList.add('border-red-500'); // Add red border to input
        }
    };

    // Function to hide error message for a specific input
    const hideError = (inputElement, errorElementId) => {
        const errorDiv = document.getElementById(errorElementId);
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            inputElement.classList.remove('border-red-500'); // Remove red border
        }
    };

    // Generic validation function
    const validateInput = (input, errorId) => {
        let isValid = true;
        if (input.hasAttribute('required') && input.value.trim() === '') {
            showError(input, errorId, `Please enter your ${input.name}.`);
            isValid = false;
        } else if (input.type === 'email' && !input.value.includes('@')) {
            showError(input, errorId, 'Please enter a valid email address.');
            isValid = false;
        } else if (input.type === 'tel' && input.value.trim() !== '' && !/^\+?[0-9\s-()]{7,20}$/.test(input.value)) {
            showError(input, errorId, 'Please enter a valid phone number.');
            isValid = false;
        } else {
            hideError(input, errorId);
        }
        return isValid;
    };

    // Event listeners for real-time validation feedback
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        const errorId = input.id + '-error'; // Assuming error div ID is input ID + '-error'
        input.addEventListener('input', () => validateInput(input, errorId));
        input.addEventListener('blur', () => validateInput(input, errorId));
    });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        let formIsValid = true;

        // Validate all required fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        formIsValid = validateInput(nameInput, 'name-error') && formIsValid;
        formIsValid = validateInput(emailInput, 'email-error') && formIsValid;
        formIsValid = validateInput(phoneInput, 'phone-error') && formIsValid; // Phone is optional, but still validate if filled
        formIsValid = validateInput(subjectInput, 'subject-error') && formIsValid;
        formIsValid = validateInput(messageInput, 'message-error') && formIsValid;

        if (formIsValid) {
            // Simulate form submission
            console.log('Form Submitted!', {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            });

            // Hide form and show success message
            contactForm.reset(); // Clear the form
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden'); // Ensure error message is hidden

            // Optionally hide success message after a few seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            }, 5000);

        } else {
            errorMessage.textContent = 'Please correct the errors in the form.';
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden'); // Ensure success message is hidden
        }
    });
}

/**
 * Sets up the back-to-top button functionality.
 * Shows/hides the button based on scroll position and smoothly scrolls to top when clicked.
 */
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) {
        console.warn('Back-to-top button not found.');
        return;
    }

    const toggleBackToTop = () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    window.addEventListener('load', toggleBackToTop); // Check on load too

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Updates the copyright year in the footer dynamically.
 */
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
