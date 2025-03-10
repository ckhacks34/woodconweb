
// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');

  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('active');
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

  // Cart Functionality
  let cart = [];
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const modalClose = document.querySelector('.modal-close');
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.getElementById('cart-items');
  const modalCartItems = document.getElementById('modal-cart-items');
  const modalCartTotal = document.getElementById('modal-cart-total');
  const modalCheckout = document.getElementById('modal-checkout');
  const modalClear = document.getElementById('modal-clear');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartEmptyMessage = document.getElementById('cart-empty-message');
  const cartSummary = document.getElementById('cart-summary');
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  // Open cart modal
  cartIcon.addEventListener('click', function() {
    updateCartModal();
    cartModal.style.display = 'block';
  });

  // Close cart modal
  modalClose.addEventListener('click', function() {
    cartModal.style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // Add items to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      const name = this.getAttribute('data-name');
      const price = parseFloat(this.getAttribute('data-price'));
      
      // Check if item already in cart
      const existingItem = cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id,
          name,
          price,
          quantity: 1
        });
      }
      
      updateCart();
      showNotification(`${name} added to cart!`);
    });
  });

  // Clear cart
  modalClear.addEventListener('click', function() {
    cart = [];
    updateCart();
  });

  clearCartBtn.addEventListener('click', function() {
    cart = [];
    updateCart();
  });

  // Checkout
  modalCheckout.addEventListener('click', function() {
    if (cart.length > 0) {
      alert('Thank you for your order! This would normally proceed to payment processing.');
      cart = [];
      updateCart();
      cartModal.style.display = 'none';
    }
  });

  checkoutBtn.addEventListener('click', function() {
    if (cart.length > 0) {
      alert('Thank you for your order! This would normally proceed to payment processing.');
      cart = [];
      updateCart();
    }
  });

  // Update cart display
  function updateCart() {
    // Update cart count
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart items display
    if (cart.length === 0) {
      cartEmptyMessage.style.display = 'block';
      cartSummary.style.display = 'none';
      cartItems.innerHTML = '';
    } else {
      cartEmptyMessage.style.display = 'none';
      cartSummary.style.display = 'block';
      
      let cartHTML = '';
      let total = 0;
      
      cart.forEach(item => {
        total += item.price * item.quantity;
        cartHTML += `
          <div class="cart-item">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
              </div>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          </div>
        `;
      });
      
      cartItems.innerHTML = cartHTML;
      cartTotalAmount.textContent = `$${total.toFixed(2)}`;
      
      // Add event listeners to quantity buttons
      const decreaseButtons = document.querySelectorAll('.decrease');
      const increaseButtons = document.querySelectorAll('.increase');
      const removeButtons = document.querySelectorAll('.remove-item');
      
      decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          const item = cart.find(item => item.id === id);
          
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            cart = cart.filter(item => item.id !== id);
          }
          
          updateCart();
        });
      });
      
      increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          const item = cart.find(item => item.id === id);
          item.quantity++;
          updateCart();
        });
      });
      
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          cart = cart.filter(item => item.id !== id);
          updateCart();
        });
      });
    }
    
    updateCartModal();
  }

  // Update cart modal
  function updateCartModal() {
    if (cart.length === 0) {
      modalCartItems.innerHTML = '<p>Your cart is empty</p>';
      modalCartTotal.textContent = 'Total: $0.00';
    } else {
      let modalHTML = '';
      let total = 0;
      
      cart.forEach(item => {
        total += item.price * item.quantity;
        modalHTML += `
          <div class="modal-cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        `;
      });
      
      modalCartItems.innerHTML = modalHTML;
      modalCartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  // Notification function
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add styles for notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    notification.style.zIndex = '1000';
    
    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide and remove notification
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

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
        alt = 'Zambezi Teak, Kiaat';
        break;
      case 'zambezi-teak':
        impact = 50;
        carbon = 2.1 * sqFt;
        water = 55 * sqFt;
        sustainRating = 'Medium-High';
        alt = 'Obeche, Mvule';
        break;
      case 'mvule':
        impact = 45;
        carbon = 1.9 * sqFt;
        water = 50 * sqFt;
        sustainRating = 'High';
        alt = 'Obeche, Zambezi Teak';
        break;
      case 'african-mahogany':
        impact = 75;
        carbon = 3.5 * sqFt;
        water = 85 * sqFt;
        sustainRating = 'Low';
        alt = 'Obeche, Kiaat';
        break;
      case 'iroko':
        impact = 55;
        carbon = 2.3 * sqFt;
        water = 60 * sqFt;
        sustainRating = 'Medium';
        alt = 'Mvule, Kiaat';
        break;
      case 'obeche':
        impact = 30;
        carbon = 1.2 * sqFt;
        water = 40 * sqFt;
        sustainRating = 'Very High';
        alt = 'Any other wood type';
        break;
      case 'african-blackwood':
        impact = 90;
        carbon = 4.2 * sqFt;
        water = 95 * sqFt;
        sustainRating = 'Very Low';
        alt = 'Consider alternatives if possible';
        break;
      case 'kiaat':
        impact = 40;
        carbon = 1.8 * sqFt;
        water = 48 * sqFt;
        sustainRating = 'High';
        alt = 'Obeche, Zambezi Teak';
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
      alert('Thank you for your message! We will get back to you soon.');
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

  // Initialize cart
  updateCart();
});
