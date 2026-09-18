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
        var loginUrl = '/customer_authentication/login?return_to=' + encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = loginUrl;
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

// Guest "Add to Cart" buttons: show a shorter "Add to Cart" on
// hover. Swaps the actual text via JS (delegated on document, so it also
// covers cards rendered/replaced after page load - quickview, AJAX
// pagination, etc.) instead of fighting the half-dozen conflicting
// per-grid !important CSS rules that already govern these buttons'
// visible span (product-grid-1/3/4/5.css, component-card.css...). The
// click behavior (redirect to login) is unaffected either way.
(function () {
  // mouseenter/mouseleave (not mouseover/mouseout): over/out re-fire on
  // every sibling transition *inside* the card (icon -> text -> wishlist
  // heart etc.), causing repeated reset/reswap cycles. enter/leave only
  // fire on a genuine boundary crossing, but the button sits inside
  // several nested wrappers (.product-form__buttons, .card-addtocart-
  // action, .card-wrapper...), each with its own enter/leave boundary -
  // fast movement can cross from one nested element straight into a
  // sibling under a different one of those wrappers, so a leave still
  // fires without the mouse ever truly exiting the card. Debouncing the
  // reset absorbs that: a quick re-entry (of any matching element)
  // cancels the pending reset before it ever becomes visible.
  var resetTimers = new WeakMap();

  function cancelReset(span) {
    var t = resetTimers.get(span);
    if (t) {
      clearTimeout(t);
      resetTimers.delete(span);
    }
  }

  document.addEventListener('mouseenter', function (e) {
    var el = e.target;
    if (!el.querySelector || !el.querySelector('.js-guest-cta-text')) return;
    el.querySelectorAll('.js-guest-cta-text').forEach(function (span) {
      cancelReset(span);
      if (!span.dataset.hoverText) return;
      if (!span.dataset.defaultText) span.dataset.defaultText = span.textContent;
      span.textContent = span.dataset.hoverText;
    });
  }, true);

  document.addEventListener('mouseleave', function (e) {
    var el = e.target;
    if (!el.querySelector || !el.querySelector('.js-guest-cta-text')) return;
    el.querySelectorAll('.js-guest-cta-text').forEach(function (span) {
      cancelReset(span);
      resetTimers.set(span, setTimeout(function () {
        resetTimers.delete(span);
        if (span.dataset.defaultText) span.textContent = span.dataset.defaultText;
      }, 80));
    });
  }, true);
})();
