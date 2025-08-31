/**
 * Index-specific JavaScript functionality
 * This file contains code that's only needed on the index page
 */

(function () {
    "use strict";

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // Initialize Simple Lightbox for product images
    function initializeLightbox() {
        // Initialize Simple Lightbox - much simpler and works great with picture elements
        var lightbox = new SimpleLightbox('.gallery-item', {
            showCaptions: true,
            captionAttribute: 'title',
            captionDelay: 250,
            overlay: true,
            spinner: true,
            close: true,
            showCounter: true,
            enableKeyboard: true,
            loop: true,
            docClose: true,
            swipeClose: true,
            alertError: true,
            alertErrorMessage: 'Image not found, next image will be loaded',
            additionalHtml: false
        });
    }

    // Initialize portfolio filtering functionality compatible with CSS classes
    function initializePortfolioFilter() {
        const filterButtons = document.querySelectorAll('.portfolio-menu button');
        const portfolioItems = document.querySelectorAll('#portfolio-container [data-filter]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    // Remove both show and hide classes first
                    item.classList.remove('show', 'hide');
                    
                    if (filterValue === 'all' || item.getAttribute('data-filter') === filterValue) {
                        item.classList.add('show');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // Contact form submission handling with EmailJS
    function initializeContactForm() {
        // Initialize EmailJS
        emailjs.init({
            publicKey: "pn-y9O1b8hQp5LKOs",
        });
        
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return; // Exit if no contact form found
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };
            
            // Change button to loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Skickar...';
            
            // Send email with 1 second delay
            setTimeout(() => {
                emailjs.send('service_ng4qk4v', 'template_tofjqfo', templateParams).then(
                    (response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button first
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        
                        // Then show success message after a brief delay
                        setTimeout(() => {
                            showSuccessMessage();
                        }, 200);
                    },
                    (error) => {
                        console.log('FAILED...', error);
                        
                        // Reset button
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        
                        // Show error message
                        setTimeout(() => {
                            showErrorMessage();
                        }, 200);
                    }
                );
            }, 1000);
        });
    }
    
    function showSuccessMessage() {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.contact-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create success alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show contact-alert mt-3';
        alertDiv.innerHTML = `
            <i class="lni lni-checkmark-circle me-2"></i>
            <strong>Tack!</strong> Ditt meddelande har skickats. Jag svarar så snart jag kan.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert after the form
        const contactForm = document.querySelector('.contact-form');
        contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    function showErrorMessage() {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.contact-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create error alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show contact-alert mt-3';
        alertDiv.innerHTML = `
            <i class="lni lni-warning me-2"></i>
            <strong>Ops!</strong> Något gick fel när meddelandet skulle skickas. Försök igen eller kontakta mig direkt.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert after the form
        const contactForm = document.querySelector('.contact-form');
        contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);
        
        // Auto-remove alert after 7 seconds
        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 7000);
    }

    // Initialize index-specific functionality when DOM is ready
    document.addEventListener("DOMContentLoaded", function () {
        // Initialize portfolio filtering
        initializePortfolioFilter();
        
        // Initialize lightbox
        initializeLightbox();
        
        // Initialize contact form
        initializeContactForm();
    });

})();