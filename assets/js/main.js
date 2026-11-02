/**
 * Muhammad Azriel Adha Agnansyah - Portfolio Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar on Scroll
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Viewport Scroll Reveal (Intersection Observer)
  const revealElements = document.querySelectorAll('.fade-up-init');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-up-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('fade-up-active'));
  }

  // 4. ScrollSpy: Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 5. Copy Email Action with Toast Feedback
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const targetEmailEl = document.getElementById('target-email');
  const toastNotification = document.getElementById('copy-toast');
  const iconDefault = btnCopyEmail?.querySelector('.copy-icon-default');
  const iconSuccess = btnCopyEmail?.querySelector('.copy-icon-success');
  const labelText = btnCopyEmail?.querySelector('.copy-text-label');

  if (btnCopyEmail && targetEmailEl) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = targetEmailEl.textContent.trim();
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older context
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Visual button feedback
        if (iconDefault) iconDefault.style.display = 'none';
        if (iconSuccess) iconSuccess.style.display = 'inline-block';
        if (labelText) labelText.textContent = 'Tersalin!';

        // Toast feedback
        if (toastNotification) {
          toastNotification.classList.add('show');
          setTimeout(() => {
            toastNotification.classList.remove('show');
          }, 3200);
        }

        // Reset button after 3 seconds
        setTimeout(() => {
          if (iconDefault) iconDefault.style.display = 'inline-block';
          if (iconSuccess) iconSuccess.style.display = 'none';
          if (labelText) labelText.textContent = 'Salin Email';
        }, 3000);

      } catch (err) {
        console.error('Gagal menyalin email:', err);
      }
    });
  }

  // 6. Back to Top Button
  const btnBackToTop = document.getElementById('btn-back-to-top');
  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


