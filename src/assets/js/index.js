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

    // Initialize index-specific functionality when DOM is ready
    document.addEventListener("DOMContentLoaded", function () {
        // Initialize portfolio filtering
        initializePortfolioFilter();
        
        // Initialize lightbox
        initializeLightbox();
    });

})();