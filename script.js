// script.js

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous feedback
        const formFeedback = document.getElementById('formFeedback');
        formFeedback.textContent = '';
        formFeedback.style.display = 'none';

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        // Validate each field
        if (name === '') {
            isValid = false;
            formFeedback.textContent += 'Name is required.\n';
        }

        if (email === '') {
            isValid = false;
            formFeedback.textContent += 'Email is required.\n';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            isValid = false;
            formFeedback.textContent += 'Email address is invalid.\n';
        }

        if (message === '') {
            isValid = false;
            formFeedback.textContent += 'Message is required.\n';
        }

        // Show feedback if not valid
        if (!isValid) {
            formFeedback.style.display = 'block';
            formFeedback.style.color = 'red';
            return;
        }

        // If valid, proceed with form submission (e.g., AJAX request)
        formFeedback.textContent = 'Form submitted successfully!';
        formFeedback.style.display = 'block';
        formFeedback.style.color = 'green';
        formFeedback.style.marginTop = '10px';

        // Example AJAX code to send form data to the server
        // fetch('your-server-endpoint', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ name, email, message })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Handle response
        //     console.log(data);
        //     formFeedback.textContent = 'Form submitted successfully!';
        //     formFeedback.style.color = 'green';
        // })
        // .catch(error => {
        //     // Handle error
        //     console.error('Error:', error);
        //     formFeedback.textContent = 'There was an error submitting the form. Please try again.';
        //     formFeedback.style.color = 'red';
        // });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Preloader Functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = 0;
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Lightbox Functionality
document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', function(e) {
        e.preventDefault();

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    });
});

// Mini-Gallery Lightbox
document.querySelectorAll('.mini-gallery-image').forEach(image => {
    image.addEventListener('click', function(e) {
        e.preventDefault();

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = this.src;
        lightbox.style.display = 'flex';

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    });
});

// Gallery Lightbox Navigation
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryArray = Array.from(galleryImages);
    let currentIndex = 0;

    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function() {
            currentIndex = galleryArray.indexOf(this);
        });
    });

    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === document.getElementById('lightbox-img')) {
            e.stopPropagation();
            currentIndex++;
            if (currentIndex >= galleryArray.length) {
                currentIndex = 0;
            }
            document.getElementById('lightbox-img').src = galleryArray[currentIndex].src;
        }
    });

    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === document.getElementById('lightbox-img')) {
            e.stopPropagation();
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = galleryArray.length - 1;
            }
            document.getElementById('lightbox-img').src = galleryArray[currentIndex].src;
        }
    });
});

// Preloader with Animation
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const preloaderBall = document.getElementById('preloader-ball');

    if (preloader && preloaderBall) {
        let angle = 0;
        setInterval(() => {
            angle += 4;
            preloaderBall.style.transform = `rotate(${angle}deg)`;
        }, 20);
    }
});

// Responsive Navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('hidden');
    });
});

// Hover Effects for Service Cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease-in-out';
    });

    card.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonialIndex = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonialIndex].classList.remove('active');
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        testimonials[currentTestimonialIndex].classList.add('active');
    }

    setInterval(showNextTestimonial, 5000);
});

// ARIA Attributes for Accessibility
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('button').forEach(button => {
        button.setAttribute('aria-label', button.textContent);
    });

    document.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.setAttribute('aria-labelledby', link.getAttribute('href').substring(1));
        }
    });
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryArray = Array.from(document.querySelectorAll('.gallery-image'));
        let currentIndex = galleryArray.indexOf(document.querySelector(`.gallery-image[src="${lightboxImg.src}"]`));

        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryArray.length;
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
        } else if (e.key === 'Escape') {
            document.getElementById('lightbox').style.display = 'none';
        }

        if (currentIndex !== -1) {
            lightboxImg.src = galleryArray[currentIndex].src;
        }
    }
});

// Dynamic Content Loading (Placeholder for Future Use)
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('dynamic-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Service Card Animation
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Lightbox with Caption
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-image');

    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');

            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.alt;
            lightbox.style.display = 'flex';

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.style.display = 'none';
                }
            });
        });
    });
});

// Preloader with Progress Bar
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progress-bar');

    if (preloader && progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                preloader.style.opacity = 0;
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        }, 50);
    }
});

// Responsive Mini-Gallery
document.addEventListener('DOMContentLoaded', function() {
    const miniGallery = document.getElementById('mini-gallery');
    const miniGalleryImages = document.querySelectorAll('.mini-gallery-image');

    if (window.innerWidth < 768) {
        miniGallery.style.flexDirection = 'column';
        miniGalleryImages.forEach(image => {
            image.style.margin = '10px';
        });
    } else {
        miniGallery.style.flexDirection = 'row';
        miniGalleryImages.forEach(image => {
            image.style.margin = '10px 10px 10px 0';
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            miniGallery.style.flexDirection = 'column';
            miniGalleryImages.forEach(image => {
                image.style.margin = '10px';
            });
        } else {
            miniGallery.style.flexDirection = 'row';
            miniGalleryImages.forEach(image => {
                image.style.margin = '10px 10px 10px 0';
            });
        }
    });
});

// Contact Form Placeholder
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('focusin', function(e) {
        e.target.style.borderColor = '#4CAF50';
    });

    contactForm.addEventListener('focusout', function(e) {
        e.target.style.borderColor = '#ccc';
    });
});

// Dynamic Mouse Cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('click', function(e) {
        cursor.classList.add('click-effect');
        setTimeout(() => {
            cursor.classList.remove('click-effect');
        }, 300);
    });
});

// Smooth Scrolling for Header Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.header-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');

    function loadImage(image) {
        const src = image.getAttribute('data-src');
        if (!src) {
            return;
        }
        image.src = src;
        image.removeAttribute('data-src');
    }

    function handleImageLoad(event) {
        event.target.classList.add('fade-in');
    }

    images.forEach(image => {
        loadImage(image);
        image.addEventListener('load', handleImageLoad);
    });
});

// Responsive Navbar Toggler
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('hidden');
    });
});

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
});

// Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('active');
            this.classList.toggle('active');

            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.remove('active');
                    otherHeader.classList.remove('active');
                }
            });
        });
    });
});

// Placeholder for Additional Features

// Function to add more features as required
function addMoreFeatures() {
    // Example placeholder for future features
    console.log('Adding more features...');
}

// Initialize additional features
addMoreFeatures();