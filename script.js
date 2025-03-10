
// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
      if (!e.target.closest('.menu-icon') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
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

  // Eco Calculator
  const calculateBtn = document.getElementById('calculate-impact');
  const woodTypeSelect = document.getElementById('wood-type');
  const squareFootage = document.getElementById('square-footage');
  const projectType = document.getElementById('project-type');
  const meterFill = document.querySelector('.meter-fill');
  const impactScore = document.getElementById('impact-score').querySelector('span');
  const carbonFootprint = document.getElementById('carbon-footprint');
  const waterUsage = document.getElementById('water-usage');
  const sustainabilityRating = document.getElementById('sustainability-rating');
  const alternatives = document.getElementById('alternatives');

  calculateBtn.addEventListener('click', function() {
    // Get values
    const woodType = woodTypeSelect.value;
    const sqFt = parseInt(squareFootage.value);
    const project = projectType.value;
    
    if (!woodType || isNaN(sqFt) || sqFt <= 0) {
      alert('Please select a wood type and enter a valid square footage.');
      return;
    }
    
    // Calculate impact (these would be based on real data in a production app)
    let impact = 0;
    let carbon = 0;
    let water = 0;
    let sustainRating = '';
    let alt = '';
    
    // Different woods have different environmental impacts
    switch (woodType) {
      case 'mukwa':
        impact = 60;
        carbon = 2.4 * sqFt;
        water = 68 * sqFt;
        sustainRating = 'Medium';
        alt = 'Teak, Mopane';
        break;
      case 'teak':
        impact = 50;
        carbon = 2.1 * sqFt;
        water = 55 * sqFt;
        sustainRating = 'Medium-High';
        alt = 'Pine, Mopane';
        break;
      case 'rosewood':
        impact = 85;
        carbon = 3.8 * sqFt;
        water = 90 * sqFt;
        sustainRating = 'Low';
        alt = 'Mahogany, Teak';
        break;
      case 'mahogany':
        impact = 75;
        carbon = 3.5 * sqFt;
        water = 85 * sqFt;
        sustainRating = 'Low';
        alt = 'Teak, Pine';
        break;
      case 'mopane':
        impact = 55;
        carbon = 2.3 * sqFt;
        water = 60 * sqFt;
        sustainRating = 'Medium';
        alt = 'Mukwa, Teak';
        break;
      case 'pine':
        impact = 30;
        carbon = 1.2 * sqFt;
        water = 40 * sqFt;
        sustainRating = 'Very High';
        alt = 'Most eco-friendly option';
        break;
    }
    
    // Project type can modify impact
    switch (project) {
      case 'flooring':
        impact *= 1.2;
        carbon *= 1.2;
        water *= 1.1;
        break;
      case 'furniture':
        impact *= 1.0;
        carbon *= 1.0;
        water *= 1.0;
        break;
      case 'cabinetry':
        impact *= 0.9;
        carbon *= 0.9;
        water *= 0.9;
        break;
      case 'decking':
        impact *= 1.3;
        carbon *= 1.3;
        water *= 1.4;
        break;
      case 'structural':
        impact *= 1.5;
        carbon *= 1.4;
        water *= 1.3;
        break;
    }
    
    // Update UI
    meterFill.style.width = `${impact}%`;
    impactScore.textContent = Math.round(impact);
    carbonFootprint.textContent = `${carbon.toFixed(1)} kg CO₂`;
    waterUsage.textContent = `${Math.round(water)} gallons`;
    sustainabilityRating.textContent = sustainRating;
    alternatives.textContent = alt;
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = 'info@woodcon.com';
      const subject = document.getElementById('subject').value;
      const body = document.getElementById('message').value;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      alert('Thank you for your message! Opening your email client...');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }

  // Initialize complete
});
