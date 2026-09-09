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
          document.querySelector('cart-freeshipping').update(cart.total_price);
        })
        .catch((e) => {
          console.error(e);
        })


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
      document.querySelector('mini-cart').updateRow();
    }

    update(){
      jQuery.getJSON('/cart.js', function(cart) {
        var minicart = '';
        var cart_items = cart.items;
        var status = true;
        var _mini_cart = document.querySelector('mini-cart');
        if (_mini_cart.querySelector('.mimicart-item__remove')) {
          status = false;
        }
        $(cart_items).each(function(i, item) {
          var item_price = Shopify.formatMoney(item.price, theme.moneyFormat);
          var row_price = Shopify.formatMoney(item.price * item.quantity, theme.moneyFormat);           

          var line = i+1;
          minicart += '<div class="minicart-item" data-line="'+line+'">';
          minicart += '<a class="image-product" href="'+item.url+'"><img class="mimicart-item__image" src="'+item.image+'" alt="" width="75" height="106"></a>';
          minicart += '<div class="minicart-price">';
          minicart += '<a href="'+item.url+'" class="mimicart-item__name">'+item.product_title+'</a>';
          minicart += '<span class="price price--end">'+item_price+'</span>';
          minicart += '<mini-cart-remove-button><span data-href="/cart/change?id=40271942320321:ab2f847b5d358c00b20c032018b842ae&amp;quantity=0" class="mimicart-item__remove" aria-label="Remove 5 Pocket Jean - 30 / Indigo"><svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove"><path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path><path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path></svg></span></mini-cart-remove-button>';
          minicart += '<quantity-input class="quantity"><button class="quantity__button no-js-hidden" name="minus" type="button"><svg xmlns="https://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2"><path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg></button><input class="quantity__input" type="number" name="updates[]" value="'+item.quantity+'" min="0" aria-label="Quantity for Colorblock Silk Crew" id="Quantity-1" data-index="1"><button class="quantity__button no-js-hidden" name="plus" type="button"><svg xmlns="https://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path></svg></button></quantity-input>';
          
          minicart += '</div></div>';
        });

        $("#minicart .list-mimicart").html(minicart);
        
        var total_price = Shopify.formatMoney(cart.total_price, theme.moneyFormat);    
        $("#minicart span.total_price").html(total_price + ' ' + cart.currency);
        $(".cart-count-bubble span:first-child").html(cart.item_count);
        updateCurrencies();
        document.querySelector('mini-cart').updateRow();
        document.querySelector('cart-freeshipping').update(cart.total_price);
        displayCrossSell();
        $('#jsUpsell').remove();
      }); 
    }
    
    updateRow(){
      var timeout = null;
      $("#minicart .quantity__input").change(function(){
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
                document.querySelector('cart-freeshipping').update(cart.total_price);
              })
              .catch((e) => {
                console.error(e);
              })

          }, 300);
      });
    }
    
    display(){
      $("#cart-icon-bubble").unbind('click');
      $("#cart-icon-bubble").click(function(){
        if ($("#minicart").hasClass('active')) {
          $("#minicart").removeClass('active');
        } else {
          $("#minicart").addClass('active');
        }
        
        return false;
      });
      
      $(document).click(function(event) { 
        var $target = $(event.target);
        if(!$target.closest('#minicart').length && $('#minicart').is(":visible")) {
          $("#minicart").removeClass('active');
        }        
      });

    }
  }
  customElements.define('mini-cart', miniCart);
}
