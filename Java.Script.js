document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Scroll Class Toggle
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer Engine for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(element => { revealObserver.observe(element); });

  // 3. Dynamic Toast Generator for Add-to-Enquiry Actions
  window.triggerToast = function(productName) {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1080';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0 rounded-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="fa-solid fa-check text-success me-2"></i> <strong>${productName}</strong> noted in your booking workspace.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastElement, { delay: 3500 });
    bsToast.show();

    toastElement.addEventListener('hidden.bs.toast', () => { toastElement.remove(); });
  };

  // 4. HTML5 Form Bootstrapped Interceptor
  const feedbackForm = document.getElementById('ecoFeedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(event) {
      if (!feedbackForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Dumelang! Your eco-friendly service request has been registered systematically.');
        feedbackForm.reset();
        feedbackForm.classList.remove('was-validated');
        return false;
      }
      feedbackForm.classList.add('was-validated');
    }, false);
  }
});