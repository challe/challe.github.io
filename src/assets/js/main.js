(function () {

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
    });

    // Hide email from bots
    document.addEventListener("DOMContentLoaded", function() {
        const user = "lindberg.therese";
        const domain = "outlook.com";
        const link = document.getElementById("email-link");
        if (link) {
            link.href = `mailto:${user}@${domain}`;
            link.textContent = `${user}@${domain}`;
        }
    });

}) ();
