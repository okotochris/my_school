const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');

  document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.ejs') {
    document.getElementById('result').href = '/#result-checker';
     document.getElementById('home').href = '/';
  }
});

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    mobileMenu.style.display = 'block';
    setTimeout(() => mobileMenu.classList.add('active'), 10);
  });

  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    setTimeout(() => mobileMenu.style.display = 'none', 300);
  });

  // Hide mobile menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove('active');
      mobileMenu.style.display = 'none';
    }
  });

  // Ensure mobile menu is hidden on page load for desktop
  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
      mobileMenu.style.display = 'none';
    }
  });