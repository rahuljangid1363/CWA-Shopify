if (!customElements.get('mini-cart-remove-button')) {
  class miniCartRemoveButton extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('click', (event) => {
        event.preventDefault();
        var line = $(this).closest('.minicart-item').data('line');
        const body = JSON.stringify({
          quantity: 0,
          line: line
        });
        fetch(`${routes.cart_change_url}`, { ...fetchConfig('javascript'), body })
        .then((response) => response.json())
        .then((parsedState) => {
          document.querySelector('mini-cart').update();
          if (document.querySelector('cart-freeshipping')) {
            document.querySelector('cart-freeshipping').update(parsedState.total_price);
          }
        })
        .catch((e) => {
          console.error(e);
        });
      });
    }
  }
  customElements.define('mini-cart-remove-button', miniCartRemoveButton);
}

if (!customElements.get('mini-cart')) {
  class miniCart extends HTMLElement {
    constructor() {
      super();
      this.display();
      this.updateRow();
    }

    update(){
      jQuery.getJSON('/cart.js', function(cart) {
        var minicart = '';
        var cart_items = cart.items;
        
        if (cart_items.length === 0) {
          minicart = '<div class="minicart-empty"><p>Your cart is empty.</p></div>';
          $('#minicart .cart__checkout-button').attr('style', 'pointer-events: none; opacity: 0.6;');
        } else {
          $('#minicart .cart__checkout-button').removeAttr('style');
          $(cart_items).each(function(i, item) {
            var item_price = Shopify.formatMoney(item.price, theme.moneyFormat);
            var line = i + 1;
            var sku_html = '';
            if (item.sku) {
              sku_html = '<div class="minicart-item__sku">SKU : ' + item.sku + '</div>';
            } else if (item.variant_title && item.variant_title !== 'Default Title') {
              sku_html = '<div class="minicart-item__sku">' + item.variant_title + '</div>';
            }

            minicart += '<div class="minicart-item" data-line="' + line + '">';
            minicart += '<a class="image-product" href="' + item.url + '"><img class="mimicart-item__image" src="' + (item.image ? item.image : '') + '" alt="' + item.title + '" width="64" height="64"></a>';
            minicart += '<div class="minicart-item__info">';
            minicart += '<a href="' + item.url + '" class="mimicart-item__name">' + item.product_title + '</a>';
            minicart += sku_html;
            minicart += '<div class="minicart-item__bottom">';
            minicart += '<span class="minicart-item__price">' + item_price + '</span>';
            minicart += '<quantity-input class="quantity"><button class="quantity__button no-js-hidden" name="minus" type="button" aria-label="Decrease">&minus;</button><input class="quantity__input" type="number" name="updates[]" value="' + item.quantity + '" min="0" aria-label="Quantity" id="Quantity-' + line + '" data-index="' + line + '"><button class="quantity__button no-js-hidden" name="plus" type="button" aria-label="Increase">&#43;</button></quantity-input>';
            minicart += '</div>';
            minicart += '</div>';
            minicart += '</div>';
          });
        }

        $("#minicart .list-mimicart").html(minicart);
        
        var count_text = cart.item_count + (cart.item_count === 1 ? ' item' : ' items');
        $("#minicart-count-badge").text(count_text);
        $(".cart-count-bubble span:first-child").html(cart.item_count);
        if (typeof updateCurrencies === 'function') {
          updateCurrencies();
        }
        document.querySelector('mini-cart').updateRow();
        if (document.querySelector('cart-freeshipping')) {
          document.querySelector('cart-freeshipping').update(cart.total_price);
        }
        if (typeof displayCrossSell === 'function') {
          displayCrossSell();
        }
        $('#jsUpsell').remove();
      }); 
    }
    
    updateRow(){
      var timeout = null;
      $("#minicart .quantity__input").off('change').on('change', function(){
        clearTimeout(timeout);
        var quantity = $(this).val();
        var line = $(this).closest('.minicart-item').data('line');
        timeout = setTimeout(function () {
          const body = JSON.stringify({
            quantity: quantity,
            line: line
          });
          
          fetch(`${routes.cart_change_url}`, { ...fetchConfig('javascript'), body })
            .then((response) => response.json())
            .then((parsedState) => {
              document.querySelector('mini-cart').update();
              if (document.querySelector('cart-freeshipping')) {
                document.querySelector('cart-freeshipping').update(parsedState.total_price);
              }
            })
            .catch((e) => {
              console.error(e);
            });
        }, 300);
      });
    }
    
    display(){
      $(document).off('click', '#cart-icon-bubble, .header__icon--cart').on('click', '#cart-icon-bubble, .header__icon--cart', function(e){
        e.preventDefault();
        e.stopPropagation();
        if ($("#minicart").hasClass('active')) {
          $("#minicart").removeClass('active');
        } else {
          $("#minicart").addClass('active');
        }
        return false;
      });
      
      $(document).off('click', '.minicart-header__close').on('click', '.minicart-header__close', function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#minicart").removeClass('active');
      });

      $(document).off('click.minicartOutside').on('click.minicartOutside', function(event) { 
        var $target = $(event.target);
        if(!$target.closest('#minicart').length && !$target.closest('#cart-icon-bubble, .header__icon--cart').length && $('#minicart').hasClass('active')) {
          $("#minicart").removeClass('active');
        }        
      });
    }
  }
  customElements.define('mini-cart', miniCart);
}
