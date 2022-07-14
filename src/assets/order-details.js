$(() => {
   const urlParams = new URLSearchParams(window.location.search);
   let orderId = urlParams.get('order_id'),
       cycle = urlParams.get('cycle'),
       loading = $('#orders__details-loading'),
       url = `/apps/eai/api/orders/details/${orderId}`;

   window.smartUnilever = window.smartUnilever || {};
   window.smartUnilever.orderDetails = {
      init: function () {
         loading.hide();
         this.fetchOrder();
      },

      fetchOrder: function () {
         $.ajax({
            url: url,
            data: {
               customer: window.eai_customer
            },
            beforeSend: () => {
               loading.show();
            },
            success: (result, status, xhr) => {
               if (result.type === 'regular') {
                  this.renderRegular(result.order.data[0])
               } else {
                  this.renderAutoship(result.autoship.data[0])
               }
            },
            error: (xhr) => {
               console.error(xhr.responseText);
               // window.location.href = '/';
            },
            complete: () => {
               loading.hide();
            }
         });
      },

      renderRegular: function (order) {
         let orderHtml = '';
         let orderTemplate = lodash.template($('#order-details-template').html());
            if(order) {
              orderHtml += orderTemplate({order});
            }
         $('.template__render').html(orderHtml);
      },

      renderAutoship: function(autoship) {
         cycle = cycle ? parseInt(cycle) : 0;
         window.cycle = cycle;
         if (typeof autoship.orders[cycle] != "undefined") {
            let cycleOrders = autoship.orders[cycle];
            autoship.parent_order.shipping_status = cycleOrders.status;
            autoship.parent_order.payment_method = cycleOrders.cycle_orders[0].payment_method;
         }

         this.renderRegular(autoship.parent_order);
      },
   };

   smartUnilever.orderDetails.init();
});
