document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});

function renderNavbar() {
  const navContainer = document.getElementById('navbar-placeholder');
  if (!navContainer) return;

  // Determine current page filename for active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <img src="assets/img/PowerIcon.png" alt="Power Logo" class="brand-logo">
          <span>Energy Wise</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link ${currentPath === 'index.html' ? 'active' : ''}" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPath === 'televisions.html' ? 'active' : ''}" href="televisions.html">Televisions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPath === 'calculator.html' ? 'active' : ''}" href="calculator.html">Calculator</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentPath === 'about.html' ? 'active' : ''}" href="about.html">About Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  navContainer.innerHTML = navHTML;
}

function renderFooter() {
  const footerContainer = document.getElementById('footer-placeholder');
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();

  const footerHTML = `
    <footer class="py-3 text-center mt-auto">
      <p class="mb-0">&copy; ${currentYear} | Created by Your Name</p>
      <small class="text-muted">Generative AI Acknowledgement: Developed with assistance from Gemini AI.</small>
    </footer>
  `;

  footerContainer.innerHTML = footerHTML;
}