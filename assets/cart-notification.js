class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.onBodyClick = this.handleBodyClick.bind(this);
    this.autoCloseTimeout = null;
    
    if (this.notification) {
      this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
      
      this.querySelectorAll('button[type="button"], .cart-notification__close, .cart-notification__continue-btn, .link.button-label').forEach((closeButton) =>
        closeButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.close();
        })
      );

      // Pause auto-close on hover
      this.notification.addEventListener('mouseenter', () => {
        if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
      });
      this.notification.addEventListener('mouseleave', () => {
        if (this.notification.classList.contains('active')) {
          this.startAutoClose(3500);
        }
      });
    }
  }

  open() {
    if (!this.notification) {
      this.notification = document.getElementById('cart-notification');
    }
    if (!this.notification) return;

    if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);

    this.notification.classList.add('animate', 'active');

    // Prevent any page scrolling: do not call focus or header.reveal
    document.body.addEventListener('click', this.onBodyClick);

    // Auto close toast after 5 seconds
    this.startAutoClose(5000);
  }

  startAutoClose(duration = 5000) {
    if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
    this.autoCloseTimeout = setTimeout(() => {
      this.close();
    }, duration);
  }

  close() {
    if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
    if (this.notification) {
      this.notification.classList.remove('active');
    }
    document.body.removeEventListener('click', this.onBodyClick);
  }

  renderContents(parsedState) {
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {
      const el = document.getElementById(section.id);
      if (el && parsedState.sections && parsedState.sections[section.id]) {
        el.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      }
    }));

    // NO scroll or header reveal
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `#cart-notification-product-${this.productId}`,
      },
      {
        id: 'cart-notification-button'
      },
      {
        id: 'cart-icon-bubble'
      }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (this.notification && target !== this.notification && !target.closest('cart-notification') && !target.closest('.product-form')) {
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
