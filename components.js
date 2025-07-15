// Header Component
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    // Check if we're on the index page
    const isIndexPage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/index.html') || 
                       window.location.pathname === '/index.html';
    
    // Check if we're on the care page
    const isCarePage = window.location.pathname.endsWith('/care.html') || 
                      window.location.pathname === '/care.html';
    
    // Set the base URL for navigation links
    const baseUrl = isIndexPage ? '' : 'index.html';
    
    this.innerHTML = `
      <!--====== NAVBAR NINE PART START ======-->
      <section class="navbar-area navbar-nine">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="index.html">
                  <img src="assets/images/leaf.svg" alt="#" class="leaf-logo" /> Drumla
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNine"
                  aria-controls="navbarNine" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse sub-menu-bar" id="navbarNine">
                  <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                      <a class="page-scroll${isIndexPage ? ' active' : ''}" href="${baseUrl}#hero-area">Hem</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="${baseUrl}#about">Om Drumla</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="${baseUrl}#products">Produkter</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="${baseUrl}#pricing">Priser</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="${baseUrl}#contact">Kontaktuppgifter</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-separate${isCarePage ? ' active' : ''}" href="care.html">Skötselråd</a>
                    </li>
                  </ul>
                </div>

                <div class="navbar-btn d-none d-lg-inline-block">
                  <a class="menu-bar" href="#side-menu-left"><i class="lni lni-menu"></i></a>
                </div>
              </nav>
              <!-- navbar -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </section>
      <!--====== NAVBAR NINE PART ENDS ======-->

      <!--====== SIDEBAR PART START ======-->
      <div class="sidebar-left">
        <div class="sidebar-close">
          <a class="close" href="#close"><i class="lni lni-close"></i></a>
        </div>
        <div class="sidebar-content">
          <div class="sidebar-logo">
            <img src="assets/images/leaf.svg" alt="#" class="leaf-logo" /> Drumla
          </div>
          <p class="text">Välkommen! Här hittar du sorterna jag säljer och lite mer om hur det funkar.</p>
          <!-- logo -->
          <div class="sidebar-menu">
            <h5 class="menu-title">Snabblänkar</h5>
            <ul>
              <li><a href="${baseUrl}#hero-area">Hem</a></li>
              <li><a href="${baseUrl}#about">Om Drumla</a></li>
              <li><a href="${baseUrl}#products">Produkter</a></li>
              <li><a href="${baseUrl}#pricing">Priser</a></li>
              <li><a href="${baseUrl}#contact">Kontaktuppgifter</a></li>
            </ul>
          </div>
          <!-- menu -->
          <div class="sidebar-social align-items-center justify-content-center">
            <h5 class="social-title">Följ mig gärna</h5>
            <ul>
              <!--
              <li>
                <a href="javascript:void(0)"><i class="lni lni-facebook-filled"></i></a>
              </li>
              -->
              <li>
                <a href="https://www.instagram.com/drumla.se" target="_blank"><i class="lni lni-instagram-original"></i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/drumla/" target="_blank"><i class="lni lni-linkedin-original"></i></a>
              </li>
            </ul>
          </div>
          <!-- sidebar social -->
        </div>
        <!-- content -->
      </div>
      <div class="overlay-left"></div>
      <!--====== SIDEBAR PART ENDS ======-->
    `;
  }
}

// Footer Component
class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Start Footer Area -->
      <footer class="footer-area footer-eleven">
        <!-- Start Footer Top -->
        <div class="footer-top">
          <div class="container">
            <div class="inner-content">
              <div class="row">
                <div class="col-lg-4 col-md-6 col-12">
                  <!-- Single Widget -->
                  <div class="footer-widget f-about">
                    <div class="logo">
                      <a href="index.html">
                        <img src="assets/images/leaf.svg" alt="#" class="leaf-logo" /> Drumla
                      </a>
                    </div>
                    <p>
                      Odlar det som inte finns i butik, och delar med mig av det jag gillar.
                    </p>
                    <p class="copyright-text">
                      <span>© 2025 Drumla.</span>
                    </p>
                  </div>
                  <!-- End Single Widget -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--/ End Footer Top -->
      </footer>
      <!--/ End Footer Area -->

      <a href="#" class="scroll-top btn-hover">
        <i class="lni lni-chevron-up"></i>
      </a>
    `;
  }
}

// Register the custom elements
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
