document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Fixed Navbar Scroll Structural Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer Engine for Scroll-Reveal
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Optimize performance after execution
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 3. Dynamic Toast Notification Generator for Cart Actions
  window.triggerToast = function(productName) {
    // Check if toast container exists, if not create it
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1080';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="fa-solid fa-circle-check me-2"></i> Added <strong>${productName}</strong> to your booking enquiry layout.
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastElement, { delay: 4000 });
    bsToast.show();

    // Clean up DOM structural nodes after hide event finishes
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  };

  // 4. HTML5 Form Bootstrapping Interceptor Validation
  const feedbackForm = document.getElementById('ecoFeedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(event) {
      if (!feedbackForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Stop standard delivery for mock assignment submission rules
        alert('Dumelang! Your booking enquiry has been validated successfully by HTML5 attributes and simulated submission process layout.');
        feedbackForm.reset();
        feedbackForm.classList.remove('was-validated');
        return false;
      }
      feedbackForm.classList.add('was-validated');
    }, false);
  }
});