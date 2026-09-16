if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();

      // Require a logged-in customer before adding to cart. This is the
      // single choke point every <product-form> (product page, product
      // cards, quickview, featured product) submits through, so gating it
      // here covers all add-to-cart entry points at once.
      if (!window.customerLoggedIn) {
        var loginUrl = (window.routes && window.routes.account_login_url) || '/account/login';
        window.location.href = loginUrl + '?return_url=' + encodeURIComponent(window.location.pathname + window.location.search);
        return;
      }

      this.cartNotification.setActiveElement(document.activeElement);

      const submitButton = this.querySelector('[type="submit"]');

      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('loading');

      const body = JSON.stringify({
        ...JSON.parse(serializeForm(this.form)),
        sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
        sections_url: window.location.pathname
      });

      fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
        .then((response) => response.json())
        .then((parsedState) => {
          this.cartNotification.renderContents(parsedState);
        	document.querySelector('mini-cart').update();
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('disabled');
        });
    }
  });
}
