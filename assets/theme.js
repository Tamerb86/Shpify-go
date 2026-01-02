// ============================================
// GoEasyCharge Theme - Main JavaScript
// ============================================

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
  });

  // Initialize Theme
  function initializeTheme() {
    setupCartDrawer();
    setupLanguageSwitcher();
    setupMobileMenu();
    setupSearch();
    setupFormValidation();
  }

  // Cart Drawer
  function setupCartDrawer() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');

    if (cartIcon) {
      cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
      });
    }

    if (cartDrawerOverlay) {
      cartDrawerOverlay.addEventListener('click', closeCart);
    }
  }

  function openCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    if (cartDrawer) cartDrawer.classList.add('active');
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('active');
  }

  function closeCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('active');
  }

  // Language Switcher
  function setupLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher) return;

    const links = languageSwitcher.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const locale = this.getAttribute('href').split('=')[1];
        setLanguage(locale);
      });
    });
  }

  function setLanguage(locale) {
    localStorage.setItem('shopify-locale', locale);
    const url = new URL(window.location);
    url.searchParams.set('locale', locale);
    window.location.href = url.toString();
  }

  // Mobile Menu
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
      });

      // Close menu when clicking on a link
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
        });
      });
    }
  }

  // Search
  function setupSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.querySelector('.search-overlay');

    if (searchIcon) {
      searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        if (searchOverlay) {
          searchOverlay.classList.add('active');
          searchOverlay.querySelector('input')?.focus();
        }
      });
    }

    if (searchOverlay) {
      searchOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });

      const closeBtn = searchOverlay.querySelector('.search-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          searchOverlay.classList.remove('active');
        });
      }
    }
  }

  // Form Validation
  function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
          e.preventDefault();
        }
      });
    });
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }

      // Email validation
      if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          input.classList.add('error');
          isValid = false;
        }
      }
    });

    return isValid;
  }

  // Lazy Loading Images
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Add to Cart
  function addToCart(variantId, quantity = 1) {
    const formData = {
      items: [
        {
          id: variantId,
          quantity: quantity
        }
      ]
    };

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      openCart();
      updateCartCount();
      showNotification('Product added to cart!');
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('Error adding product to cart', 'error');
    });
  }

  // Update Cart Count
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
        }
      });
  }

  // Notifications
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Exit Intent
  function setupExitIntent() {
    const exitIntentPopup = document.getElementById('exitIntentPopup');
    if (!exitIntentPopup) return;

    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !localStorage.getItem('exitIntentShown')) {
        exitIntentPopup.classList.add('active');
      }
    });
  }

  // Smooth Scroll
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Expose functions globally
  window.addToCart = addToCart;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.showNotification = showNotification;

  // Initialize on load
  setupLazyLoading();
  setupExitIntent();
  setupSmoothScroll();
})();
