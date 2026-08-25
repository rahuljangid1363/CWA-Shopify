class quickview extends HTMLElement {
  constructor() {
    super();
	this.addEventListener('click', (event) => {
      this.show(this);
    });
  }

  show(evt) {
    var url = '/products/' + this.getAttribute("data-handle");
    $.ajax({
        type: 'GET',
        url:  url + '?view=quickview',
        data: {},
        beforeSend: function() {
        	
        },
        complete: function(data) {
          $(".quick-view-body").html($(".quickview-row", data.responseText).html());
          $(".quick-view-body").find(".view-product-quickview").find('a').attr('href', url);
          $("#jsQuickview").addClass('show');
          $("#jsQuickview").show();
          $("#qv-product-images").slick();
          updateCurrencies();
          document.querySelector('product-quickview').init();
        },
        error: function(xhr, text) {
          alert($.parseJSON(xhr.responseText).description);
        }
      });
  }
  
  init() {
    $("#jsQuickview .btn-close").click(function(){
    	$("#jsQuickview").removeClass('show');
        $("#jsQuickview").hide();
        $("#qv-product-images").slick('unslick');
    });
    
    $(document).click(function (e)
    {
        var container = $("#jsQuickview .modal-content");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $("#jsQuickview .btn-close").trigger('click');
        }
    });
    
  }
    
}
customElements.define('product-quickview', quickview);