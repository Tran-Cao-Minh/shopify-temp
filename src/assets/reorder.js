$(() => {
   window.smartUnilever = window.smartUnilever ||  {}
   window.smartUnilever.reorder = {
      init: function () {
         this.bindReorder();
      },
      bindReorder: function () {
         $(document).on('click', '.reorder__btn', (event) => {
            let items = $(event.target).data('items');
            let orderName = $(event.target).data('order'),
                link = $(event.target).data('link');
            $('.reorder_description').html(themeSettings['description'].replace('{{ order }}', orderName).replace('{{ link }}', link));
            let invalidProducts = this.renderReorderProducts(items);
            this.renderInvalidReorder(invalidProducts);
         });

         $(document).on('change', '.qty__input', (e) => {
           let self = $(e.target),
               increase = self.next(),
               decrease = self.prev(),
               qtyInput = self,
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
           this.summarizeReorder();
         });

         $(document).on('click', '[data-action="remove__item"]', (e) => {
            let self = $(e.target),
                item = self.closest('.reorder__item');
            item.remove();
            this.summarizeReorder();
            if ($('.reorder__items').children().length === 0) {
               $('.reorder__items').html(themeSettings['not_found']);
               $('.summary').addClass('hide');
               $('.action__confirm-wrap').addClass('hide');
            }
         });

         $(document).on('click', '.add__to--cart', function () {
            // if(!confirm('Do you really want to reorder this order')) {
            //     return false;
            // }
            let qtyInputs = $('.reorder__items').find('.qty__input'),
                cartData = [];
            $.each(qtyInputs, (index, input) => {
               let cartItem = {
                 id: $(input).data('variant_id'),
                 quantity: $(input).val()
               };
               cartData.push(cartItem);
            });
            console.log(cartData);
            if (!cartData.length) {
               // alert('0 product found');
               return false;
            }
             window.showPopupCart = true;
            smartosc.doAjaxAddToCart(cartData, $('.error__container'));
            $('#reorder__modal').hide();
         });
         
         // Cancel
         $(document).on('click', '[data-reorder_cancel]', function () {
            $('#reorder__modal .close').trigger('click');
         });

      },

      renderInvalidReorder: function (invalidProducts) {
         let invalidHtml = '';
         $('.reorder__list-inactive').addClass('hide');

         if (invalidProducts.length > 0) {
            for(let invalidItem of invalidProducts) {
               let invalidTemplate = lodash.template($('#invalid-item-template').html());
               invalidHtml += invalidTemplate({invalidItem});
            }
            $('.reorder__list-inactive').removeClass('hide');
         }
         $('.reorder__invalid').html(invalidHtml);

      },

      renderReorderProducts: function (items) {
         let reorderHtml = '';
         let invalidProducts = [];
         for (let item of items) {
            if(!item.product) {
               invalidProducts.push({
                  item,
                  cause: 'unavailable'
               });
               continue;
            }

            let shopifyProduct = validProducts[item.product.product_id];
            let shopifyVariant;

            if(!shopifyProduct) {
               invalidProducts.push({
                  item,
                  cause: 'unavailable'
               });
               continue;
            }

            for (let variant of shopifyProduct.variants) {
               if(item.sku == variant.sku) {
                  shopifyVariant = variant;
                  break;
               }
            }

            if(!shopifyVariant) {
               invalidProducts.push({
                  item,
                  cause: 'unavailable'
               });
               continue;
            }

            let trackQty = false;
            if (shopifyVariant.inventory_quantity <= item.qty && shopifyVariant.inventory_policy == 'deny'
            && shopifyVariant.inventory_management) {
               if (shopifyVariant.inventory_quantity == 0) {
                   invalidProducts.push({
                     item,
                     cause: 'out_stock'
                  });
                   continue;
               }
               trackQty = true;
            }
            item.track_qty = trackQty;
            let reorderTemplate = lodash.template($('#reorder-template').html());

            reorderHtml += reorderTemplate({item, shopifyVariant, product: shopifyProduct});
         }

         if (reorderHtml === '') {
            reorderHtml = themeSettings['not_found'];
            $('.summary').addClass('hide');
            $('.action__confirm-wrap').addClass('hide');
         } else {
            $('.summary').removeClass('hide');
            $('.action__confirm-wrap').removeClass('hide');
         }

         $('.reorder__items').html(reorderHtml);
         this.summarizeReorder();
         return invalidProducts;
      },

      summarizeReorder: function () {
         let totalPayment = 0,
             totalCv = 0,
             totalQv = 0,
             totalQty = 0;
         $('.reorder__items').find('.reorder__item').each((i, elem) => {
            let qty = parseInt($(elem).find('.qty__input').val());
               totalCv += $(elem).data('cv') * qty;
               totalQv += $(elem).data('qv') * qty;
               totalPayment += $(elem).data('price') * qty;
               totalQty += qty;
         });
         $('#summary-total_price').html(theme.Currency.formatMoney(totalPayment, theme.moneyFormat));
         $('#summary-total_cv-qv').html(`${totalCv} | ${totalQv}`);
         $('#summary-total_qty').html(totalQty);
      },
   }

   smartUnilever.reorder.init();
})
