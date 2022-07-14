$(() => {
   window.smartUnilever = window.smartUnilever || {};
   const urlParams = new URLSearchParams(window.location.search);

   // smartUnilever.orderTracking.init();
   let formTracking = $('#order__tracking--form'),
      btnLoading = formTracking.find('.loader'),
      trackingResult = $('.order__tracking--result'),
      inputOrderId = formTracking.find('input.order__id'),
      inputContact = formTracking.find('input.contact'),
      trackOrderUrl = '/apps/eai/api/orders/tracking',
      orderInit = urlParams.get('order'),
      contactInit = urlParams.get('contact');

   smartUnilever.trackOrder = function (orderId, contact) {
      $.ajax({
         url: trackOrderUrl,
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({
            order_id: orderId,
            contact: contact
         }),
         beforeSend: () => {
            btnLoading.show();
            trackingResult.hide();
         },
         success: (result) => {
            let elLabel = $('.tracking__label'),
               elStatus = $('.order__status'),
               elTrackingUrl = $('.tracking__url'),
               elInputOrder = $('#order_id');

            if(result.code === 404) {
               let orderText = orderStatusMessages.order_id.replace('[order_id]', result.order_id);
               elLabel.html(orderText);
               elStatus.addClass('message__error');
               elStatus.html(orderStatusMessages.not_found);
               elInputOrder.removeClass('valid');
               elInputOrder.addClass('error');
               elTrackingUrl.html('');
            } else {
            elLabel.html(orderStatusMessages.order_id.replace('[order_id]', result.order_id));
               if (!result.autoship) {
                  elStatus.html(orderStatusMessages[result.status]);
                  if(result.status == 'canceled' || result.status == 'pending'){
                     elStatus.addClass('message__error');
                  } else {
                     elStatus.removeClass('message__error');
                  }
                  if((result.status == 'shipped'||result.status == 'partial_shipped') && result.tracking_url){
                     let trackingUrl = '';
                     if (typeof result.tracking_url === 'object') {
                        let urls = [];
                        $.each(result.tracking_url, (name, url) => {
                           urls.push(orderStatusMessages.tracking_url_with_name.replace('[url]', url).replace('[name]', name));
                        })
                        trackingUrl = urls.join(', ');
                     } else {
                        trackingUrl = orderStatusMessages.tracking_url.replace('[url]', result.tracking_url);
                     }
                     elTrackingUrl.html(trackingUrl + orderStatusMessages.tracking_end);
                  }else{
                     elTrackingUrl.html('');
                  }
               } else {
                  let childrenArr = [];
                  result.children.forEach(children => {
                     childrenArr.push(`<a href="/pages/order-tracking?order=${children}&contact=${result.contact}">${children}</a>`)
                  })

                  let status = orderStatusMessages[`autoship_${result.status}`];
                  elStatus.html(
                     orderStatusMessages.autoship_result.
                     replace('[status]', status).
                     replace('[children]', childrenArr.length ? childrenArr.join(', ') : '')
                  );
               }
            }
            btnLoading.hide();
            trackingResult.show();
         },
         error: (xhr) => {
            let errorsResponse = xhr.responseJSON;
            if(errorsResponse && errorsResponse.error) {
               let errors = errorsResponse.error;
               $.each(errors, (key, error) => {
                  let elError = $(`.${key}--error`),
                      errorHtml = '<ul>';
                  for (let i in error) {
                     errorHtml += `<li><label class="error-label">${error[i]}</label></li>`
                  }
                  errorHtml += '</ul>';
                  elError.html(errorHtml);
                  elError.show();
               });
            } else {
               alert('Something wrong!')
            }
            btnLoading.hide();
         }
      });
   }

   inputOrderId.on('keyup',function(){
      $('.order_id--error').html('');
   });
   inputContact.on('keyup',function(){
      $('.contact--error').html('');
   });

   formTracking.validate({
      submitHandler: function (form) {
         let orderId = inputOrderId.val(),
            contact = inputContact.val();

         smartUnilever.trackOrder(orderId, contact);
      }
   });

   if(orderInit && contactInit) {
      inputOrderId.val(orderInit);
      inputContact.val(contactInit);
      smartUnilever.trackOrder(orderInit, contactInit)
   }
});
