/* ==========================================
   InnCare (InnoCare) - Main JavaScript
   Interactive logic, animations & UI handlers
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navbar Scroll Effect
  const navbar = document.querySelector('.navbar-custom');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  // 2. Mobile Nav Auto-collapse on Link Click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-nav-cta');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // 3. Animated Counter for Hero Stats
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const increment = Math.ceil(target / (duration / 20));
      let current = 0;

      const updateCount = () => {
        current += increment;
        if (current >= target) {
          counter.innerText = prefix + target + suffix;
        } else {
          counter.innerText = prefix + current + suffix;
          setTimeout(updateCount, 20);
        }
      };

      updateCount();
    });
  };

  // Trigger counters on load or scroll
  runCounters();

  // 4. Contact Form Interactive Handler
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Envoi en cours...`;

      setTimeout(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Display feedback notification
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'alert alert-success mt-3 animated fadeIn';
          formFeedback.innerHTML = `
            <div class="d-flex align-items-center gap-2">
              <i class="fas fa-check-circle fs-4 me-2"></i>
              <div>
                <strong>Message envoyé avec succès !</strong><br>
                Merci de nous avoir contactés. L'équipe InnCare reviendra vers vous dans les plus brefs délais.
              </div>
            </div>
          `;
          
          // Reset form fields
          contactForm.reset();

          // Scroll feedback into view smoothly
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Auto hide after 8 seconds
          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 8000);
        }
      }, 1200);
    });
  }

  // 5. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
