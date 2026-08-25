class compare extends HTMLElement {
  constructor() {
    super();
	this.actiCompare();
	this.addEventListener('click', (event) => {
      this.updateCompare(this);
    });
  }

  updateCompare(evt) {
    if (typeof($.cookie('compare')) != 'undefined' && $.cookie('compare') != '') {
      var compare = $.cookie('compare').split(",");
    } else {
      var compare = [];
    }
    
    if (compare.indexOf(this.getAttribute("data-handle")) >= 0) {
      compare.splice(compare.indexOf(this.getAttribute("data-handle")), 1);
      this.classList.remove('active');
    } else {
      compare.push(this.getAttribute("data-handle"));
      this.classList.add('active');
    }
    if (typeof($.cookie('compare')) != 'undefined' && $.cookie('compare') != '') {
      $('.js-compare-count').html(compare.length);
    } else {
      $('.js-compare-count').html(0);
    }
    
    $.cookie('compare', compare.join(','), { expires: 60, path: '/' });
  }
  
  actiCompare(evt) {
    if (typeof($.cookie('compare')) != 'undefined' && $.cookie('compare') != '') {
      var compare = $.cookie('compare').split(",");
    } else {
      var compare = [];
    }
    $('.js-compare-count').html(compare.length);
    if (compare.indexOf(this.getAttribute("data-handle")) >= 0) {
      this.classList.add('active');
    }
  }
}
customElements.define('product-compare', compare);

class comparepage extends HTMLElement {
  constructor() {
    super();
    this.displayPage();
  }
  
  displayPage(evt) {
    if (typeof($.cookie('compare')) != 'undefined') {
      var compare = $.cookie('compare').split(",");
      if (compare.length) {
        document.querySelector('product-comparepage').addProductItem(compare, 0);
      }
    }
  }
  
  addProductItem(compare=[], i=0){
    if (i >= compare.length) {
      $(".js-btn-remove-compare").click(function(){
      	if (typeof($.cookie('compare')) != 'undefined' && $.cookie('compare') != '') {
          var compare = $.cookie('compare').split(",");
          if (compare.indexOf($(this).data("handle")) >= 0) {
            compare.splice(compare.indexOf($(this).data("handle")), 1);
          }

          $('.js-compare-count').html(compare.length);

          $.cookie('compare', compare.join(','), { expires: 60, path: '/' });
          $(this).closest('tr').remove();
        }
      });
      $(".compare-template").remove();
      updateCurrencies();
    }else {
       var template = $(".compare-template").clone(true);
      	template.removeClass('compare-template');
        $.getJSON('/products/' + compare[i] + '.js', function(result){
          var regular_price = Shopify.formatMoney(result.price, theme.moneyFormat)
          template.find('.product-title').html(result.title);
          template.find('.full-unstyled-link').attr('href', result.url);
          template.find('.product-img').attr('src', result.featured_image);
          
          var variant = '';
          for (var j=0; j<result.options.length; j++){
          	variant += '<div><span>' + result.options[j].name + ': </span> ' + result.options[j].values.join(', ') + '</div>';
          }
          template.find('.product-variants').html(variant);
          
          template.find('.product-price').html(regular_price);
          template.find('.product-type').html(result.type);
          template.find('.product-vendor').html(result.vendor);
          template.find('.js-btn-remove-compare').attr('data-handle', result.handle);
          template.show();
          $(".js-compare-content tbody").append(template);
          i++;
          document.querySelector('product-comparepage').addProductItem(compare, i);
          
        });
    }
  }
}
customElements.define('product-comparepage', comparepage);