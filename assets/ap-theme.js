if (typeof($(('#currencies')).html()) != 'undefined'){
if(void 0===Currency)var Currency={};Currency.cookie={configuration:{expires:365,path:"/",domain:window.location.hostname},name:"currency",write:function(o){$.cookie(this.name,o,this.configuration)},read:function(){return $.cookie(this.name)},destroy:function(){$.cookie(this.name,null,this.configuration)}},Currency.moneyFormats={USD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} USD"},EUR:{money_format:"&euro;{{amount}}",money_with_currency_format:"&euro;{{amount}} EUR"},GBP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} GBP"},CAD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} CAD"},ALL:{money_format:"Lek {{amount}}",money_with_currency_format:"Lek {{amount}} ALL"},DZD:{money_format:"DA {{amount}}",money_with_currency_format:"DA {{amount}} DZD"},AOA:{money_format:"Kz{{amount}}",money_with_currency_format:"Kz{{amount}} AOA"},ARS:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} ARS"},AMD:{money_format:"{{amount}} AMD",money_with_currency_format:"{{amount}} AMD"},AWG:{money_format:"Afl{{amount}}",money_with_currency_format:"Afl{{amount}} AWG"},AUD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} AUD"},BBD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} Bds"},AZN:{money_format:"m.{{amount}}",money_with_currency_format:"m.{{amount}} AZN"},BDT:{money_format:"Tk {{amount}}",money_with_currency_format:"Tk {{amount}} BDT"},BSD:{money_format:"BS${{amount}}",money_with_currency_format:"BS${{amount}} BSD"},BHD:{money_format:"{{amount}}0 BD",money_with_currency_format:"{{amount}}0 BHD"},BYR:{money_format:"Br {{amount}}",money_with_currency_format:"Br {{amount}} BYR"},BZD:{money_format:"BZ${{amount}}",money_with_currency_format:"BZ${{amount}} BZD"},BTN:{money_format:"Nu {{amount}}",money_with_currency_format:"Nu {{amount}} BTN"},BAM:{money_format:"KM {{amount_with_comma_separator}}",money_with_currency_format:"KM {{amount_with_comma_separator}} BAM"},BRL:{money_format:"R$ {{amount_with_comma_separator}}",money_with_currency_format:"R$ {{amount_with_comma_separator}} BRL"},BOB:{money_format:"Bs{{amount_with_comma_separator}}",money_with_currency_format:"Bs{{amount_with_comma_separator}} BOB"},BWP:{money_format:"P{{amount}}",money_with_currency_format:"P{{amount}} BWP"},BND:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} BND"},BGN:{money_format:"{{amount}} лв",money_with_currency_format:"{{amount}} лв BGN"},MMK:{money_format:"K{{amount}}",money_with_currency_format:"K{{amount}} MMK"},KHR:{money_format:"KHR{{amount}}",money_with_currency_format:"KHR{{amount}}"},KYD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} KYD"},XAF:{money_format:"FCFA{{amount}}",money_with_currency_format:"FCFA{{amount}} XAF"},CLP:{money_format:"${{amount_no_decimals}}",money_with_currency_format:"${{amount_no_decimals}} CLP"},CNY:{money_format:"&#165;{{amount}}",money_with_currency_format:"&#165;{{amount}} CNY"},COP:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} COP"},CRC:{money_format:"&#8353; {{amount_with_comma_separator}}",money_with_currency_format:"&#8353; {{amount_with_comma_separator}} CRC"},HRK:{money_format:"{{amount_with_comma_separator}} kn",money_with_currency_format:"{{amount_with_comma_separator}} kn HRK"},CZK:{money_format:"{{amount_with_comma_separator}} K&#269;",money_with_currency_format:"{{amount_with_comma_separator}} K&#269;"},DKK:{money_format:"{{amount_with_comma_separator}}",money_with_currency_format:"kr.{{amount_with_comma_separator}}"},DOP:{money_format:"RD$ {{amount}}",money_with_currency_format:"RD$ {{amount}}"},XCD:{money_format:"${{amount}}",money_with_currency_format:"EC${{amount}}"},EGP:{money_format:"LE {{amount}}",money_with_currency_format:"LE {{amount}} EGP"},ETB:{money_format:"Br{{amount}}",money_with_currency_format:"Br{{amount}} ETB"},XPF:{money_format:"{{amount_no_decimals_with_comma_separator}} XPF",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} XPF"},FJD:{money_format:"${{amount}}",money_with_currency_format:"FJ${{amount}}"},GMD:{money_format:"D {{amount}}",money_with_currency_format:"D {{amount}} GMD"},GHS:{money_format:"GH&#8373;{{amount}}",money_with_currency_format:"GH&#8373;{{amount}}"},GTQ:{money_format:"Q{{amount}}",money_with_currency_format:"{{amount}} GTQ"},GYD:{money_format:"G${{amount}}",money_with_currency_format:"${{amount}} GYD"},GEL:{money_format:"{{amount}} GEL",money_with_currency_format:"{{amount}} GEL"},HNL:{money_format:"L {{amount}}",money_with_currency_format:"L {{amount}} HNL"},HKD:{money_format:"${{amount}}",money_with_currency_format:"HK${{amount}}"},HUF:{money_format:"{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} Ft"},ISK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr ISK"},INR:{money_format:"Rs. {{amount}}",money_with_currency_format:"Rs. {{amount}}"},IDR:{money_format:"{{amount_with_comma_separator}}",money_with_currency_format:"Rp {{amount_with_comma_separator}}"},ILS:{money_format:"{{amount}} NIS",money_with_currency_format:"{{amount}} NIS"},JMD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} JMD"},JPY:{money_format:"&#165;{{amount_no_decimals}}",money_with_currency_format:"&#165;{{amount_no_decimals}} JPY"},JEP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} JEP"},JOD:{money_format:"{{amount}}0 JD",money_with_currency_format:"{{amount}}0 JOD"},KZT:{money_format:"{{amount}} KZT",money_with_currency_format:"{{amount}} KZT"},KES:{money_format:"KSh{{amount}}",money_with_currency_format:"KSh{{amount}}"},KWD:{money_format:"{{amount}}0 KD",money_with_currency_format:"{{amount}}0 KWD"},KGS:{money_format:"лв{{amount}}",money_with_currency_format:"лв{{amount}}"},LVL:{money_format:"Ls {{amount}}",money_with_currency_format:"Ls {{amount}} LVL"},LBP:{money_format:"L&pound;{{amount}}",money_with_currency_format:"L&pound;{{amount}} LBP"},LTL:{money_format:"{{amount}} Lt",money_with_currency_format:"{{amount}} Lt"},MGA:{money_format:"Ar {{amount}}",money_with_currency_format:"Ar {{amount}} MGA"},MKD:{money_format:"ден {{amount}}",money_with_currency_format:"ден {{amount}} MKD"},MOP:{money_format:"MOP${{amount}}",money_with_currency_format:"MOP${{amount}}"},MVR:{money_format:"Rf{{amount}}",money_with_currency_format:"Rf{{amount}} MRf"},MXN:{money_format:"$ {{amount}}",money_with_currency_format:"$ {{amount}} MXN"},MYR:{money_format:"RM{{amount}} MYR",money_with_currency_format:"RM{{amount}} MYR"},MUR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} MUR"},MDL:{money_format:"{{amount}} MDL",money_with_currency_format:"{{amount}} MDL"},MAD:{money_format:"{{amount}} dh",money_with_currency_format:"Dh {{amount}} MAD"},MNT:{money_format:"{{amount_no_decimals}} &#8366",money_with_currency_format:"{{amount_no_decimals}} MNT"},MZN:{money_format:"{{amount}} Mt",money_with_currency_format:"Mt {{amount}} MZN"},NAD:{money_format:"N${{amount}}",money_with_currency_format:"N${{amount}} NAD"},NPR:{money_format:"Rs{{amount}}",money_with_currency_format:"Rs{{amount}} NPR"},ANG:{money_format:"&fnof;{{amount}}",money_with_currency_format:"{{amount}} NA&fnof;"},NZD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} NZD"},NIO:{money_format:"C${{amount}}",money_with_currency_format:"C${{amount}} NIO"},NGN:{money_format:"&#8358;{{amount}}",money_with_currency_format:"&#8358;{{amount}} NGN"},NOK:{money_format:"kr {{amount_with_comma_separator}}",money_with_currency_format:"kr {{amount_with_comma_separator}} NOK"},OMR:{money_format:"{{amount_with_comma_separator}} OMR",money_with_currency_format:"{{amount_with_comma_separator}} OMR"},PKR:{money_format:"Rs.{{amount}}",money_with_currency_format:"Rs.{{amount}} PKR"},PGK:{money_format:"K {{amount}}",money_with_currency_format:"K {{amount}} PGK"},PYG:{money_format:"Gs. {{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"Gs. {{amount_no_decimals_with_comma_separator}} PYG"},PEN:{money_format:"S/. {{amount}}",money_with_currency_format:"S/. {{amount}} PEN"},PHP:{money_format:"&#8369;{{amount}}",money_with_currency_format:"&#8369;{{amount}} PHP"},PLN:{money_format:"{{amount_with_comma_separator}} zl",money_with_currency_format:"{{amount_with_comma_separator}} zl PLN"},QAR:{money_format:"QAR {{amount_with_comma_separator}}",money_with_currency_format:"QAR {{amount_with_comma_separator}}"},RON:{money_format:"{{amount_with_comma_separator}} lei",money_with_currency_format:"{{amount_with_comma_separator}} lei RON"},RUB:{money_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",money_with_currency_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"},RWF:{money_format:"{{amount_no_decimals}} RF",money_with_currency_format:"{{amount_no_decimals}} RWF"},WST:{money_format:"WS$ {{amount}}",money_with_currency_format:"WS$ {{amount}} WST"},SAR:{money_format:"{{amount}} SR",money_with_currency_format:"{{amount}} SAR"},STD:{money_format:"Db {{amount}}",money_with_currency_format:"Db {{amount}} STD"},RSD:{money_format:"{{amount}} RSD",money_with_currency_format:"{{amount}} RSD"},SCR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} SCR"},SGD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} SGD"},SYP:{money_format:"S&pound;{{amount}}",money_with_currency_format:"S&pound;{{amount}} SYP"},ZAR:{money_format:"R {{amount}}",money_with_currency_format:"R {{amount}} ZAR"},KRW:{money_format:"&#8361;{{amount_no_decimals}}",money_with_currency_format:"&#8361;{{amount_no_decimals}} KRW"},LKR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} LKR"},SEK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr SEK"},CHF:{money_format:"SFr. {{amount}}",money_with_currency_format:"SFr. {{amount}} CHF"},TWD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TWD"},THB:{money_format:"{{amount}} &#xe3f;",money_with_currency_format:"{{amount}} &#xe3f; THB"},TZS:{money_format:"{{amount}} TZS",money_with_currency_format:"{{amount}} TZS"},TTD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TTD"},TND:{money_format:"{{amount}}",money_with_currency_format:"{{amount}} DT"},TRY:{money_format:"{{amount}}TL",money_with_currency_format:"{{amount}}TL"},UGX:{money_format:"Ush {{amount_no_decimals}}",money_with_currency_format:"Ush {{amount_no_decimals}} UGX"},UAH:{money_format:"₴{{amount}}",money_with_currency_format:"₴{{amount}} UAH"},AED:{money_format:"Dhs. {{amount}}",money_with_currency_format:"Dhs. {{amount}} AED"},UYU:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} UYU"},VUV:{money_format:"${{amount}}",money_with_currency_format:"${{amount}}VT"},VEF:{money_format:"Bs. {{amount_with_comma_separator}}",money_with_currency_format:"Bs. {{amount_with_comma_separator}} VEF"},VND:{money_format:"{{amount_no_decimals_with_comma_separator}}&#8363;",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} VND"},XBT:{money_format:"{{amount_no_decimals}} BTC",money_with_currency_format:"{{amount_no_decimals}} BTC"},XOF:{money_format:"CFA{{amount}}",money_with_currency_format:"CFA{{amount}} XOF"},ZMW:{money_format:"K{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"ZMW{{amount_no_decimals_with_comma_separator}}"}},Currency.formatMoney=function(o,m){if("function"==typeof Shopify.formatMoney)return Shopify.formatMoney(o,m);"string"==typeof o&&(o=o.replace(".",""));var t="",n=/\{\{\s*(\w+)\s*\}\}/,a=m||"${{amount}}";function r(o,m){return void 0===o?m:o}function _(o,m,t,n){if(m=r(m,2),t=r(t,","),n=r(n,"."),isNaN(o)||null==o)return 0;var a=(o=(o/100).toFixed(m)).split(".");return a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+t)+(a[1]?n+a[1]:"")}switch(a.match(n)[1]){case"amount":t=_(o,2);break;case"amount_no_decimals":t=_(o,0);break;case"amount_with_comma_separator":t=_(o,2,".",",");break;case"amount_no_decimals_with_comma_separator":t=_(o,0,".",",")}return a.replace(n,t)},Currency.currentCurrency="",Currency.format="money_with_currency_format",Currency.convertAll=function(o,m,t,n){$(t||"span.money").each(function(){if($(this).attr("data-currency")!==m){if($(this).attr("data-currency-"+m))$(this).html($(this).attr("data-currency-"+m));else{var t=0,a=Currency.moneyFormats[o][n||Currency.format]||"{{amount}}",r=Currency.moneyFormats[m][n||Currency.format]||"{{amount}}";t=-1!==a.indexOf("amount_no_decimals")?Currency.convert(100*parseInt($(this).html().replace(/[^0-9]/g,""),10),o,m):"JOD"===o||"KWD"==o||"BHD"==o?Currency.convert(parseInt($(this).html().replace(/[^0-9]/g,""),10)/10,o,m):Currency.convert(parseInt($(this).html().replace(/[^0-9]/g,""),10),o,m);var _=Currency.formatMoney(t,r);$(this).html(_),$(this).attr("data-currency-"+m,_)}$(this).attr("data-currency",m)}}),this.currentCurrency=m,this.cookie.write(m)};

}
setSelectBoxDropdown("collection-select-search");
$(document).click(function(event) { 
	var target = $(event.target);
	if(typeof(target.closest('.header-sign').html()) == 'undefined') {
        $('.mini-acount').removeClass('is-open active').hide();
        $('.header-sign').removeClass('is-active active');
    }
    if(typeof(target.closest('.icon-search').html()) == 'undefined') {
        $('.form-search').removeClass('active');
    }
	if(typeof(target.closest('.block_currencies').html()) == 'undefined') {
        $('.list-unstyled.dropdown-menu.shadow.active').hide();
    }
	
	if(typeof(target.closest('.nav-mega.active').html()) == 'undefined' && typeof(target.closest('.d-block').html()) == 'undefined') {
        $('.nav-mega').removeClass('active');
    	$('body').removeClass('has-menu-mobile');
    }

	if(typeof(target.closest('.modal-content').html()) == 'undefined') {
        target.closest('.modal').hide();
    }
});

window.theme = window.theme || {};
window.slate = window.slate || {};

function initSlick(object){
  if (typeof(object.html()) == 'undefined') {
  	return; 
  }
  var setting = object.data('setting');
  var accessibility = typeof(setting.accessibility) == 'undefined' ? false : setting.accessibility;
  var arrows = typeof(setting.arrows) == 'undefined' ? true : setting.arrows;
  var dots = typeof(setting.dots) == 'undefined' ? true : setting.dots;
  var infinite = typeof(setting.infinite) == 'undefined' ? false : setting.infinite;
  var autoplay = typeof(setting.autoplay) == 'undefined' ? false : setting.autoplay;
  var autoplaySpeed = typeof(setting.autoplaySpeed) == 'undefined' ? 3000 : setting.autoplaySpeed;
  var speed = typeof(setting.speed) == 'undefined' ? 300 : setting.speed;
  var slidesToShow = typeof(setting.slidesToShow) == 'undefined' ? 5 : setting.slidesToShow;
  var slidesToScroll = typeof(setting.slidesToScroll) == 'undefined' ? 5 : setting.slidesToScroll;
  var vertical = typeof(setting.vertical) == 'undefined' ? false : setting.vertical;
  var mobileFirst = typeof(setting.mobileFirst) == 'undefined' ? false : setting.mobileFirst;
  var centerMode = typeof(setting.centerMode) == 'undefined' ? false : setting.centerMode;
  var pauseOnHover = typeof(setting.pauseOnHover) == 'undefined' ? false : setting.pauseOnHover;
  var rows = typeof(setting.rows) == 'undefined' ? 1 : setting.rows;
  var slidesPerRow = typeof(setting.slidesPerRow) == 'undefined' ? 1 : setting.slidesPerRow;
  var rtl = typeof(setting.pauseOnHover) == 'undefined' ? false : setting.pauseOnHover;

  
  
  var slidesToShow_992 = typeof(setting.slidesToShow_992) == 'undefined' ? 4 : setting.slidesToShow_992;
  var slidesToScroll_992 = typeof(setting.slidesToScroll_992) == 'undefined' ? 4 : setting.slidesToScroll_992;
  var arrows_992 = typeof(setting.arrows_992) == 'undefined' ? true : setting.arrows_992;
  var dots_992 = typeof(setting.dots_992) == 'undefined' ? true : setting.dots_992;
  
  var slidesToShow_767 = typeof(setting.slidesToShow_767) == 'undefined' ? 3 : setting.slidesToShow_767;
  var slidesToScroll_767 = typeof(setting.slidesToScroll_767) == 'undefined' ? 3 : setting.slidesToScroll_767;
  var arrows_767 = typeof(setting.arrows_767) == 'undefined' ? true : setting.arrows_767;
  var dots_767 = typeof(setting.dots_767) == 'undefined' ? true : setting.dots_767;
  
  var slidesToShow_450 = typeof(setting.slidesToShow_450) == 'undefined' ? 2 : setting.slidesToShow_450;
  var slidesToScroll_450 = typeof(setting.slidesToScroll_450) == 'undefined' ? 2 : setting.slidesToScroll_450;
  var arrows_450 = typeof(setting.arrows_450) == 'undefined' ? true : setting.arrows_450;
  var dots_450 = typeof(setting.dots_450) == 'undefined' ? true : setting.dots_450;
  var asNavFor = typeof(setting.asNavFor) == 'undefined' ? '' : setting.asNavFor;
  var centerMode = typeof(setting.centerMode) == 'undefined' ? 'false' : setting.centerMode;
      
  object.not('.slick-initialized').slick({
    accessibility: accessibility,
    arrows: arrows,
    dots: dots,
    infinite: infinite,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    vertical: vertical,
    verticalSwiping: vertical,
    mobileFirst: mobileFirst,
    pauseOnHover: pauseOnHover,
    rows: rows,
    centerMode: centerMode,
    slidesPerRow: slidesPerRow,
    rtl: rtl,
    draggable: true,
    asNavFor: asNavFor,
    responsive: [
      
      {
        breakpoint: 992,
        settings: {
          slidesToShow: slidesToShow_992,
          slidesToScroll: slidesToScroll_992,
          dots: dots_992,
          arrows: arrows_992
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: slidesToShow_767,
          slidesToScroll: slidesToScroll_767,
          dots: dots_767,
          arrows: dots_767
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: slidesToShow_450,
          slidesToScroll: slidesToScroll_450,
          dots: dots_450,
          arrows: arrows_450
        }
      }
    ]
  });
}

function allInit(){ 
  $('.apslick').each(function(){
    if (!$(this).hasClass('slick-initialized')) {
      initSlick($(this));
    }
  });
  
  if($(window).width() > 767) {
    initSlick($('.slide-show .slide-slick'));
  } else {
    setTimeout(function() { 
      initSlick($('.slide-show .slide-slick'));
    }, $('.slide-show').data('delay') * 1000);
  }
  
  
  collectionCoupon()
  productImageGallery();
  loaddingSlickProductTab();
  iconShow();
  initHotPots();
  updateCurrencies();
  tabEvent();
  sizeGuideEvent();
  displayProductMedia();
  listImageZoom();
  productImagesSlick();
  closePopup();
  displayUpsell();
  updateVariant();
  theme.fakeViewer
  productVideo();
  
}

$( document ).ready(function() {
    allInit();
});

var instafeed_stt = true;
var productrecent_stt = true;
var productsuggest_stt = true;
var loadpopup_stt = true;
$(window).scroll(function() {
  if (typeof($('#instafeed').html()) != 'undefined' && $('#instafeed').html().length< 10 && !$('#instafeed').hasClass('slick-initialized') && document.documentElement.scrollTop > 500) {
    if (instafeed_stt) {
      instafeed_stt = false;
      leo_create_instafeed();
    }
  }
  if (typeof($('#shopify-section-recently-viewed').html()) != 'undefined' && document.documentElement.scrollTop > 500) {
    if (productrecent_stt) {
      productrecent_stt = false;
      displayProductRecent();
    }
  }
  if (typeof($('#shopify-section-product-suggest').html()) != 'undefined' && document.documentElement.scrollTop > 500) {
    if (productsuggest_stt) {
      productsuggest_stt = false;
      productSuggest();
    }
  }
  if (typeof($('#shopify-section-popup').html()) != 'undefined' && document.documentElement.scrollTop > 300) {
    if (loadpopup_stt) {
      loadpopup_stt = false;
      apLoadPopup();
    }
  }
  
});

if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', event => {
    allInit();
    leo_create_instafeed();
    productSuggest();
    displayProductRecent();
  }, true);
  document.addEventListener('shopify:block:select', event => {
    var $slide = $('#ap-slick-content-' + event.detail.blockId);
    var slideIndex = $slide.data('slick-index');
    $slide.closest(".ap-custom-slick").slick('slickGoTo', slideIndex).slick('slickPause');
  }, true);
  document.addEventListener('shopify:block:deselect', event => {
    $(".ap-custom-slick").slick('slickPlay');
  }, true);
  Shopify.onCartUpdate = function(cart) {
    alert('There are now ' + cart.item_count + ' items in the cart.');
  }; 
}

function collectionCoupon() {
 setInterval(function() {
    $('#jsCoupon').show();
    $('#jsCoupon').addClass('show');
  }, $('#jsCoupon').data('delay'));  
  
  $(".js-btn-coupon").click(function(){
  	var copyText = document.getElementById("coupon_code");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    $('.coupon-copied').show();
  });
}

function sizeGuideEvent(){
  $('.open-sizeguide').click(function(){
    $('#jsSizeGuide').addClass('show');
    $('#jsSizeGuide').show();
    return false;
  });
  $('#jsSizeGuide .close').click(function(){
  	$('#jsSizeGuide').removeClass('show');
    $('#jsSizeGuide').hide();
  });
}

function cookie_law(){
  if (typeof($.cookie('cookie_law')) == 'undefined' || !$.cookie('cookie_law')) {
    $(".js-cookie-policy").show();
  }
  $(".js-cookie-policy .js-btn-ok").click(function(){
    $.cookie('cookie_law', 1, { expires: 60, path: '/' });
    $(".js-cookie-policy").hide();
  }); 
}

function tabEvent(){
  if(typeof($('.review-content').html()) != 'undefined') {
    $('.review-content').html($('#shopify-product-reviews').clone(true));
	$('#shopify-product-reviews').remove();
  }
  
  $('#tab-accordion a.card-link').click(function(){
  	$('#tab-accordion .collapse').removeClass('show');
    $('#tab-accordion .card-header').removeClass('active-acc');
    $(this).parent().addClass('active-acc');
    $($(this).data('target')).addClass('show');
    return false;
  });
  
  $('.nav-tabs a').click(function(){
  	$(this).closest('#nav-tab-info').find('.tab-content-value').removeClass('active show');
    $(this).parent().find('a').removeClass('active');
    $(this).parent().find('a').attr('aria-selected', false);
    $($(this).attr('href')).addClass('active show');
    $(this).addClass('active');
    $(this).attr('aria-selected', true);
    
    return false;
  }); 
}

function updateProductRecent() {
  if (typeof($("#producthandle").val()) != 'undefined') {
    if (typeof($.cookie('productrecent')) != 'undefined' && $.cookie('productrecent') != '') {
      var productrecent = $.cookie('productrecent').split(",");
    } else {
      var productrecent = [];
    }
    if (productrecent.indexOf($("#producthandle").val()) < 0 && $("#producthandle").val() != '') {
      productrecent.push($("#producthandle").val());
    }
    if (productrecent.length > 6) {
      productrecent.splice(0, 1);
    }
    
    $.cookie('productrecent', productrecent.join(','), { expires: 60, path: '/' });
  }
}

function addProductRecent(productrecent, i=0){
  if (i >= productrecent.length) {
    $(".recently-viewed-show").show();
    initSlick($(".recently-viewed-show .img-viewed"));
  }else {
    $.getJSON('/products/' + productrecent[i] + '.js', function(result){
      var regular_price = Shopify.formatMoney(result.price, theme.moneyFormat);
	  var template = '<div>';
      template += '<div><a href="'+result.url+'"><img src="'+result.featured_image.replace('.jpg', '_300x.jpg')+'" alt="'+result.title+'"></a></div>';
      template += '<div class="product-name">'+result.title+'</div>';
      template += '</div>';
      $(".js-recently-view-content").append(template);
      
      var template = '<div>';
      template += '<div><img src="'+result.featured_image.replace('.jpg', '_100x.jpg')+'" alt="'+result.title+'"></div>';
      template += '<div class="product-name">'+result.title+'</div>';
      template += '</div>';
      
      $(".recently-viewed-show .img-viewed").append(template);
      
      i++;
      addProductRecent(productrecent, i);
    });
  }
}

function displayProductRecent(){  
  if (typeof($.cookie('productrecent')) != 'undefined' && $.cookie('productrecent') != '') {
    var productrecent = $.cookie('productrecent').split(",");
    $(".js-recently-view-content").html('');
    $(".recently-viewed-show .img-viewed").html('');
    addProductRecent(productrecent, 0);
  }
}

function changeVariantproduct(){
  $(".variants-product-item label").click(function(){
    var handle = $(this).closest('.variants-product-item').data('handle');
    $(this).closest('.variants-item').find('input').removeAttr('checked');
    $(this).closest('.variant').find('input').attr('checked', 'checked');
    $(this).closest('.variants-product-item').find('.variant').removeClass('active');
    $(this).closest('.variant').addClass('active');
    
    var el = $(this).closest('.variants-product-item');
    
    var arr_options = [];
    $(this).closest('.variants-product-item').find('input').each(function(){
      if ($(this).attr('checked') == 'checked') {
      	arr_options.push($(this).val()); 
      }
    });
    $.getJSON('/products/' + handle + '.js', function(result){
      for(i=0; i<result.variants.length; i++){
        if (result.variants[i].title == arr_options.join(" / ")) {
          console.log(result.variants[i].featured_image.src);
          var regular_price = Shopify.formatMoney(result.variants[i].price, theme.moneyFormat);
          el.closest('.grid__item').find('div.price').html(regular_price);
          el.closest('.grid__item').find('div.media').find('img').attr('src', result.variants[i].featured_image.src);
          el.closest('.grid__item').find('div.media').find('img').attr('srcset', result.variants[i].featured_image.src);
          updateCurrencies();
          if (result.variants[i].available) {
            el.closest('.grid__item').find('product-form').show();
          } else {
            el.closest('.grid__item').find('product-form').hide();
          }			
        }
      }
    });
    
  });
}

function apLoadPopup(){
  if ($.cookie('ap_load_popup') != 1) {
    setTimeout(function() { 
      var ap_load_popup = new bootstrap.Modal(document.getElementById('ap_load_popup'), {
        keyboard: false
      });
      ap_load_popup.show();
    }, $("#ap_load_popup").data('delay') * 1000);
  }
  $("#ap_load_popup .btn-close").click(function(){
  	$.cookie('ap_load_popup', '1', {expires:1, path:'/'});
  });
}

function loadCountDown(){
  $(".js-countdown").each(function(){
    var time = $(this).data('time').replace('Z', '').split("T");
    var d = time[0].split("-");
    var m = 'Jan';
    if (d[1] == 2) m = 'Feb';
    if (d[1] == 3) m = 'Mar';
    if (d[1] == 4) m = 'Apr';
    if (d[1] == 5) m = 'May';
    if (d[1] == 6) m = 'Jun';
    if (d[1] == 7) m = 'Jul';
    if (d[1] == 8) m = 'Aug';
    if (d[1] == 9) m = 'Sep';
    if (d[1] == 10) m = 'Oct';
    if (d[1] == 11) m = 'Nov';
    if (d[1] == 12) m = 'Dec';
    var d_t = m + ' ' + d[2] + ', ' + d[0] + ' ' + time[1];

    var countDownDate = new Date(d_t).getTime();
    var el = $(this);
    var x = setTimeout(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var html = '<div><span class="label-time">' + days + '</span>';
      if (days > 1) {
         html += '<span class="label">Days</span>';
      } else {
         html += '<span class="label">day</span>';
      }
      html += '</div>';
      html += '<span class="label-dots">:</span><div><span class="label-time">'+hours+'</span><span class="label">Hours</span></div>';
      html += '<span class="label-dots">:</span><div><span class="label-time">'+minutes+'</span><span class="label">Mins</span></div>';
      html += '<span class="label-dots">:</span><div><span class="label-time">'+seconds+'</span><span class="label">Secs</span></div>';
      el.html(html);
      if (distance < 0) {
        el.remove();
      }
    }, 1000); 
  });
}

function openPhotoSwipe() {
  var pswpElement = document.querySelectorAll('.pswp')[0];

  var items = [];
  $("#product-gallery-image-zoom img").each(function(){

    items.push({src: $(this).data('url'), w: $(this).data('width'), h: $(this).data('height')})
  });
  var options = {       
    history: false,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0
  };

  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
};

function productImagesSlick(){
  initSlick($(".productimagesslick"));
  $(".productimagesslick img").click(function(){
  	openPhotoSwipe();
      return false;
  });
}

function listImageZoom(){
  if (typeof($(".main-product-image-scroll-fixed-3-columns").html()) != 'undefined') {
    $('.list-zoom-item .product-full-image-zoom').each(function(){
      $(this).elevateZoom({
        zoomType: "inner",
        cursor: "crosshair" 
      });
    });
    $(".list-zoom-item .product-full-image-zoom").bind("click", function(e) {
      openPhotoSwipe();
      return false;
    });
  }
  
}
function productImageGallery(){
  if (typeof($("#product-full-image-zoom").attr('src')) != 'undefined') {
    initSlick($(".product-thumb-image-slick"));
  
    $("#product-full-image-zoom").elevateZoom({
      gallery:'product-gallery-image-zoom',
      zoomType: "inner",
      cursor: "crosshair" 
    });

    $("#product-full-image-zoom").bind("click", function(e) {
      openPhotoSwipe();
      return false;
    });

    $('.product-thumb-image li img').click(function(){
       var slider = $('#product-gallery-image-zoom');
       slider[0].slick.slickGoTo(parseInt($(this).parent().data('slick-index')));
      if($(this).hasClass('video-product')) {
        
      } else {
        $("img.product-full-image-zoom").attr('src', $(this).data('url'));
        $("img.product-full-image-zoom").attr('srcset', $(this).data('url'));
        $("img.product-full-image-zoom").attr('zoom-image', $(this).data('url'));
        $(".zoomWindowContainer .zoomWindow").css('background-image', 'url("' +$(this).data('url') + '")');
      }
    });
  }
}

function displayProductMedia(){
  $(".product-media-item").click(function(){
  	$(".product-media-modal__content > img").remove();
    var id_media = $(this).data('media-id');
    $(".product-media-modal__content").children().each(function(){
      if($(this).data('media-id') != id_media) {
        $(this).hide();
      } else {
       $(this).show(); 
      }
    });
    $(".product-media-modal").attr('open', 'open');
  });
}


function addGroupProductCart() {
  $(".add-group-cart").click(function(){
    var id_products = [];
    $(".group_products input.group_product-item").each(function(){
      if($(this).is(':checked')) {
      	//$(this).parent().find('.product-form__submit').trigger('click');
        id_products.push($(this).val());
      }
    });
    $(".group-cart-products").addClass('loadding');
    addGroupProductCartItem(id_products, 0);
  }); 
}
function addGroupProductCartItem(products, i=0){
  if (i >= products.length) {
    $(".cart-notification__header h2").html('Item added to your cart');
    $("#cart-notification-product").html('');
    $(".group-cart-products").removeClass('loadding');
  }else {
    $.ajax({
      type: 'POST',
      url: '/cart/add',
      data: {
        form_type: "product",
        id: products[i],
        quantity: 1,
        sections:['cart-notification-product', 'cart-notification-button', 'cart-icon-bubble'],
        sections_url: "/products/5-pocket-jean",
        utf8: "✓"
      },
      dataType: 'json',
      success:(function(lineItem) {
        $("#cart-notification-product").html('');
        $("#cart-notification-product").html($(lineItem['sections']['cart-notification-product']).find("div").html());
        $("#cart-notification-button").html($(lineItem['sections']['cart-notification-button']).html());
        $("#cart-notification").addClass('active');
        $("#cart-icon-bubble").html(lineItem['sections']['cart-icon-bubble']);
        document.querySelector('mini-cart').update();
        i++;
        addGroupProductCartItem(products, i);
        
      }),
      error: (function(XMLHttpRequest, textStatus) {
        this.error(XMLHttpRequest, textStatus);
        $(".group-cart-products").removeClass('loadding');
      })
    });
  }
}


if (theme.enableCurrencies && typeof($(('#currencies')).html()) != 'undefined'){
  Currency.format = 'money_format';
  var shopCurrency = Shopify.currency.active;
  var cookieCurrency = Currency.cookie.read();
  
  $('span.money span.money').each(function() {
    $(this).parent('span.money').removeClass('money');
  });
  $('span.money').each(function() {
    $(this).attr('data-currency-' + Shopify.currency.active, $(this).html());
    $(this).removeAttr('ls-currency-usd');
    $(this).removeAttr('ls-currency');
  });
  var buttons = $('#currencies a'),
  currentCurrencies = $('.pre-currencies');
  if (cookieCurrency == null || cookieCurrency == shopCurrency) {
    Currency.currentCurrency = shopCurrency;
  }
  else {
    Currency.currentCurrency = cookieCurrency;
    Currency.convertAll(shopCurrency, cookieCurrency);
    buttons.removeClass('selected');
    $('#currencies a[data-currency=' + cookieCurrency + ']').addClass('selected');
    var htmlCurrently = $('#currencies a[data-currency=' + cookieCurrency + ']').html();
    currentCurrencies.html(htmlCurrently);
  }
  buttons.click(function() {
    buttons.removeClass('selected');
    $(this).addClass('selected');
    var newCurrency =  $(this).attr('data-currency');
    var htmlCurrently = $(this).html();
    currentCurrencies.html(htmlCurrently);
    Currency.convertAll(Currency.currentCurrency, newCurrency);
    $("#currencies").removeClass('active');
    $("#currencies").hide();
  });
  var original_selectCallback = window.selectCallback;
  var selectCallback = function(variant, selector) {
    original_selectCallback(variant, selector);
    Currency.convertAll(shopCurrency, $('#currencies a.selected').attr('data-currency'));
  };
  
  $(".block_currencies .dropdown-toggle").click(function(){
    if($("#currencies").hasClass('active')){
      $("#currencies").removeClass('active');
      $("#currencies").hide();
    } else {
      $("#currencies").addClass('active');
      $("#currencies").show();
    }
  });

}
function updateCurrencies(){
  if (typeof($(('#currencies')).html()) != 'undefined'){
    Currency.convertAll(shopCurrency, $('#currencies a.selected').attr('data-currency'));
  }
}

function loaddingSlickProductTab(){
  $("ul#pills-tab button, ul#pills-tab a").on('click shown.bs.tab', function(){
    var current_tab_content = $(this).data('bs-target') || $(this).attr('data-bs-target') || $(this).attr('href');
    if (!current_tab_content) return;
    var $tab = $(current_tab_content);
    if ($tab.length) {
      setTimeout(function(){
        if (!$tab.hasClass('slick-initialized')) {
          initSlick($tab);
        } else {
          $tab.slick('setPosition');
        }
        if ($tab.hasClass('slick-initialized')) {
          $tab.slick('slickGoTo', 0, true);
        }
      }, 10);
    }
  });
}

function actionMenuMobile(){
  $(".site-header__icon-menu").click(function(){
    if($('.nav-mega').hasClass('active')){
      $('.nav-mega').removeClass('active');
      $('body').removeClass('has-menu-mobile');
    }else{
      $('.nav-mega').addClass('active');
      $('body').addClass('has-menu-mobile');
    }
  });
  $('.menu-close .button-close').click(function(){
    $('.nav-mega').removeClass('active');
    $('body').removeClass('has-menu-mobile');
  });
  $('.drawer__nav-toggle--open').click(function(){
    if($(this).parent().hasClass('site-nav__item-mega')){
      if($(this).parent().hasClass('active')){
        $(this).parent().removeClass('active');
        $(this).find('i').addClass('fa-angle-down');
        $(this).find('i').removeClass('fa-angle-up');
      }else{
        $(this).parent().addClass('active');
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
      }
    }else{
      if($(this).closest('.mega-col-inner').hasClass('active')){
        $(this).closest('.mega-col-inner').removeClass('active');
        $(this).find('i').addClass('fa-angle-down');
        $(this).find('i').removeClass('fa-angle-up');
      }else{
        $(this).closest('.mega-col-inner').addClass('active');
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
      }
    }
  });

  $(".vertical-bars").click(function(){
    if($('.nav-vertical').hasClass('show')){
      $('.nav-vertical').removeClass('show');
      $('body').removeClass('has-menu-vertical');
    }else{
      $('.nav-vertical').addClass('show');
      $('body').addClass('has-menu-vertical');
    }
  });
  $('.vertical-menu-close .button-vertical-menu-close').click(function(){
    $('.nav-vertical').removeClass('show');
    $('body').removeClass('has-menu-vertical');
  });
  $('.drawer__ver-toggle--open').click(function(){
    if($(this).parent().hasClass('site-nav__item-vertical')){
      if($(this).parent().hasClass('show')){
        $(this).parent().removeClass('show');
        $(this).find('i').addClass('fa-angle-down');
        $(this).find('i').removeClass('fa-angle-up');
      }else{
        $(this).parent().addClass('show');
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
      }
    }else{
      if($(this).closest('.vertical-col-inner').hasClass('show')){
        $(this).closest('.vertical-col-inner').removeClass('show');
        $(this).find('i').addClass('fa-angle-down');
        $(this).find('i').removeClass('fa-angle-up');
      }else{
        $(this).closest('.vertical-col-inner').addClass('show');
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
      }
    }
  });

  $(".vertical-bkg").click(function(){
    $('.nav-vertical').removeClass('show');
    $('body').removeClass('has-menu-vertical');
  });

  $('.title-footer').click(function(){
    if($(this).parent().hasClass('menu-footer')){
      if($(this).parent().hasClass('active')){
        $(this).parent().removeClass('active');
        $(this).find('i').addClass('fa-angle-down');
        $(this).find('i').removeClass('fa-angle-up');
      }else{
        $(this).parent().addClass('active');
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
      }
    }
  });

  $('.sticky-cart-close').click(function(){
    $('.sticky-cart-view').remove();
  });
}

function initHotPots(){
  $('.banner-hotspots-icons').each(function(){
    var event_icon = 'hoverable';
    if($(window).width() <= 991) {
      event_icon = 'click';
    }
  	$(this).LiteTooltip({
      trigger: event_icon,
      title:'<div class="tooltip-hotpot content-product-banner">' + $(this).find('.banner-hotspots-product').html() +'</div>'
    });
  }); 
}

function stickyDisplay(){
  if ($(typeof($('.sticky-cart-view').html()) != 'undefined')) {
    window.onscroll = function() {myFunction()};
    function myFunction() {
      if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        $('#sticky-cart').addClass('active');
      } else {
        $('#sticky-cart').removeClass('active');
      }
    }
  }
}

theme.updatePriceFilter = function (){
  if (typeof($("#slider-range").html()) != 'undefined' && typeof($("#slider-range-mobile").html()) != 'undefined'){
    if (typeof($('#currencies a.selected').attr('data-currency')) != 'undefined') {
    	var max_price = parseInt(Currency.convert(parseInt($("#slider-range").data('max')), shopCurrency, $('#currencies a.selected').attr('data-currency')));
    	var min_price = parseInt(Currency.convert(0, shopCurrency, $('#currencies a.selected').attr('data-currency'))); 
    } else {
    	var max_price = parseInt($("#slider-range").data('max'));
        var min_price = 0;
    }
    

    var current_min_price = min_price;
    if ($("#Filter-Price-GTE").val()) {
      if (typeof($('#currencies a.selected').attr('data-currency')) != 'undefined') {
      	current_min_price = parseInt(Currency.convert(parseInt($("#Filter-Price-GTE").val()), shopCurrency, $('#currencies a.selected').attr('data-currency')));
      } else {
        current_min_price = parseInt($("#Filter-Price-GTE").val());
      }
    }
    var current_max_price = max_price;
    if ($("#Filter-Price-LTE").val()) {
      if (typeof($('#currencies a.selected').attr('data-currency')) != 'undefined') {
        current_max_price = parseInt(Currency.convert(parseInt($("#Filter-Price-LTE").val()), shopCurrency, $('#currencies a.selected').attr('data-currency')));
      } else {
        current_max_price = parseInt($("#Filter-Price-LTE").val());
      }
    }

    $("#slider-range").attr('data-max', max_price);
    $("#slider-range").slider({
      range: true,
      min: min_price,
      max: max_price,
      values: [current_min_price, current_max_price],
      slide: function( event, ui ) {
        if (typeof($('#currencies a.selected').attr('data-currency')) != 'undefined') {
          	var p1 = parseInt(Currency.convert(ui.values[0], $('#currencies a.selected').attr('data-currency'), shopCurrency));
        	var p2 = parseInt(Currency.convert(ui.values[1], $('#currencies a.selected').attr('data-currency'), shopCurrency));
        } else {
          	var p1 = ui.values[0];
        	var p2 = ui.values[1];
        }
        

        $("#Filter-Price-GTE").val(p1);
        $("#Filter-Price-LTE").val(p2);
		
		$('.slider-range-content .price-from').html(Shopify.formatMoney(p1 * 100, theme.moneyFormat));
        $('.slider-range-content .price-to').html(Shopify.formatMoney(p2 * 100, theme.moneyFormat));
        
        updateCurrencies();
      },
      stop: function( event, ui ) {
          var form = $("<form id='CollectionFiltersForm'></form>");
          $('#CollectionFiltersForm input').each(function(){
            form.append($(this));
          });
		
        if (typeof($('#currencies a.selected').attr('data-currency')) != 'undefined') {
          	var p1 = parseInt(Currency.convert(ui.values[0], $('#currencies a.selected').attr('data-currency'), shopCurrency));
        	var p2 = parseInt(Currency.convert(ui.values[1], $('#currencies a.selected').attr('data-currency'), shopCurrency));
        } else {
          	var p1 = ui.values[0];
        	var p2 = ui.values[1];
        }

          $('.slider-range-content .price-from').html(Shopify.formatMoney(p1 * 100, theme.moneyFormat));
          $('.slider-range-content .price-to').html(Shopify.formatMoney(p2 * 100, theme.moneyFormat));
          updateCurrencies();
          const formData = new FormData(form[0]);
          const searchParams = new URLSearchParams(formData).toString();
          document.querySelector('collection-filters-form').renderPage(searchParams, null, true);
      }
    });

    $("#slider-range-mobile").attr('data-max', max_price);
    $("#slider-range-mobile").slider({
      range: true,
      min: min_price,
      max: max_price,
      values: [current_min_price, current_max_price],
      slide: function( event, ui ) {
        var p1 = parseInt(Currency.convert(ui.values[0], $('#currencies a.selected').attr('data-currency'), shopCurrency));
        var p2 = parseInt(Currency.convert(ui.values[1], $('#currencies a.selected').attr('data-currency'), shopCurrency));

        $("#Filter-Price-GTE").val(p1);
        $("#Filter-Price-LTE").val(p2);


        $('.slider-range-content .price-from').html(Shopify.formatMoney(p1 * 100, theme.moneyFormat));
        $('.slider-range-content .price-to').html(Shopify.formatMoney(p2 * 100, theme.moneyFormat));
        updateCurrencies();
      },
      stop: function( event, ui ) {
          var form = $("<form id='CollectionFiltersForm'></form>");
          $('#CollectionFiltersForm input').each(function(){
            form.append($(this));
          });

          var p1 = parseInt(Currency.convert(ui.values[0], $('#currencies a.selected').attr('data-currency'), shopCurrency))
          var p2 = parseInt(Currency.convert(ui.values[1], $('#currencies a.selected').attr('data-currency'), shopCurrency));

          $('.slider-range-content .price-from').html(Shopify.formatMoney(p1 * 100, theme.moneyFormat));
          $('.slider-range-content .price-to').html(Shopify.formatMoney(p2 * 100, theme.moneyFormat));
          updateCurrencies();
          const formData = new FormData(form[0]);
          const searchParams = new URLSearchParams(formData).toString();
          document.querySelector('collection-filters-form').renderPage(searchParams, null, true);
      }
    });
  }
}

$( document ).ready(function() {
  
  // fetch('/variants/41186856632512/?section_id=pickup-availability')
  // .then(response => response.text())
  // .then(text => {
  //   //const container = document.querySelector('[data-store-availability-container]');
  //   const pickupAvailabilityHTML = new DOMParser()
  //     .parseFromString(text, 'text/html')
  //     .querySelector('.shopify-section');
	// console.log(pickupAvailabilityHTML);
  //   //container.appendChild(pickupAvailabilityHTML);
  // })
  // .catch(e => {
  //   console.error(e);
  // });
  
  
  
  if($(window).width() > 767) {
    cookie_law();
  } else {
    setTimeout(function() { 
      cookie_law();
    }, $('.js-cookie-policy').data('delay') * 1000);
  }
  
  updateProductRecent();
  changeVariantproduct();
  loadCountDown();
  addGroupProductCart();
  actionMenuMobile();
  stickyDisplay();
  
  	$(".show_login").click(function(e){
      e.preventDefault();
      e.stopPropagation();
      var $parentSign = $(this).closest('.header-sign');
      var $miniAccount = $parentSign.find('.mini-acount');
      var isVisible = $miniAccount.is(":visible") || $miniAccount.hasClass('is-open') || $miniAccount.hasClass('active');

      $('.mini-acount').not($miniAccount).removeClass('is-open active').hide();
      $('.header-sign').not($parentSign).removeClass('is-active active');

      if(isVisible) {   
        $miniAccount.removeClass('is-open active').hide();
        $parentSign.removeClass('is-active active');
      } else{
        $miniAccount.addClass('is-open active').show();
        $parentSign.addClass('is-active active');
      }
    });
	
    $('.nav-pills li a').click(function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $(this).tab('show');
    });
  updateCurrencies();
  theme.updatePriceFilter();
  $(".product-media-item .product__media-icon").show();
  
  
  if($.cookie('wishlist')) {
    var wishlist = $.cookie('wishlist').split(",");
    $(".num-wishlisted").html(wishlist.length);
  	$('.js-wishlist-count').html(wishlist.length);
  }else{
    $(".num-wishlisted").html(0);
  	$('.js-wishlist-count').html(0);
  }
  faqQuestion();
  
//   if ($.cookie('compare')) {
//     var compare = $.cookie('compare').split(",");
//   	$('.js-compare-count').html(compare.length);
//   } else {
//     $('.js-compare-count').html(0);
//   }
  
  megamenuDisplay();
  
});

$( window ).resize(function() {
  megamenuDisplay();
});

function megamenuDisplay(){
   $('.header-megamenu .site-nav li.site-nav__item-mega').mouseenter(function(){
    $(this).addClass('nav__item-mega-active');
    if ($(window).width() > 767) {
      var l = $(window).width() - ($(this).find('.site-nav__dropdown').width() + $(this).offset().left) - 30;
      if ( l< 0) {
		$(this).find('.site-nav__dropdown').css('min-width', $(window).width());
        $(this).find('.site-nav__dropdown').css('margin-left', '-' + $(this).offset().left + 'px');
     //   $(this).find('.site-nav__dropdown').css('margin-left', l + 'px')
      }
    }    
  });
  $('.header-megamenu .site-nav li.site-nav__item-mega').mouseleave(function(){
    $(this).removeClass('nav__item-mega-active');
    $(this).find('.site-nav__dropdown').css('margin-left', 0);
    $(this).find('.site-nav__dropdown').css('min-width', 'unset');
  });
 
}

function faqQuestion() {
  $('.faq-question').click(function(){
    if ($(this).hasClass('collapsed')) {
      $('.faq-question').addClass('collapsed');
      $('.faq-answer').removeClass('show');
      $(this).removeClass('collapsed');
      $($(this).data('target')).addClass('show');
    } else {
      $('.faq-question').addClass('collapsed');
      $('.faq-answer').removeClass('show'); 
    }
  });
}

// Product-suggest
function productSuggest(){
  var $productSuggestClass = $('.product-notification'),
      $closeButtonClass = $('.close-notifi'),
      duration = $productSuggestClass.data('time') || 0,
      productSuggestCookie = 'cookieSuggest';

  function SomeonePurchased() {
    if ($.cookie(productSuggestCookie) == 'closed') {
      $productSuggestClass.remove();
    }
    $closeButtonClass.on('click',function(){
      $productSuggestClass.remove();
      $.cookie(productSuggestCookie, 'closed', {expires:1, path:'/'});
    });  
    function toggleSomething() {
      if($productSuggestClass.hasClass('active')){
        $productSuggestClass.removeClass('active')
      }
      else{
        var arrayProducts = $('.data-product'),
            randomProduct = Math.floor(Math.random() * arrayProducts.length),
            Object = $(arrayProducts[randomProduct]);

        $productSuggestClass.addClass('active');
        $productSuggestClass.find('.product-image').attr('href', Object.data('url')).find('img').attr('src', Object.data('image'));
        $productSuggestClass.find('.product-name').text(Object.data('title')).attr('href', Object.data('url'));
        $productSuggestClass.find('.time-ago').text(Object.data('time'));
        $productSuggestClass.find('.from-ago').text(Object.data('local'));
      }
    }

    if (duration !== 0){
      setInterval(toggleSomething, duration);
    }
  }
  SomeonePurchased();
}

theme.ajaxSearch = (function() {
  var $inputSearch = '#Search-In-Modal',
  $resultsList = '.search-results',
  $input = $($inputSearch).find('input[name="q"]'),
  $currentAjaxRequest,
  $displayProducts = 6;

  $($inputSearch).css('position', 'relative').each(function() {
    $($inputSearch).bind('keyup change', function() {
      var term = $(this).val(),
      form = $(this).closest('form'),
      searchURL = '/search?q='+term+'&options[prefix]=last';
      if (term.length > 2 && term !== $(this).attr('data-old-term')) {
        $(this).attr('data-old-term', term);
        if ($currentAjaxRequest !== undefined) $currentAjaxRequest.abort();
        $currentAjaxRequest = $.getJSON(searchURL + '&view=json', function(data) {
          $($resultsList).empty();

          if (data.results_count === 0) {
            $($resultsList).html(`<p class="text-center">${theme.strings.ajaxSearchNoResult}</p>`)
          } else {
            $.each(data.results, function(index, item) {
              if ($('.select-search-collection').val()) {
                if (item.collections.indexOf($('.select-search-collection').val()) >= 0 ) {
                  if (count < $displayProducts){
                    var itemPrice = Shopify.formatMoney(item.price, theme.moneyFormat);
                    var link = $(`<a class="d-inline-flex ${index}"></a>`)
                    .attr('href', item.url)
                    .append(`<span class="image"><img src="${item.thumbnail}" /></span>`)
                    .append(`<div class="meta"><p class="title">${item.title}</p>${itemPrice}</div>`)
                    .wrap(`<div class="ajax-search-item"></div>`);
                    $($resultsList).append(link.parent());
                  }
                }
                count++;
              } else {
                if (index < $displayProducts){
                  var itemPrice = Shopify.formatMoney(item.price, theme.moneyFormat);
                  var link = $(`<a class="d-inline-flex ${index}"></a>`)
                  .attr('href', item.url)
                  .append(`<span class="image"><img src="${item.thumbnail}" /></span>`)
                  .append(`<div class="meta"><p class="title">${item.title}</p>${itemPrice}</div>`)
                  .wrap(`<div class="ajax-search-item"></div>`);
                  $($resultsList).append(link.parent());
                }
              } 
            });
            updateCurrencies();
            if (data.results_count > $displayProducts) {
              $($resultsList).append(`<a class="btn btn--full" href="${searchURL}">${theme.strings.ajaxSearchViewAll} (${data.results_count})</a>`);
            }
          }
          $($resultsList).addClass('active').fadeIn(200);
        });
      }
    });
  });

  //escape when click somethings
  $(document).click(function(event) {
    var target = event.target;
    if (!$(target).is($inputSearch) && !$(target).parents().is($inputSearch)) {
      $($resultsList).slideUp(300);
    }
  });



// Menu

class StickyHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.header = document.getElementById('shopify-section-header');
    this.headerBounds = {};
    this.currentScrollTop = 0;

    this.onScrollHandler = this.onScroll.bind(this);

    window.addEventListener('scroll', this.onScrollHandler, false);

    this.createObserver();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  createObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
      this.headerBounds = entries[0].intersectionRect;
      observer.disconnect();
    });

    observer.observe(this.header);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      requestAnimationFrame(this.hide.bind(this));
    } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      requestAnimationFrame(this.reveal.bind(this));
    } else if (scrollTop <= this.headerBounds.top) {
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  hide() {
    this.header.classList.add('shopify-section-header-hidden', 'shopify-section-header-sticky');
    this.closeMenuDisclosure();
    this.closeSearchModal();
  }

  reveal() {
    this.header.classList.add('shopify-section-header-sticky', 'animate');
    this.header.classList.remove('shopify-section-header-hidden');
  }

  reset() {
    this.header.classList.remove('shopify-section-header-hidden', 'shopify-section-header-sticky', 'animate');
  }

  closeMenuDisclosure() {
    this.disclosures = this.disclosures || this.header.querySelectorAll('details-disclosure');
    this.disclosures.forEach(disclosure => disclosure.close());
  }

  closeSearchModal() {
    this.searchModal = this.searchModal || this.header.querySelector('details-modal');
    this.searchModal.close(false);
  }
}

customElements.define('sticky-header', StickyHeader);


})();


function toggleClassSearch(){
  document.getElementById("form-search-icon").classList.toggle("active");
}

function leo_create_instafeed() {
  if (typeof($('#instafeed').data('token')) != 'undefined' && !$('#instafeed').hasClass('slick-initialized')){
    var limit = 20;
    if (typeof($('#instafeed').data('limit')) != 'undefined') {
      limit = $('#instafeed').data('limit');
    }

    var feed = new Instafeed({
      accessToken: $('#instafeed').data('token'),
      limit: limit,


      template: '<a class="leo-instagram-size" target="_blank" href="{{link}}"><img title="{{caption}}" src="{{image}}"/></a>',


      transform: function(item) {
          var d = new Date(item.timestamp);
          item.date = [d.getDate(), d.getMonth(), d.getYear()].join('/');
          return item;
      },

              after: function() {

                                  // CASE : 2,3 images in one column
              var photos = [];
              $("#instafeed img").each(function() {
                                                  photos.push( $(this).parent().prop('outerHTML'));
              });
              $("#instafeed").html('');

              var itempercolumn = 1;

              var photos = array_chunk(photos,itempercolumn);
              var total_column = photos.length;

              for (i = 0; i < total_column; i++)
              {
                  if(i == 0){
                      var img_html = '<div class="item first">';
                  } else {
                      var img_html = '<div class="item">';
                  }

                  for(j=0; j<photos[i].length; j++)
                  {
                      img_html += '<div>';
                      img_html += photos[i][j];
                      img_html += '</div>';
                  }

                  $("#instafeed").html( $("#instafeed").html() + img_html );
              }
              initSlick($('#instafeed'));
            }
          });
      feed.run();
  }
}


var array_chunk = function(arr, chunkSize) {
  var groups = [], i;
  for (i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize));
  }
  return groups;
}
function displayCrossSell(){
  if (typeof($("#jsCrosssell").html()) != 'undefined') {
    $("#jsCrosssell").show(); 
    $("#jsCrosssell").addClass('show');
    $(".js-mini-cart-content").html($("#minicart .list-mimicart").clone(true));
    $(".js-mini-cart-right .js-cart-total").html($("#minicart .total_price").clone(true));
    $(".js-mini-cart-right .js-cart-count").html($("#cart-icon-bubble .cart-count-bubble .visually-hidden").clone(true));
  }
}
function closePopup(){
  $(".modal-header .close").click(function(){
  	$(this).closest('.modal').hide();
  });
  
}

function displayUpsell(){
  if (typeof($("#jsUpsell").html()) != 'undefined') {
    setTimeout(function() {
      $("#jsUpsell").show(); 
      $("#jsUpsell").addClass('show');
    },$("#jsUpsell").data('delay')); 
  }
}

function updateVariant(){
  $('product-form input[name="id"]').change(function(){
    var ids = $("#low-stock-block").data('ids').split(",");
    var qty = $("#low-stock-block").data('qty').split(",");
    for (i=0; i<ids.length; i++) {
      if($(this).val() == ids[i]){
        if (qty[i] > 10) qty[i] = 10;
        $("#low-stock-block .progress-bar").width(qty[i] + '0%');
        if (qty[i] == 0) {
          $("#low-stock-block").addClass('hide');
        }else{
          $("#low-stock-block").removeClass('hide');
        }
      }
    }
  });
}

// Product video
function productVideo(){
  let playButtonClass = '.js-play-button';
  $(document).on('click',playButtonClass,function(){
    let videoSelector = $(this).next(),
    videoObject = videoSelector.get(0);
    $(this).toggleClass('active');
    videoSelector.toggleClass('active');
    videoObject.paused ? videoObject.play() : videoObject.pause();
  })
}

function setSelectBoxDropdown(class_name){
	var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName(class_name);
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect); 
}

// Fake-viewers
theme.fakeViewer = (function(){
  let $fakeViewClass = $('.js-fake-view'),
  minValue = $fakeViewClass.data('min'),
  maxValue = $fakeViewClass.data('max'),
  duration = $fakeViewClass.data('duration');
  function randomInRange(start,end){
    let value = Math.floor(Math.random() * (end - start + 1) + start);
    $fakeViewClass.text(value);
  }

  if (minValue !== undefined && maxValue !== undefined){
    randomInRange(minValue,maxValue);
    setInterval(function() {
      randomInRange(minValue,maxValue);
    },duration);
  }

})();

// Back to top
theme.backToTop = (function(){
  let backtotopClass = $('.js-back-to-top');
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      backtotopClass.fadeIn('slow');
    } else {
      backtotopClass.fadeOut('slow');
    }
  });
  backtotopClass.on('click',function(){
    $('body,html').animate({scrollTop: 0}, 800);
  });
})();

// demo HTMl
theme.demoHTML = (function(){
  var buttonView = '.btn-html-view',
      buttonCopy = '.btn-html-copy',
      selectbox = '.js-html-select',
      codeBox = '#htmlCode-',
      viewBox = '#htmlView-',
      contentBox = '#htmlContent-';

  function reInitFunction(){
//    theme.countdown.load();
  }
  $(document).on('click',buttonView,function(){
    var blockID = $(this).data('id'),
        htmlValue =  $.parseHTML($(codeBox+blockID).val());
    $(viewBox+blockID).html(htmlValue);
    if ($(viewBox+blockID).find('.apslick').html() != 'undefined') {
      initSlick($(viewBox+blockID).find('.apslick'));
    }
    reInitFunction();
  }) 

  $(document).on('click',buttonCopy,function(){
    var blockID = $(this).data('id');
    $(codeBox+blockID).select();
    document.execCommand("copy");
    theme.alert.new('HTML builder','Successfully copied HTML code',2000);
  })

  $(document).on('change',selectbox,function(){
    var blockID = $(this).data('id');
    var selectValue = $(this).val();
    var htmlElement = '';
    if (selectValue !== ""){
      var classIcon = '.' + selectValue;
      if (blockID === 'Banner'){
        htmlElement = $('<div>').append($(contentBox+blockID).find(classIcon).parent().clone()).html();
      }else if (blockID === 'Divided'){
        htmlElement = $(contentBox+blockID).find(classIcon).clone().html();
      }else{
        $('.htmlContent-item.layout-carousel .ap-custom-slick').addClass('apslick');
        if (!$('#htmlView-Layout').find('.ap-custom-slick').hasClass('apslick')) {
          $('#htmlView-Layout').find('.ap-custom-slick').addClass('apslick');
        }
        htmlElement = $('<div>').append($(contentBox+blockID).find(classIcon).clone()).html();
        if(selectValue == 'layout-carousel'){
          console.log($("#htmlView-Layout").html());
        	initSlick($("#htmlView-Layout").find('.ap-custom-slick'));  
        }
      }
    }else{
      htmlElement = '';
    }
	
    if (selectValue == 'layout-carousel') {
      var str = '<div class="htmlContent-item layout-carousel">';
      str += '\n      <div class="carousel-inner slide-slick ap-custom-slick apslick" data-setting=\'{"accessibility": false, "arrows": true, "dots": true, "draggable": true, "infinite": true, "autoplay": false, "autoplaySpeed": 5000, "speed": 300, "slidesToShow": 1, "slidesToScroll": 1, "vertical": false, "mobileFirst": false, "pauseOnHover": false, "slidesPerRow": 1, "rtl": 1, "slidesToShow_992": 1, "slidesToScroll_992": 1, "arrows_992": true, "dots_992": false, "slidesToShow_767": 1, "slidesToScroll_767": 1, "arrows_767": true, "dots_767": false, "slidesToShow_450": 1, "slidesToScroll_450": 1, "arrows_450": true, "dots_450": false}\'>';
      str += '\n          <div>';
      str += '\n            <img class="d-block" src="https://cdn.shopify.com/s/files/1/0092/7563/7839/files/1.jpg?54890" alt="First slide">';
      str += '\n          </div>';
      str += '\n          <div>';
      str += '\n            <img class="d-block" src="https://cdn.shopify.com/s/files/1/0092/7563/7839/files/2.jpg?54890" alt="Second slide">';
      str += '\n          </div>';
      str += '\n          <div>';
      str += '\n            <img class="d-block" src="https://cdn.shopify.com/s/files/1/0092/7563/7839/files/3.jpg?54890" alt="Third slide">';
      str += '\n          </div>';
      str += '\n      </div>';
      str += '\n    </div>';
      $(codeBox+blockID).val(str);
    } else {
      $(codeBox+blockID).val(htmlElement);
    }
    
    $(viewBox+blockID).html(htmlElement);
    
    if (selectValue == 'layout-carousel') {
      initSlick($('#htmlView-Layout').find('.apslick'));
    }
    reInitFunction();
  }) 

})();

// Anchor scroll
theme.anchorScroll = (function(){
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    var disableAnchor = $(this).hasClass('disabled-anchor');
    if (!disableAnchor){
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
    }
  });
})()

function iconShow(){
  $(".divst-icon-builder button").click(function(){
    $(".growls-default").addClass('show');
    setTimeout(
    function(){
      $(".growls-default").removeClass('show');
    	}, 3000);
  }); 
};

