$(function () {

   // filter preriod
   $(document).on('change', '#filter_preriod', function () {
      let val = $(this).val();
      document.location.href = `${window.location.origin}${val}`;
   });

   if ((typeof collection_products !== 'undefined') && collection_products.length > 0) {

      // get pageNumber
      let currentPage = 1,
         sttCollectionLoad = true;

      const queryString = window.location.search,
            urlParams = new URLSearchParams(queryString),
            getPageNumber = urlParams.get('pages'),
            sortBy = urlParams.get('sort_by'),
            limitNew = urlParams.get('limit');

      const shareChannel = urlParams.get('channel'),
            sharePromoCode = urlParams.get('promo_code'),
            SSOOrigin = urlParams.get('origin');

      getPageNumber ? currentPage = getPageNumber : currentPage = 1;

      // get limit products
      let pageLimit = $('.pagination-container').data('limit');

      if (limitNew) {
         // Update pagination show more
         $('#select_show_more').val(limitNew);
         $('#select_show_more').select2({
            minimumResultsForSearch: Infinity
         });

         pageLimit = limitNew;
      }

      if (collection_products.length <= pageLimit) {
         $('.pagination-container').hide();
      }

      $('.pagination-container').pagination({
         dataSource: collection_products,
         prevText: theme.strings.paginationPrev,
         nextText: theme.strings.paginationNext,
         pageNumber: currentPage,
         pageRange: 1,
         pageSize: pageLimit,
         callback: function (data, pagination) {
            // Update URL
            let urlState = '';

            if (pagination.pageNumber > 1) {
               urlState += '&pages=' + pagination.pageNumber;
            }else {
               urlState = '';
            }

            if (limitNew) {
               urlState += '&limit=' + limitNew;
            }
            if (sortBy) {
               urlState += '&sort_by=' + sortBy;
            }
            if (shareChannel) {
               urlState += '&channel=' + shareChannel;
            }
            if (sharePromoCode) {
               urlState += '&promo_code=' + sharePromoCode;
            }
            if (SSOOrigin) {
               urlState += '&origin=' + SSOOrigin;
            }

            if (urlState != '') {
               urlState = urlState.replace('&','?');
            }

            if (urlState != '') {
               history.pushState({}, '', urlState);
            }else {
               window.history.replaceState({}, '', location.pathname);
            }

            // Render HTML product
            let productHTML = '';
            for (let i = 0; i < data.length; i++) {
               let product = data[i];
               let productlist = lodash.template($('#productListScript').html());

               productHTML += productlist({ product });
            }

            $('#product_lists').html(productHTML);
            $('.loader').addClass('hide');
            $('.product_lists').removeClass('hide');

            if (sttCollectionLoad) {
               sttCollectionLoad = false;
            }else {
               $('html, body').animate({scrollTop: $('.product_lists').offset().top - 50,},1000);
            }

            // Update vote
            if (window.SPR) {
               SPR.initDomEls();
               SPR.loadBadges();
            }

            //Product Listing Impressions Call function SDR_ULife
            for (let i = 0; i < data.length; i++) {
               let product = data[i];
               digitalData.product.push({
                  'productInfo': {
                     'productID': product.id,
                     'productName': product.title,
                     'brand': product.brand
                  },
                  'attributes': {
                     'listPosition': 'LIST POSITION'
                  }
               });
            }

            //console.log(digitalData.product);
            /* digitalData.component.push({'componentInfo' :{
                  'componentID':COMPONENT NAME
               },

               'attributes':
                   {
                      'position':VARIANT,
                      'listPosition':LIST POSITION
                   }
            }});
            */
            var ev = {};
            ev.eventInfo={
               'type':ctConstants.productImpression
            };

            ev.category ={'primaryCategory':ctConstants.custom};
            ev.attributes={'nonInteractive':{'nonInteraction': 1}};
            ev.subcategory = 'Lead';
            digitalData.event.push(ev);


            //Product Listing Click Call function SDR_ULife
             $('.product_lists .product-card').click(function (event) {
                 //event.preventDefault();
                 dataProduct = $(this).find('.product-card__json').data('json');


                 digitalData.product.push({
                     'productInfo' :{
                         'productID':dataProduct.id,
                         'productName':dataProduct.title,
                         'price': dataProduct.price,
                         'brand':dataProduct.brand
                     },
                     'category':dataProduct.collections,
                     'attributes':
                         {
                             'productVariants':'VARIANT',
                             'listPosition':'LIST POSITION'
                         }
                 });
                 //console.log(dataProduct.collections);
                // console.log(digitalData.product);

                 var ev = {};
                 ev.eventInfo = {
                     'type':ctConstants.productclick,
                 };

                 ev.subcategory = 'Interest';
                 digitalData.event.push(ev);

             });

            smartosc.swatchChangeProductsList();

         }
      });

      // on change limit
      $(document).on('change', '#select_show_more', function () {
         let val = $(this).val();
         let url = window.location.href.split('?')[0];
         if (sortBy) {
            document.location.href = `${url}?sort_by=${sortBy}&limit=${val}`;
         }else {
            document.location.href = `${url}?limit=${val}`;
         }
      });

      // Button back to load page
      $(window).on('popstate', function (e) {
         location.reload();
      });
      $('.pagination-wrap').removeClass('hide');
   } else {
      $('.collection__no-matches').removeClass('hide');
      $('.loader').addClass('hide');
   }

   // autoship hover hide quickview
   $(".product-form__cart").mouseenter(function() {
      $(this).parents('.product-card__autoship').addClass('hide_quickview');
   }).mouseleave(function() {
      $(this).parents('.product-card__autoship').removeClass('hide_quickview');
   });

});
