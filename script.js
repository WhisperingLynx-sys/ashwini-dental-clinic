/*
 * Ashwini Dental Clinic Website JavaScript
 * Author: AI Assistant
 * Version: 1.0
 * Date: August 16, 2025
 *
 * This script provides interactivity and dynamic enhancements for the Ashwini Dental Clinic website.
 * It aims to create a smooth, responsive, and engaging user experience, contributing to the
 * "10k USD look" with subtle animations and robust functionality.
 *
 * Contents:
 * 1. DOM Content Loaded Listener (Main initialization point)
 * 2. Preloader Management
 * 3. Navbar Scroll Effect
 * 4. Mobile Navigation Menu Toggle
 * 5. Smooth Scrolling for Navigation Links
 * 6. Testimonial Carousel Functionality
 * 7. FAQ Accordion Functionality
 * 8. Scroll-Based Section Animations (Fade In Up)
 * 9. Back to Top Button Functionality
 * 10. Contact Form Submission Handling (Client-side validation and placeholder submission)
 * 11. Utility Functions
 * 12. Dynamic Footer Year Update
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. DOM Content Loaded Listener
    //    All primary functions are called here to ensure the DOM is fully loaded.
    // =========================================
    console.log('DOM Content Loaded: Initializing website scripts...');

    // Initialize all interactive components and effects
    initializePreloader();
    setupNavbarScrollEffect();
    setupMobileMenu();
    setupSmoothScrolling();
    setupTestimonialCarousel();
    setupFaqAccordion();
    setupScrollAnimations();
    setupBackToTopButton();
    setupContactForm();
    updateFooterYear();

    console.log('Website scripts initialized successfully.');
});

// =========================================
// 2. Preloader Management
//    Fades out the preloader once the page content is ready.
// =========================================
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            // Add a slight delay to ensure all assets (images, fonts) are loaded
            setTimeout(() => {
                preloader.classList.add('hidden'); // Triggers the fade-out via CSS opacity transition
                console.log('Preloader hidden.');
            }, 500); // 500ms delay after load event
        });
    }
}

// =========================================
// 3. Navbar Scroll Effect
//    Adds a 'navbar-scrolled' class to the navbar when the user scrolls down,
//    making it appear slightly smaller and with a more pronounced shadow.
// =========================================
function setupNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const scrollThreshold = 80; // Pixels scrolled before effect activates

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    console.log('Navbar scroll effect configured.');
}

// =========================================
// 4. Mobile Navigation Menu Toggle
//    Handles opening and closing the mobile sidebar menu.
// =========================================
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link'); // Get all mobile nav links

    if (!mobileMenuButton || !closeMenuButton || !mobileMenu || !mobileMenuOverlay) {
        console.warn('Mobile menu elements not found. Mobile menu functionality will be skipped.');
        return;
    }

    // Function to open the mobile menu
    const openMobileMenu = () => {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        console.log('Mobile menu opened.');
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('Mobile menu closed.');
    };

    // Event listeners for opening and closing the menu
    mobileMenuButton.addEventListener('click', openMobileMenu);
    closeMenuButton.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu); // Close when overlay is clicked

    // Close mobile menu when a navigation link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    console.log('Mobile menu setup complete.');
}


// =========================================
// 5. Smooth Scrolling for Navigation Links
//    Enables smooth scrolling to sections when internal navigation links are clicked.
// =========================================
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Exclude links that are part of other components, e.g., carousel controls, external links
        if (anchor.href.includes('#') && !anchor.classList.contains('carousel-control')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default jump behavior

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0; // Get dynamic navbar height
                    const offset = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; // Adjust for navbar and a little extra padding

                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });

                    // Update active class for desktop navigation
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active'); // Set current link as active

                    console.log(`Smooth scroll initiated for ${targetId}`);
                }
            });
        }
    });

    // Handle active class on scroll for desktop navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNavLink = () => {
        let currentSectionId = '';
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust offset for navbar and padding
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call on load to set initial active link

    console.log('Smooth scrolling and active link tracking configured.');
}

// =========================================
// 6. Testimonial Carousel Functionality
//    Implements a simple, responsive carousel for testimonials.
// =========================================
function setupTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextButton = document.getElementById('testimonial-next');
    const prevButton = document.getElementById('testimonial-prev');

    if (!track || slides.length === 0 || !nextButton || !prevButton) {
        console.warn('Testimonial carousel elements not found or not enough slides. Carousel functionality will be skipped.');
        return;
    }

    let currentIndex = 0;
    let slidesPerPage = 3; // Default for large screens

    // Function to calculate slides per page based on current viewport width
    const updateSlidesPerPage = () => {
        if (window.innerWidth >= 1024) {
            slidesPerPage = 3;
        } else if (window.innerWidth >= 768) {
            slidesPerPage = 2;
        } else {
            slidesPerPage = 1;
        }
        updateCarouselPosition(); // Recalculate position if slidesPerPage changes
    };

    // Function to update the carousel's visual position
    const updateCarouselPosition = () => {
        // Ensure slides[0] exists before trying to access its offsetWidth
        if (slides.length === 0) {
            console.warn('No slides found for carousel position update.');
            return;
        }
        const slideWidth = slides[0].offsetWidth; // Get the actual width of one slide, including padding/margin
        // Calculate the total width to scroll based on current index and slidesPerPage
        // We want to align the start of the current 'page' of slides
        const offset = (currentIndex * slideWidth);
        track.style.transform = `translateX(-${offset}px)`;
        console.log(`Carousel position updated to index: ${currentIndex}, offset: ${offset}px`);
    };

    // Go to the next set of slides
    const goToNextSlide = () => {
        // Ensure slides array is not empty
        if (slides.length === 0) return;

        const maxIndex = Math.max(0, slides.length - slidesPerPage); // Ensure maxIndex is not negative
        if (currentIndex < maxIndex) {
            currentIndex += 1;
        } else {
            currentIndex = 0; // Wrap around to the beginning
        }
        updateCarouselPosition();
    };


    // Go to the previous set of slides
    const goToPrevSlide = () => {
        // Ensure slides array is not empty
        if (slides.length === 0) return;

        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            // If at the beginning, wrap around to the end (displaying the last 'page' of slides)
            currentIndex = Math.max(0, slides.length - slidesPerPage); // Go to the beginning of the last visible set
        }
        updateCarouselPosition();
    };


    // Event listeners for carousel controls
    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);

    // Initial setup and update on window resize
    window.addEventListener('resize', () => {
        updateSlidesPerPage();
        // Re-adjust current index if it now exceeds the new maximum allowed index
        currentIndex = Math.min(currentIndex, Math.max(0, slides.length - slidesPerPage));
        updateCarouselPosition();
    });
    updateSlidesPerPage(); // Initial call
    updateCarouselPosition(); // Initial call to set correct position

    console.log('Testimonial carousel setup complete.');
}


// =========================================
// 7. FAQ Accordion Functionality
//    Toggles the visibility of FAQ answers when their headers are clicked.
// =========================================
function setupFaqAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Function to update the max-height of an active accordion item
    const updateAccordionMaxHeight = (contentElement) => {
        if (contentElement.classList.contains('active')) {
            contentElement.style.maxHeight = contentElement.scrollHeight + "px";
        } else {
            contentElement.style.maxHeight = "0";
        }
    };

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling; // The content div immediately after the header

            if (content && content.classList.contains('accordion-content')) {
                // Toggle active class on the header itself for styling (e.g., arrow rotation)
                header.classList.toggle('active');
                content.classList.toggle('active'); // Toggle active class on content for expand/collapse

                // Auto-adjust max-height for accordion content when expanding/collapsing
                updateAccordionMaxHeight(content);

                console.log(`Accordion item toggled: ${header.id}, active state: ${content.classList.contains('active')}`);
            }
        });
    });

    // Add a resize listener to re-calculate max-height for all active accordions
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            updateAccordionMaxHeight(content);
            console.log(`Accordion content max-height re-calculated on resize for: ${content.previousElementSibling.id}`);
        });
    });

    console.log('FAQ accordion setup complete.');
}

// =========================================
// 8. Scroll-Based Section Animations (Fade In Up)
//    Adds a 'visible' class to elements with 'fade-in-up' when they enter the viewport.
// =========================================
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    if (animatedElements.length === 0) {
        console.log('No scroll-animated elements found.');
        return;
    }

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% of the element must be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                console.log(`Element became visible: ${entry.target.id || entry.target.tagName}`); // More verbose log
                // For section headings, also trigger the underline animation
                const sectionHeading = entry.target.querySelector('.section-heading');
                if (sectionHeading) {
                    sectionHeading.classList.add('visible'); // Triggers :after animation
                    console.log(`Section heading animated: ${sectionHeading.textContent.trim()}`);
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
    console.log(`Observing ${animatedElements.length} elements for scroll animations.`);
}


// =========================================
// 9. Back to Top Button Functionality
//    Shows/hides the button based on scroll position and smoothly scrolls to top.
// =========================================
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) {
        console.warn('Back to top button not found.');
        return;
    }

    const scrollThreshold = 400; // Pixels scrolled before button appears

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to the top
        });
        console.log('Back to top button clicked.');
    });
    console.log('Back to top button setup complete.');
}


// =========================================
// 10. Contact Form Submission Handling
//     Client-side validation and placeholder submission.
//     In a real application, this would send data to a backend.
// =========================================
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    const errorMessage = document.getElementById('form-error-message');

    if (!contactForm) {
        console.warn('Contact form not found.');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Reset messages and errors
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        document.querySelectorAll('.form-error-message').forEach(err => err.classList.add('hidden'));

        let isValid = true; // Flag to track overall form validity

        // Basic client-side validation
        const name = contactForm.elements['name'];
        if (name.value.trim() === '') {
            isValid = false;
            document.getElementById('name-error').classList.remove('hidden');
        }

        const email = contactForm.elements['email'];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            isValid = false;
            document.getElementById('email-error').classList.remove('hidden');
        }

        const subject = contactForm.elements['subject'];
        if (subject.value.trim() === '') {
            isValid = false;
            document.getElementById('subject-error').classList.remove('hidden');
        }

        const message = contactForm.elements['message'];
        if (message.value.trim() === '') {
            isValid = false;
            document.getElementById('message-error').classList.remove('hidden');
        }

        const phone = contactForm.elements['phone'];
        // Optional: Phone number validation (simple regex, can be more complex)
        const phonePattern = /^\+?[0-9\s-()]{7,20}$/; // Allows +, numbers, spaces, hyphens, parentheses
        if (phone.value.trim() !== '' && !phonePattern.test(phone.value.trim())) {
            isValid = false;
            document.getElementById('phone-error').classList.remove('hidden');
        }


        if (isValid) {
            console.log('Form is valid. Attempting to submit...');
            // Simulate form submission
            // In a real application, you would send this data to a server using fetch() or XMLHttpRequest
            // Example:
            /*
            const formData = new FormData(contactForm);
            fetch('/api/contact', { // Replace with your actual backend endpoint
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    successMessage.classList.remove('hidden');
                    contactForm.reset(); // Clear form fields on success
                    console.log('Form submitted successfully:', data);
                } else {
                    errorMessage.classList.remove('hidden');
                    console.error('Form submission failed:', data.message);
                }
            })
            .catch(error => {
                errorMessage.classList.remove('hidden');
                console.error('Network or server error:', error);
            });
            */

            // For this example, we'll just show a success message after a delay
            setTimeout(() => {
                successMessage.classList.remove('hidden');
                contactForm.reset(); // Clear form fields
                console.log('Simulated form submission successful!');
            }, 1000); // Simulate network delay
        } else {
            console.warn('Form validation failed. Please check inputs.');
            // Optionally scroll to the first error
            const firstErrorField = document.querySelector('.form-error-message:not(.hidden)');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    console.log('Contact form validation and submission setup complete.');
}


// =========================================
// 11. Utility Functions (if needed, keep here)
// =========================================
// Example: A simple debounce function to limit event handler calls
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Example usage of debounce for resize events:
// window.addEventListener('resize', debounce(() => {
//     console.log('Window resized!');
//     // Call functions that need to react to resize here
// }, 250));


// =========================================
// 12. Dynamic Footer Year Update
//     Automatically updates the copyright year in the footer.
// =========================================
function updateFooterYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
        console.log('Footer year updated.');
    }
}
