// Mobile menu functionality with performance optimizations
export function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  
  if (!menuButton || !mobileMenu || !overlay) return;

  let isMenuOpen = false;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Performance optimization: Use transform instead of left/right positioning
  function toggleMenu(open) {
    isMenuOpen = open;
    
    // Use requestAnimationFrame for smooth animations
    requestAnimationFrame(() => {
      document.body.classList.toggle('menu-open', open);
      mobileMenu.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      menuButton.setAttribute('aria-expanded', open.toString());
      
      // Set focus trap if menu is open
      if (open) {
        setFocusTrap();
      } else {
        removeFocusTrap();
      }
    });
  }

  // Focus trap for accessibility
  function setFocusTrap() {
    const focusableElements = mobileMenu.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    function handleFocusTrap(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }

    mobileMenu.addEventListener('keydown', handleFocusTrap);
  }

  function removeFocusTrap() {
    mobileMenu.removeEventListener('keydown', handleFocusTrap);
  }

  // Touch gestures for menu
  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
    
    // Calculate swipe distance
    const swipeDistance = touchStartX - touchEndX;
    
    if (isMenuOpen && swipeDistance > 50) {
      toggleMenu(false);
    } else if (!isMenuOpen && swipeDistance < -50 && touchStartX < 30) {
      toggleMenu(true);
    }
  }

  // Event listeners with passive option for better scroll performance
  menuButton.addEventListener('click', () => toggleMenu(!isMenuOpen), { passive: true });
  overlay.addEventListener('click', () => toggleMenu(false), { passive: true });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: true });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(false);
    }
  });

  // Close menu on resize if viewport becomes larger than mobile breakpoint
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  mediaQuery.addListener(() => {
    if (mediaQuery.matches && isMenuOpen) {
      toggleMenu(false);
    }
  });

  // Clean up function
  return () => {
    menuButton.removeEventListener('click', () => toggleMenu(!isMenuOpen));
    overlay.removeEventListener('click', () => toggleMenu(false));
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
    mediaQuery.removeListener();
  };
}
