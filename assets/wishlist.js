class wishlist extends HTMLElement {
  constructor() {
    super();
	this.actiWishlist();
	this.addEventListener('click', (event) => {
      this.updateWishlist(this);
    });
  }

  updateWishlist(evt) {
    if (typeof($.cookie('wishlist')) != 'undefined' && $.cookie('wishlist') != '') {
      var wishlist = $.cookie('wishlist').split(",");
    } else {
      var wishlist = [];
    }

    if (wishlist.indexOf(this.getAttribute("data-handle")) >= 0) {
      wishlist.splice(wishlist.indexOf(this.getAttribute("data-handle")), 1);
      this.classList.remove('active');
    } else {
      wishlist.push(this.getAttribute("data-handle"));
      this.classList.add('active');
    }
    $(".num-wishlisted").html(wishlist.length);
    $('.js-wishlist-count').html(wishlist.length);
    
    $.cookie('wishlist', wishlist.join(','), { expires: 60, path: '/' });
  }
  
  actiWishlist(evt) {
    if (typeof($.cookie('wishlist')) != 'undefined') {
      var wishlist = $.cookie('wishlist').split(",");
    } else {
      var wishlist = [];
    }
    
    $(".num-wishlisted").html(wishlist.length);
    $('.js-wishlist-count').html(wishlist.length);
    
    if (wishlist.indexOf(this.getAttribute("data-handle")) >= 0) {
      this.classList.add('active');
    }
  }
}
customElements.define('product-wishlist', wishlist);

class wishlistpage extends HTMLElement {
  constructor() {
    super();
    this.displayPage();
  }
  
  displayPage(evt) {
    if (typeof($.cookie('wishlist')) != 'undefined') {
      var wishlist = $.cookie('wishlist').split(",");
      if (wishlist.length) {
        document.querySelector('product-wishlistpage').addProductItem(wishlist, 0);
      }
    }
  }
  
  addProductItem(wishlist=[], i=0){
    if (i >= wishlist.length) {
      $(".js-btn-remove-wishlist").click(function(){
      	if (typeof($.cookie('wishlist')) != 'undefined' && $.cookie('wishlist') != '') {
          var wishlist = $.cookie('wishlist').split(",");
          if (wishlist.indexOf($(this).data("handle")) >= 0) {
            wishlist.splice(wishlist.indexOf($(this).data("handle")), 1);
          }

          $(".num-wishlisted").html(wishlist.length);
          $('.js-wishlist-count').html(wishlist.length);

          $.cookie('wishlist', wishlist.join(','), { expires: 60, path: '/' });
          $(this).closest('.grid__item').remove();
          
        } else {
          $(".num-wishlisted").html(0);
          $('.js-wishlist-count').html(0);
        }
      });
      $(".grid__item").show();
      $(".wishlist-template").remove(); 
      updateCurrencies();
    }else {
       var template = $(".wishlist-template").clone(true);
        $.getJSON('/products/' + wishlist[i] + '.js', function(result){
          var regular_price = Shopify.formatMoney(result.price, theme.moneyFormat);
          template.find('span.visually-hidden').html(result.title);
          template.find('a').attr('href', result.url);
          template.find('img').attr('srcset', result.featured_image);
          template.find('img').attr('src', result.featured_image);
		  template.find('.variants-product-item').attr('data-handle', result.handle);	
          template.find('.js-btn-quickview').attr('data-handle', result.handle);
          template.find('.js-btn-wishlist').attr('data-handle', result.handle);
          template.find('.js-btn-compare').attr('data-handle', result.handle);
          template.find(".product-id").val(result.variants[0].id);
          template.find('.card-information__text').html(result.title);
          template.find('.js-btn-wishlist').remove();
          template.find('.price__regular').html(regular_price);
          template.find('.price__sale').remove();
          
          template.append('<button class="js-btn-remove-wishlist" data-handle="'+result.handle+'">Remove item</button>');
          $(".js-wishlist-content ul").append(template);
          i++;
          document.querySelector('product-wishlistpage').addProductItem(wishlist, i);
          
        });
      
      	template.removeClass('wishlist-template');
    }
  }
}
customElements.define('product-wishlistpage', wishlistpage);