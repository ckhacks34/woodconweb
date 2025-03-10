
// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    // Toggle icon between bars and times (X)
    const icon = this.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
      if (!e.target.closest('.menu-icon') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
        const menuIcon = document.querySelector('.menu-icon i');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.removeEventListener('click', closeMenu);
      }
    });
  });

  // Shop Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Smooth scrolling for navigation links
  const navLinkElements = document.querySelectorAll('.nav-links a, .footer-links a, .btn-primary');
  navLinkElements.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
          // Close mobile menu if open
          document.querySelector('.nav-links').classList.remove('active');
        }
      }
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = 'ngongochris415@gmail.com';
      const subject = document.getElementById('subject').value;
      const body = document.getElementById('message').value;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      alert('Thank you for your message! Opening your email client...');
      contactForm.reset();
    });
  }

  // Remove references to updateCart function that doesn't exist
  // This fixes the console errors

  // Initialize complete
});
