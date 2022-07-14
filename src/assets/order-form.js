$(function () {
  window.smartUnilever = window.smartUnilever || {};
  let searchAPI = '/apps/eai/api/multilingual/order-form-search'
  let listProduct;
  let elLoading = $('#product__list-loading');
  let timeout;
  smartUnilever.quickOrderForm = {
    keyword: '',
    collection: null,
    //search product
    search: function (url) {
      url = url ?? searchAPI;
      let perPage =  $('#select_show_more').val() || 10 ,
          noFoundProductElm = $('.no__product--found');

      $.ajax({
        url: url,
        data: {
          collection: this.collection,
          group: window.customer_title,
          q: this.keyword,
          locale: locale,
          per_page: perPage
        },
        beforeSend: function () {
          //Show loading when search
          elLoading.addClass('content__loading');
          $('.content__loading').show();
          $('.list__content').hide();
          noFoundProductElm.hide();
          $('.pagination_result-wrap').html('');
        },
        success: (result) => {
          // let products = smartUnilever.quickOrderForm.transform(result.data);

          let products = result.data;
          if(this.keyword) {
            $('.search__result').html(orderFormLocale.search_result.replace('[search]', this.keyword));
          } else {
            $('.search__result').html('');
          }
          //Hide loading
          elLoading.removeClass('content__loading');
          elLoading.hide();
          $('.list__content').show();
          if (result.total) {
            $('.pagination-wrap').show();
            $('.left__section--header').show();
            noFoundProductElm.hide();
            //Render product to view
            smartUnilever.quickOrderForm.renderProductList(products);
            //If total product > 10 => Call function render pagination
            let total = result.total,
                currentPage = result.current_page,
                perPage = result.per_page;
            if (total > perPage) {
              smartUnilever.quickOrderForm.renderPagination(
                total,
                currentPage,
                perPage
              );
            } else {
              $('.pagination_result-wrap').html('');
            }
          } else {
            $('.pagination-wrap').hide();
            $('.left__section--header').hide();
            $('.list__content').hide();
            let noFoundProductMess = orderFormLocale.not_found;
            let noFoundProductDesc = orderFormLocale.not_found_desc;
            noFoundProductElm.show();
            noFoundProductElm.find(".not-found__title").text(noFoundProductMess);
            noFoundProductElm.find(".not-found__desc").text(noFoundProductDesc);
            $('.pagination_result-wrap').html('');
          }
          listProduct = products;
          return listProduct;
        },
      });
    },

    //Render products to view after search
    renderProductList: function (products) {
      let productHTML = '';
      if(products.length){
        for (let i in products) {
            let product = productsList[products[i].product_id];
            let productList = lodash.template($('#product-template').html());
            if(product) {
              productHTML += productList({product});
            }
        }
      }else{
        productHTML += orderFormLocale.empty_bag;
      }
      $('.list__content').html(productHTML);

      if ($('.spr-badge').length > 0 && window.SPR) {
        SPR.initDomEls();
        SPR.loadBadges();
      }
      smartosc.swatchChangeProductsList();
      window.smFillWishlist(window.wishlistItems, 'wishlist');
    },

    //Update product quantity in cart everytime quantity input in cart change

    //Delay for search on keyup
    delay: function (callback, ms) {
      let timer = 0;
      return function () {
        let context = this,
          args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, ms || 0);
      };
    },

    //Render pagination of product list after search
    renderPagination: function (total, currentPage, perPage) {
      let vWidth = window.innerWidth;
      $('.pagination_result-wrap').simplePagination({
        items: total,
        itemsOnPage: perPage,
        prevText: theme.strings.paginationPrev,
        nextText: theme.strings.paginationNext,
        currentPage: currentPage,
        hrefTextPrefix: '?page-',
        displayedPages: 3,
        edges: 1,
        onPageClick: function (pageNumber, event) {
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: $('.content__header').offset().top - 50,
            },
            1000
          );
          // Page number is given as an optional parameter
          let urlSearch = `${searchAPI}?page=${pageNumber}`;
          smartUnilever.quickOrderForm.search(urlSearch);
        },
      });
    },

    //Render progress bar based on price and milestones
    renderPriceProgressBar: function (milestone, price) {
      let width = (price / milestone) * 100;

      if (milestone >= price) {
        $('.scrollbar').css('width', width + '%');
        $('.inform').html(
          theme.strings.unReachMilestone1 +
            theme.Currency.formatMoney(milestone - price, theme.moneyFormat) +
            theme.strings.unReachMilestone2
        );
      } else {
        $('.inform').html(theme.strings.reachMilestone);
        $('.scrollbar').css('width', 'calc(100% - 16px)');
      }
    },

    loadSidebarSection: function () {
      return $.ajax({
        url: this.url('/?section_id=order-form-sidebar'),
        type: 'GET',
        success: (response) => {
          $('.order__form--summary').html(response);
          if($('.product__items',response).length) $('.page-container').addClass('hide---toolbar');
          if($('.cart__no-item',response).length)  $('.page-container').removeClass('hide---toolbar');
          // smartosc.updateAjaxQtyCart();
        },
        error: () => {
        }
      });
    },


    bindSearch: function ()  {
      $(document).on('change', '[data-action="change-category"]', (e) => {
          let elem = $(e.currentTarget);
          this.collection = elem.val();
          this.search()
        }
      );

      $(document).on('change', '#select_show_more', () => {
        this.search()
      })

      // Search products when enter on search box
      $(document).on('keyup', '[data-action="search"]', (e) => {
          let elem = $(e.currentTarget);
          this.keyword = elem.val();
          if (timeout) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(() => { this.search() }, 250);
        }
      );
    },

    // Add product to cart
    bindCartEvent: function () {
     document.addEventListener('cart:update', (response) => {
        if (response.detail.hasOwnProperty('items')) {
          $.each(response.detail.items, (i, res) => {
          $(`.input__qty[data-variant_id="${res.id}"]`).val(1);
        });
        }
        this.loadSidebarSection();
     });

     document.addEventListener('cart:add', (response) => {
        this.loadSidebarSection();
      });

     document.addEventListener('cart:remove', (response) => {
        this.loadSidebarSection();
     });
    },

    //Increase and decrease quantity button
    bindQtyButton: function () {
      $(document).on('click', '.cart__list .btn__qty, .cart__list .cart__remove-item', function () {
        $("[data-container='loader']").show();
      });
      $(document).on('change', '.order__lists input[type="number"]', function () {
        let increase = $(this).next(),
            decrease = $(this).prev(),
            qtyInput = $(this),
            inventoryPolicy = qtyInput.data('inventory_policy'),
            inventoryManagement = qtyInput.data('inventory_management');

        if (qtyInput.val() >= qtyInput.data('inventory_quantity') && inventoryPolicy == 'deny' && inventoryManagement) {
            qtyInput.val(qtyInput.data('inventory_quantity'));
            increase.addClass('disabled');
        } else {
           increase.removeClass('disabled');
        }

        if (qtyInput.val() > 1) {
           decrease.removeClass('disabled');
        } else {
           qtyInput.val(1);
           decrease.addClass('disabled');
        }
        $('.qty__box').removeClass('disabled');
      });
    },

    url: function (url) {
      return window.locale === 'th' ? '/th' + url : url;
    },

    bind: function () {
      this.bindQtyButton();
      this.bindSearch();
      this.bindCartEvent();
    },

     //Init
    init: function () {
      this.search();
      this.bind();
      window.showPopupCart = false;
    },
  };
  smartUnilever.quickOrderForm.init();
});
