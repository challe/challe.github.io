(function () {
    // section menu active
    function onScroll(event) {
      var sections = document.querySelectorAll('.page-scroll');
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      for (var i = 0; i < sections.length; i++) {
        var currLink = sections[i];
        var val = currLink.getAttribute('href');
        // Strip leading slash if present
        if (val.startsWith('/')) {
          val = val.substring(1);
        }
        var refElement = document.querySelector(val);
        var scrollTopMinus = scrollPos + 73;
        if (refElement && refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
          document.querySelector('.page-scroll').classList.remove('active');
          currLink.classList.add('active');
        } else {
          currLink.classList.remove('active');
        }
      }
    }

    window.document.addEventListener('scroll', onScroll);

    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
        } else {
            header_navbar.classList.remove("sticky");
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            // Check if we're on the index page
            const isIndexPage = window.location.pathname === '/' || 
                               window.location.pathname.endsWith('/index.html') || 
                               window.location.pathname === '/index.html';
            
            // Only prevent default and scroll if we're on the index page
            // and the target element exists
            if (isIndexPage) {
                const targetElement = document.querySelector(elem.getAttribute('href'));
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        offsetTop: 1 - 120,
                    });
                }
            }
            // If not on index page, let the link navigate normally to index.html#section
        });
    });



    "use strict";

    /*=====================================
    Custom JavaScript for Drumla website
    ======================================= */
    
    // Add click event listener to each link that hides sidebarLeft and overlayLeft
    document.querySelector(".sidebar-menu").addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        document.querySelector(".sidebar-left").classList.remove("open");
        document.querySelector(".overlay-left").classList.remove("open");
      }
    });

    // Close navbar-collapse when a link is clicked
    let navbarTogglerNine = document.querySelector(
      ".navbar-nine .navbar-toggler"
    );
    navbarTogglerNine.addEventListener("click", function () {
      navbarTogglerNine.classList.toggle("active");
    });

    // Left sidebar toggle
    let sidebarLeft = document.querySelector(".sidebar-left");
    let overlayLeft = document.querySelector(".overlay-left");
    let sidebarClose = document.querySelector(".sidebar-close .close");

    overlayLeft.addEventListener("click", function () {
      sidebarLeft.classList.toggle("open");
      overlayLeft.classList.toggle("open");
    });
    sidebarClose.addEventListener("click", function () {
      sidebarLeft.classList.remove("open");
      overlayLeft.classList.remove("open");
    }); 

    // Navbar nine sideMenu
    let sideMenuLeftNine = document.querySelector(".navbar-nine .menu-bar");

    sideMenuLeftNine.addEventListener("click", function () {
      sidebarLeft.classList.add("open");
      overlayLeft.classList.add("open");
    });

    // Main DOMContentLoaded event handler
    document.addEventListener("DOMContentLoaded", function () {
      const navLinks = document.querySelectorAll('.page-scroll');
      const navbarCollapse = document.getElementById('navbarNine');
      const toggleButton = document.querySelector('.navbar-toggler');

      // Close navbar when nav links are clicked
      navLinks.forEach(link => {
        link.addEventListener('click', function () {
          if (navbarCollapse && toggleButton) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
              toggle: false
            });
            bsCollapse.hide();

            // Reset toggle button state
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.remove('active');
          }
        });
      });

      // Initialize contact form (now global)
      initializeContactForm();
    });

  // Contact form submission handling with EmailJS
  function initializeContactForm() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init({
        publicKey: "pn-y9O1b8hQp5LKOs",
      });
    }
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return; // Exit if no contact form found
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        page: formData.get('page')
      };
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Skickar...';
      setTimeout(() => {
        if (typeof emailjs !== 'undefined') {
          emailjs.send('service_ng4qk4v', 'template_tofjqfo', templateParams).then(
            (response) => {
              contactForm.reset();
              submitButton.disabled = false;
              submitButton.innerHTML = originalButtonText;
              setTimeout(() => { showSuccessMessage(); }, 200);
            },
            (error) => {
              submitButton.disabled = false;
              submitButton.innerHTML = originalButtonText;
              setTimeout(() => { showErrorMessage(); }, 200);
            }
          );
        }
      }, 500);
    });
  }

  function showSuccessMessage() {
    const existingAlert = document.querySelector('.contact-alert');
    if (existingAlert) { existingAlert.remove(); }
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show contact-alert mt-3';
    alertDiv.innerHTML = `
      <i class="lni lni-checkmark-circle me-2"></i>
      <strong>Tack!</strong> Ditt meddelande har skickats. Jag svarar så snart jag kan.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);
    setTimeout(() => { if (alertDiv && alertDiv.parentNode) { alertDiv.remove(); } }, 5000);
  }

  function showErrorMessage() {
    const existingAlert = document.querySelector('.contact-alert');
    if (existingAlert) { existingAlert.remove(); }
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show contact-alert mt-3';
    alertDiv.innerHTML = `
      <i class="lni lni-warning me-2"></i>
      <strong>Ops!</strong> Något gick fel när meddelandet skulle skickas. Försök igen eller kontakta mig direkt.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(alertDiv, contactForm.nextSibling);
    setTimeout(() => { if (alertDiv && alertDiv.parentNode) { alertDiv.remove(); } }, 7000);
  }

    // Hide email from bots
    document.addEventListener("DOMContentLoaded", function() {
        const user = "lindberg.therese";
        const domain = "outlook.com";
        const link = document.getElementById("email-link");
        if (link) {
            link.href = `mailto:${user}@${domain}`;
            link.textContent = `${user}@${domain}`;
        }

        // Handle dropdown close when main "Produkter" link is clicked
        const produkterDropdown = document.querySelector('.navbar-nav .dropdown');
        const produkterMainLink = produkterDropdown?.querySelector('.dropdown-toggle');
        
        if (produkterMainLink && produkterDropdown) {
            produkterMainLink.addEventListener('click', function(e) {
                // Small delay to allow navigation, then force close dropdown
                setTimeout(() => {
                    produkterDropdown.classList.remove('show');
                    const dropdownMenu = produkterDropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.classList.remove('show');
                    }
                }, 100);
            });
        }
    });

}) ();
