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
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 120,
            });
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
    
    // Products data embedded directly in main.js
    const productsData = {
      "products": [
        {
          "title": "Rob's Mad Cat",
          "description": "Dubbla rosaskära blommor med blå fantasistänk och röd-lila kanter. Mörkt, sågtandat lövverk i semiminiatyrformat.",
          "imagePath": "assets/images/blog/madcat.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Two W Miss Sophie",
          "description": "Dubbla ljusrosa stjärnblommor med tunna fuchsiaröda kanter. Mörkgrönt, snäckkantat bladverk med lätt textur. Rikblommande och pålitlig sort.",
          "imagePath": "assets/images/blog/misssohpie.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Rhapsodie Rosalie",
          "description": "Halvdubbla korallrosa och vita blommor med krusiga kanter. Mellangrönt, slätt bladverk.",
          "imagePath": "assets/images/blog/rosalie.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Edge of darkness",
          "description": "Halvdubbla mörklila stjärnblommor med krusiga vita kanter. Brokligt mörkgrönt och elfenbensfärgat bladverk, sågtandat med röd undersida.",
          "imagePath": "assets/images/blog/edge.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Glaspärlespelet",
          "description": "Ett stort antal enkla vita blommor med ljusblå kant och öga. Blommar rikligt och länge. Bladen är ljusgröna med brokiga färger.",
          "imagePath": "assets/images/blog/biser.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Rob's Vanilla Trail",
          "description": "Fyllda blommor i gräddvitt till svagt rosaskimrande nyanser. Mörkgrönt bladverk i semiminiatyrformat med sågtandade, spetsiga blad och en lätt bucklig struktur.",
          "imagePath": "assets/images/blog/vanilla.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Kleopatra",
          "description": "Stora, dubbla stjärnblommor med lila kant och blå stänk och strimmor i kontrastfärg. Mellangrönt, slätt bladverk.",
          "imagePath": "assets/images/blog/kleopatra.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Optimara My Love",
          "description": "Enkel vit stjärnblomma med röd till purpurröd mitt och kronblad som sitter kvar länge. Mellangrönt, slätt och hjärtformat bladverk.",
          "imagePath": "assets/images/blog/optimara.jpg",
          "category": "exklusiv"
        },
        {
          "title": "Red summer",
          "description": "Halvdubbla röda stjärnblommor med vågiga, vita kanter som varierar i bredd. Mellangrönt, snäckkantat bladverk.",
          "imagePath": "assets/images/blog/redsummer.jpg",
          "category": "standard"
        },
        {
          "title": "Motsart",
          "description": "Dubbla, krusiga blommor i vit med djup lila mitt som mjukt tonar ut. Mellangrönt, slätt bladverk.",
          "imagePath": "assets/images/blog/motsart.jpg",
          "category": "standard"
        },
        {
          "title": "Min blåögda flicka",
          "description": "Dubbla vita blommor med vacker form och mörkblå mitt, yttre kronblad med grön ton. Symmetrisk rosett med runda, snittade och brokiga blad.",
          "imagePath": "assets/images/blog/flicka.jpg",
          "category": "standard"
        },
        {
          "title": "Blå Saintpaulia",
          "description": "Enkla men vackra blå blommor. Mellangrönt, slätt bladverk.",
          "imagePath": "assets/images/blog/blue.jpg",
          "category": "bas"
        },
        {
          "title": "Cerise Saintpaulia",
          "description": "Enkla men vackra cerisa blommor. Mellangrönt, slätt bladverk.",
          "imagePath": "assets/images/blog/lila.jpg",
          "category": "bas"
        }
      ]
    };

    // Load and display products from embedded data
    function loadProducts() {
      try {
        const products = productsData.products;
        
        const portfolioContainer = document.getElementById('portfolio-container');
        if (!portfolioContainer) return;
        
        portfolioContainer.innerHTML = '';
        
        // Add all products directly to container (no row grouping for better filtering)
        products.forEach(product => {
          const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
          
          const productHTML = `
            <div class="col-lg-4 col-sm-6" data-filter="${product.category}">
              <div class="portfolio-style-three">
                <div class="portfolio-image">
                  <img src="${product.imagePath}" alt="${product.title}">
                  <div class="meta-details">
                    <span>${categoryLabel}</span>
                  </div>
                </div>
                <div class="portfolio-text">
                  <h4 class="portfolio-title">
                    ${product.title}
                  </h4>
                  <p class="text">
                    ${product.description}
                  </p>
                </div>
              </div>
              <!-- single portfolio -->
            </div>
          `;
          
          portfolioContainer.innerHTML += productHTML;
        });
        
        // Initialize portfolio filtering after products are loaded
        initializePortfolioFilter();
        
      } catch (error) {
        console.error('Error loading products:', error);
      }
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

      // Load products when DOM is ready
      loadProducts();
    });

}) ();
