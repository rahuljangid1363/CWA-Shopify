class freeshipping extends HTMLElement {
  constructor() {
    super();
	this.update();
  }

  update(total_price) {
    var bar = 0;
    var free_cost = $(".js-free-shipping").data('cost');
    var cart_total = $(".js-free-shipping").data('value') / 100;
    if (total_price) {
      cart_total = total_price / 100;
    } 
    bar = Math.round(cart_total / free_cost * 100);
    if (parseFloat(bar) >= 100) {
      $(".js-free-shipping-text").html($(".js-free-shipping-text").data('free'));
      $(".js-free-shipping .progress-bar").addClass('free-progress-bar-100');
    } else {
      $(".js-free-shipping .progress-bar").removeClass('free-progress-bar-100');
      var current_pie = new Intl.NumberFormat(Shopify.locale, { style: 'currency', currency: Shopify.currency.active }).format(free_cost - cart_total);
      $(".js-free-shipping-text").html($(".js-free-shipping-text").data('spend').replace('%%', current_pie));
    }
    $(".js-free-shipping .progress-bar").css('width', bar + '%');
  }
}
customElements.define('cart-freeshipping', freeshipping);