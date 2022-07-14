$(function () {
   // Product detail
   if (typeof product_detail_json !== 'undefined') {
      let productDetail = lodash.template($('#productDetailTemplate').html());
      let product = product_detail_json;
      $('#product-single').html(productDetail({ product }));

      $(".product-single form.product-form").submit(function(e) {
         //prevent Default functionality

      });

      // Sticky button
      $('.box__toolbar--mobile').addClass('hide');

      smartosc.prdDetail();

      smartosc.recordRecentlyViewed();

      smartosc.showRecentlyViewed();

      smartosc.relatedProduct();

      smartosc.recommendationsProduct();

      smartosc.articleRelated();

   }

   // Product promotion
   if (typeof listPromotionProduct !== 'undefined') {
      smartosc.promotionProduct();
   }

});

// Product detail
//
smartosc.prdDetail = function () {
   var productDetail = {
      init: function () {

         // Slide product
         if ($('[data-product-gallery-thumbnail]').length > 0) {
            this.renderSlider();
         }

         smartosc.swatchChange();

         this.productSelector();

         if ($('[data-image-zoom-wrapper]').length > 0 && $(window).width() > 767) {
            this.enableZoom();
         }

         smartosc.tabsCustom();

      },
      renderSlider: function () {
         getDirection = 'horizontal';

         let buttonNext = $('.product__thumbnails-wrap').find('.swiper-button-next'),
            buttonPrev = $('.product__thumbnails-wrap').find('.swiper-button-prev');
         let galleryThumbs = new Swiper('.product-single [data-product-gallery-thumbnail]', {
            spaceBetween: 20,
            slidesPerView: 3,
            // autoHeight: true,
            direction: getDirection,
            navigation: {
               nextEl: buttonNext,
               prevEl: buttonPrev
            },
            breakpoints: {
              // when window width is >= 320px
              320: {
                slidesPerView: 4,
                spaceBetween: 11
              },
              780: {
                slidesPerView: 3
              },
            }
         }
         );

         window.slideThumbsProduct = galleryThumbs;

         let galleryMain = new Swiper('.product-single [data-product-gallery-main]', {
            spaceBetween: 0,
            autoHeight: true,
            slidesPerView: 1,
            effect: 'fade',
            // speed: 4000,
            direction: getDirection,
            pagination: {
              el: $('[data-product-gallery-main]').find('.swiper-pagination'),
              clickable: true
            },
            thumbs: {
               swiper: galleryThumbs
            }
         });

         window.slideMainProduct = galleryMain;

      },
      enableZoom: function () {
         $('[data-image-zoom-wrapper]').each(function () {
            var zoomUrl = $(this).data('zoom');
            $(this).zoom({
               url: zoomUrl
            });
         });
      },
      productSelector: function () {
         if ($('.product-single__json').length > 0) {
            let productJSON = $('.product-single__json').data('json'),
               productSelect = 'product-selectors';
            if (productJSON) {
               new Shopify.OptionSelectors(productSelect, {
                  product: productJSON,
                  onVariantSelected: selectCallbackDetail,
                  enableHistoryState: true,
               });

               let elDetail = $('.product-single');
               Shopify.linkOptionSelectors(productJSON, elDetail); // support swatch color

            }
         }
      }
   };

   productDetail.init();

};

// Product recently viewed
//
smartosc.readRecentlyViewed = function (cookieName) {

   // Read cookie.
   let recentlyViewed = [];
   let cookieValue = smartGetCookie(cookieName);

   if (cookieValue) {
      recentlyViewed = cookieValue.split(' ');
   }

   return recentlyViewed;

}

smartosc.recordRecentlyViewed = function () {

   // Config
   let howManyToStoreInMemory = 50;
   let cookieName = 'unilever_recently_viewed';

   // Read cookie.
   let recentlyViewed = smartosc.readRecentlyViewed(cookieName);

   // Get ID product
   let productID = $('#product-single').data('id_product');

   productID = productID.toString();

   // In what position is that product in memory.
   var position = $.inArray(productID, recentlyViewed);

   // If not in memory.
   if (position === -1) {
      // Add product at the start of the list.
      recentlyViewed.unshift(productID);
      // Only keep what we need.
      recentlyViewed = recentlyViewed.splice(0, howManyToStoreInMemory);
   }
   else {
      // Remove the product and place it at start of list.
      recentlyViewed.splice(position, 1);
      recentlyViewed.unshift(productID);
   }

   // Update cookie.
   smartSetCookie(cookieName, recentlyViewed.join(' '), 90);

}

smartosc.showRecentlyViewed = function () {
   // Read cookie.
   let cookieName = 'unilever_recently_viewed';
   let recentlyViewed = smartosc.readRecentlyViewed(cookieName);
   let arrProductViewed = [];

   // Get ID product
   let productID = $('#product-single').data('id_product');
   productID = productID.toString();

   // Remove curent product
   if( recentlyViewed.includes(productID) ) {
      recentlyViewed.splice( $.inArray(productID, recentlyViewed), 1 );
   }

   // Update arr product viewed
   if( recentlyViewed.length > 0 && unileverAllProduct ) {

      for( let i = 0; i < recentlyViewed.length; i++ ) {
         let recentlyID = parseInt(recentlyViewed[i]);

         if(unileverAllProduct[recentlyID]) {
            let itemProduct = unileverAllProduct[recentlyID];
            arrProductViewed.push(itemProduct);
         }
      }

      // console.log(arrProductViewed);

   }

   // Render product
   if( arrProductViewed.length > 0 ) {

      let productHTML = '';
      for( let i = 0; i < arrProductViewed.length; i++ ) {

         let product = arrProductViewed[i];
         let productlist = lodash.template($('#recentlyViewedProducts').html());
         productHTML += productlist({product});

         if (i == 7) {
            break;
         }

      }

      $('#listsRecentlyViewed').html(productHTML);
      smartosc.ssSlider('[data-slide_viewed]');
      $('#recently-viewed-products').removeClass('hide');

      // Update vote
      if (window.SPR) {
         SPR.initDomEls();
         SPR.loadBadges();
      }

      smartosc.swatchChangeProductsList();

   }else {
      $('.recently__viewed-products').addClass('hide');
   }
}

// End product recently viewed

// Product related
//
smartosc.relatedProduct = function () {

   if ( typeof list_related_products !== 'undefined' ) {

      let productHTML = '';

      if (list_related_products.length > 0) {

         for( let i = 0; i < list_related_products.length; i++ ) {

            let product = list_related_products[i];
            let productlist = lodash.template($('#relatedProductTemplate').html());
            productHTML += productlist({product});

         }

         $('#listsRelatedProduct').html(productHTML);
         smartosc.ssSlider('[data-slide_related]');
         $('.product__lists-related').removeClass('hide');

         // Update vote
         if (window.SPR) {
            SPR.initDomEls();
            SPR.loadBadges();
         }

         smartosc.swatchChangeProductsList();
      }else {
         if ($('#listsRelatedProduct').length > 0) {
            $('#listsRelatedProduct').parents('.index-section').addClass('hide');
         }
      }

   }

}

// End product related

// Product related
//
smartosc.recommendationsProduct = function () {
   if ( $('#product-recommendations').length > 0 ) {
      let elRecommendations = $('#product-recommendations'),
         baseUrl = elRecommendations.data('baseUrl'),
         productId = elRecommendations.data('productId');

      let recommendationsSectionUrl =
         baseUrl +
         '?section_id=product-recommendations&product_id=' +
         productId +
         '&limit=100';

      $.get(recommendationsSectionUrl).then(
         function(section) {
            var recommendationsMarkup = $(section).html();
            if (recommendationsMarkup.trim() !== '') {
               elRecommendations.html(recommendationsMarkup);

               // slide
               smartosc.ssSlider('[data-slide_recommendations]');

               // Update vote
               if (window.SPR) {
                  SPR.initDomEls();
                  SPR.loadBadges();
               }

               if ( $('#product-recommendations .product-card__json').length > 0 ) {
                  smartosc.swatchChangeProductsList();
               }
            }

         }.bind(this)
      );
   }
};

// Blog article related
//
smartosc.articleRelated = function () {
   if ( $('.product-single_article-related .swiper-slide').length > 0 ) {
      // slide
      smartosc.ssSlider('[data-slide_related_article]');
   }
}

// Promotion render product
smartosc.promotionProduct = function () {
   let elPromotionProduct = $('[data-promotion__product]');
   if (elPromotionProduct.length > 0) {
      var promotionProduct = {
         init: function () {
            elPromotionProduct.each(function () {
               let self = $(this);
               let idProduct = self.data('id_product'),
                  idBlock = self.data('id_block');
               let elProductWrap = self.find('[data-product_wrap]');
               if (idProduct && listPromotionProduct[idProduct]) {
                  let productDetail = lodash.template($('#productDetailTemplate').html());
                  let product = listPromotionProduct[idProduct];
                  product['block_id'] = idBlock;
                  elProductWrap.html(productDetail({ product }));

                  promotionProduct.productSelector(self, idProduct, idBlock);

               }
            });
         },
         productSelector: function (self, idProduct, idBlock) {
            if (self.find('.product-form__swatch').length > 0) {
               let productJSON = listPromotionProduct[idProduct],
                  productSelect = `product-selectors-${idBlock}-${idProduct}`;
               if (productJSON) {
                  new Shopify.OptionSelectors(productSelect, {
                     product: productJSON,
                     onVariantSelected: selectCallbackDetail,
                     enableHistoryState: false,
                  });
                  Shopify.linkOptionSelectors(productJSON, self); // support swatch color
               }
            }
         }
      };
      promotionProduct.init();
      $(".product-single form.product-form").submit(function(e){
         e.preventDefault();
      });
      smartosc.swatchChange();
   }
}

$(document).on('shopify:section:load', function (e) {
   if (e.target.className.includes('ss-promotion')) {
       smartosc.promotionProduct();
   }
});
