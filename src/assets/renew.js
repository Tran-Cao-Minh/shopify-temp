$(() => {
   window.smartUnilever = window.smartUnilever || {};
    const activeListElem = '[data-renew="renew__items--listing"]',
         renewProductOptions = '[data-renew="renew__options"]',
         inactiveListElem = '[data-renew="invalid__products"]';
   let creditCardIcons = {
      visa: `<svg class="icon-visa" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44" height="26" viewBox="0 0 44 26">
              <defs>
                  <pattern id="pattern_visa" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 61 23">
                  <image width="61" height="23" xlink:href="data:image/png;base64,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"/>
                  </pattern>
              </defs>
              <g data-name="Group 1430" transform="translate(-569 -732)">
                  <g data-name="Rectangle 749" transform="translate(569 732)" fill="#fff" stroke="#707070" stroke-width="0.5">
                  <rect width="44" height="26" stroke="none"/>
                  <rect x="0.25" y="0.25" width="43.5" height="25.5" fill="none"/>
                  </g>
                  <rect data-name="Image 3" width="42" height="16" transform="translate(570 737)" fill="url(#pattern_visa)"/>
              </g>
            </svg>`,
      master_card: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44" height="26" viewBox="0 0 44 26">
                                            <g data-name="Group 1429" transform="translate(-569 -785)">
                                                <g data-name="Rectangle 750" transform="translate(569 785)" fill="#fff" stroke="#707070" stroke-width="0.5">
                                                <rect width="44" height="26" stroke="none"/>
                                                <rect x="0.25" y="0.25" width="43.5" height="25.5" fill="none"/>
                                                </g>
                                                <image data-name="Image 2" width="42" height="20.656" transform="translate(570 788)" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAeCAYAAACfWhZxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVjSURBVFhH7VhbiFVVGP72dc7suTg2421Sx7TUsslAkyyxREkSCcSnLtZDIRQkRkQUJL1V9BAIIfVSQvRW0EOglt1U9EGtGIxknCbHcdJxrud4Zp+zz9579f1ztkFTzux1zvQg9sG5rLX2unzr+/9//WsbisBNBjP5vanwnygtAyrfhyqFMLwMTNspN6SAigIgKlAOB4Zdm9ROL6aNdJTNwf/yIEoHv0fU8SvU5UEgjIC6WpgL58G+fxWcxzajdu19MJI+Apk8/OMY4p5DUFd+BsYukbgPg6SRaYYxczmM+RtgL3yEm+eVO1WJqklHUYz8e/tQ3PsB4gudJCSUavhtlx9ATGIl/gb89WBtXA9vz+vIrF+DqO8HRCffhrp0nAMVYVjuuMJc1nhPxOF4vZJi0zJY7S/AWfHc3zatElRFOui+gNEdOxEfO8zg0MCaqcxRNiDLTxMa36LiC04A+THAZl9jCirhGN0lDyzaAufhfbC9OUmDPiomHZztwsimbVC9nSTcnNRODUWdGtddQebWIsJFHsIVLVQzLtt5GhQGoJrb4W75HFb9/KRSDxVF73A0i9GtTwK9XRyAi06JmITr12SRaS/SX+kA58dgnRuh0hrLyMyCMXgGwVfP0Pr9pFIPFZHO7X4T8bnTpHALS+kkUpyqprUAb2UO8BNTdkn8tyxJMFqnJs75JMD1HUHp1DtJnR60SRd+7EDw8X52FJPW8AxDoW41CUufa93I3aBlC3FoeVmZeHzmQ1pdV1KXHtqk/ff385sB5a/oPDXEj925RThzaNbBhIDlGDCHGLlH2GZpxGWJ8oUhRGc/TSrSQ4t0XCggPPAtO9WzpKMMSbdJwpEUJ8CIaPwD0q5BWrbS8aAuHKaRMB/QgBbpsLMb8cWL/MfzVAsKTrNkWklxIrgKM8v2WGcjCasGKvc74quypvTQU7q3j98SMXUUYbpixTA9Mqb//itkuCIbqbjW0LCA0lUoZnE60CKtfPrddVd+fRgMYhLIJgMTBj2PEcgG0bQNZm060CJtNNRzHu6uFhRUzNVFnGoyFcWftVZDyCaZNpRdVy6nhNY01m3MgEyZQE9tFZuI8tys680mItfyNLD4gI7aEsDcGTDqW5OKdNAk3Qbz9sX8p2dOInGpXy4TSXEiuIfxDLZr+TMht7GmpYwXenm4FmnTsuBse5RrlHNaZ4UKwXleRkL2mdhNVOZZHbdkyFxHZg4UFmDyAlK+2aWHFmlB7fNP8+Y4m//Sq22QWWnQRbGHxNwJxEoK8exaqAYqLdE7LaICVGMb7KWPJxXpoU3abZuPzGsvUe3hpCYtFPInG3k9pCpWQo7Kxq6J0pIZbNZRmcExGIV578sMYkxQlF6M0SYtaHhjN+yNvFain6V0pjWu9rCL3PGmJLfhwhmHwjtZrmdKqaPyWD+M5TvgrHgWJXnTosKkIR0qvk/L66HhrU8gPHKAh9gs1shRNvVQis95y/rhtRcQ3VOHaDGvpkGaNJKbS3LKH4CxZDvcTR/xtKK7VICKlBZYjQ2YeegzuDtfZHaZIxkx96nMrMjnLiE/eBeK2/YgunsxVPYyd5Ap6GQQkygOkbMPc9WrcDZ/UjFhQdXvyKSzf+g7+O/uRfT1UZZz1ET2UpQX05dXRGJ+JoyWBXCf2g7vlV1wW+cgvNqL6Ke9UN1fQOWZP9M3DSYbZS1o/mK2sryaJhitD8FeuQv2vLVsqw5Vk74GGSTo+AXBN0cRne5A3EcFAy66oQ7mHYvgPLAazoZ1cFv++Wop8vv5/BGo/lO8QPTQ0cfIm47vzeVGtcOc9yAseSuaPF8tpo30jYSKffpGxv+kbw4AfwKM+QRUAqCuzQAAAABJRU5ErkJggg=="/>
                                            </g>
                                        </svg>`
   }
   let pageLoaded = 0;
   window.smartUnilever.renew = {
      autoship: {},
      currentStep: 0,
      activeItems: [],
      inactiveItems: [],
      selectedPeriod: null,
      previousPeriod: null,
      duedate: null,
      availablePeriods: [],
      productOptions: [],
      totalCv: 0,
      totalQv: 0,
      totalGrand: 0,
      validatorAddressForm: '',
      cart: {},
      quote: {},
      init: function () {
         this.setShippingAddress();
         this.getAvailablePeriods();
         this.bindRenew();
         this.handleForm();
         $.ajaxSetup({
            header: {
               'shopify-language': window.locale
            }
         });
      },

      bindRenew: function () {
         $(document).on('click', '.renew__btn', (e) => {
            this.openForm(e.currentTarget);
         });
         $(document).on('click', '[data-action="remove-item"]', (e) => {
            let self = $(e.currentTarget);
            this.removeActiveItem(self.data('variant_id'));
         })

         $(document).on('change', '.renew-qty', (e) => {
            let self = $(e.currentTarget);
            let variantId = self.data('variant_id'),
                qty = parseInt(self.val());
            this.activeItems.forEach(element => {
               if (element.variant.id == variantId) {
                  element.variant.qty = qty;
                  this.summarizeRenew();
                  return false;
               }
            });
         })

         // Click btn cancel to close modal
         $(document).on('click', '[data-close_modal]', (e) => {
            $('.renew__modal .close').trigger( "click" );
         });

         // Check radio period and due date change
         $(document).on('change', '[data-step="1"] :radio', (e) => {
            let self = e.currentTarget,
               inputVal = parseInt($(self).val()),
               itemWrap = $(self).parents('[data-item]'),
               elSelect = itemWrap.find('select');
            if (inputVal) {
               elSelect.prop("disabled", false);
            }else {
               elSelect.prop("disabled", true);
            }
         });

         $(document).on('select2:select', renewProductOptions, (e) => {
            let dataset = e.params.data.element.dataset,
               variantId = dataset.variant_id,
               productId = dataset.product_id;
            if (!autoshipProducts.hasOwnProperty(productId)) {
               //todo error
               return false;
            }

            let autoshipProduct = autoshipProducts[productId];
            let autoshipVariants = autoshipProduct.variants;

            for (let variant of autoshipVariants) {
               if (variant.id == variantId) {
                  variant.qty = 1;
                  this.activeItems.push({variant, product: autoshipProduct});
                  break;
               }
            }

            this.renderActiveList();
            this.renderProductOptions();
         })

         $(document).on('click', '#complete-renew', (e) => {            
            let checkAddressForm = $('#address_form_change').valid();
            if (checkAddressForm) {
               this.renewAutoship();
            }else {
               this.validatorAddressForm.focusInvalid();
            }            
         })

         document.addEventListener('cart:add', (response) => {
           console.log(response);
           console.log(response.detail);
           this.getCart();
         });

         document.addEventListener('cart:get', (response) => {
            this.initQuote();
         })

         document.addEventListener('quote:init', () => {
            this.showStep3();
         })

         document.addEventListener('otp:validate_success', () => {
            this.renewAutoship();
         })
      },

      initQuote: function () {
         $.post({
            url: '/apps/eai/api/renew/init',
            type: 'post',
            data: {
               customer: eai_customer,
               autoship_id: this.autoship.ax_order_id,
               items: this.cart.items,
               cart: this.cart.token,
               due_date: this.duedate
            },
         }).done((result) => {
            this.quote = result.data;
            document.dispatchEvent(new CustomEvent('quote:init'));
         });
      },

      getCart: function () {
         $.ajax({
            url: '/cart.js',
            dataType: 'json'
         }).done((cart) => {
            this.cart = cart;
            document.dispatchEvent(new CustomEvent('cart:get'));
         });
      },

      renewAutoship: function () {
         $.ajax({
            url: '/apps/eai/api/renew/place',
            type: 'post',
            data: this.getRenewData()
         }).done((result) => {
            if (result.status) {
               smartEraseCookie('cart');
               smartEraseCookie('promo_customer_group');

               window.location.href = result.data.redirect_url
            } else {
               window.location.href = "/"
            }
         }).fail((xhr) => {
            if (xhr.status == 401 && xhr.responseJSON.phone) {
               this.showOtpStep(xhr.responseJSON.phone);
            }
         });
      },

      showOtpStep: function (phone) {
         $('.otp-phone').html(phone);
         $('.fieldlist').addClass('hide');
         $('.fieldlist__step-opt ').removeClass('hide');
         EAI.OTP.init()
      },

      setShippingAddress: function () {

         // Action change address
         $(document).on('change', '[data-change__address] :radio', (e) => {
            let self = $(e.currentTarget),
            valueChange = parseInt(self.val());
            if(valueChange == 1) $('.address__form').removeClass('hide');
            else $('.address__form').addClass('hide');
         });

         // Action select address
         $(document).on('change', '#select__address', (e) => {
            let addressID = $('#select__address').val();

            // Update address field
            if (addressID && allAddress) {
               let addressObj = allAddress[addressID];

               if (addressObj) {
                  $('#AddressFirstName').val(addressObj.first_name);
                  $('#AddressLastName').val(addressObj.last_name);
                  $('#AddressAddress1').val(addressObj.address1);
                  $('#AddressPhone').val(addressObj.phone);

                  // Update zip code and trigger change to update select
                  $('#AddressZip').val(addressObj.zip);
                  $('#AddressZip').keyup();
               }
            }

         });

      },

      resetAttributes: function () {
            this.autoship = {};
            this.currentStep = 0;
            this.activeItems = [];
            this.inactiveItems = [];
            this.selectedPeriod = null;
            this.previousPeriod = null;
            this.totalCv = 0;
            this.totalQv = 0;
            this.totalGrand = 0;
            pageLoaded = 1;
      },

      openForm: function (element) {
         //reset attributes
         this.resetAttributes();

         //render step 1
         let self = $(element);
         let index = self.data('index');
         let autoships = smartUnilever.myOrder.autoships;
             this.autoship = autoships[index];
         let renewModalTemplate = lodash.template($('#renew-modal-template').html()),
            renewModalHtml = renewModalTemplate({autoship: this.autoship, periods: this.availablePeriods});
         console.log(this.autoship);
         $('.renew__form').html(renewModalHtml);

         // call select 2
         smartosc.select2('.autoship__data .select2_single');
         $('[data-select_payment_date]').prop("disabled", true);

         // Valid form address
         $(document).on("change", "#address_form_change .select2_wrap select", function () {
            $(this).valid();
        });


         $('.address__form').locationForm({
            locale: shopLocale,
            postalCode: {
               parentClass: "AddressPostCode",
               data: postalCodeShop,
               id: "AddressZip",
               class: "form-control",
               name: 'address[zip]'
            },
            state: {
               parentClass: "AddressProvinceCode",
               data: stateShop,
               name: "address[province_code]",
               id: "AddressProvinceCode",
            },
            city: {
               parentClass: "AddressDistrictCode",
               data: cityShop,
               name: "address[address2]",
               id: "AddressDistrictCode",
            }
         });
         
         this.validatorAddressForm = $('#address_form_change').validate({
            rules: {
               'address[first_name]': {
                    required: true,
                    firstNameMaxLengthCustom: true,
               },
               'address[last_name]': {
                    required: true,
                    lastNameMaxLengthCustom: true,
               },
               'address[address1]': {
                    required: true,
                    addressMaxLengthCustom: true,
               },
               'address[phone]': {
                   required: true,
                   telephoneCustom: true,
               },
               'address[zip]': {
                   required: true,
                   validPostalCodeCustom: function () {
                       return $('[name="address[zip]"]').val();
                   }
               }
            },
            errorPlacement: function (error, element) {
               if (element.hasClass('select2-hidden-accessible') && element.next('.select2-container').length) {
                  error.insertAfter(element.next('.select2-container'));
               }else {
                  error.insertAfter(element);
               }
            },
            submitHandler: function (form) {
               // let textProvince = $('#AddressProvinceCodeNew').find('option:selected').text(),
               // textDistrict = $('#AddressDistrictCodeNew').find('option:selected').text();
               // $('#AddressProvinceNew').val(textProvince);
               // $('#AddressDistrictNew').val(textDistrict);
               // elFormAddNew[0].submit();
            }
         });
         // End valid form address
      },

      handleForm: function() {
         // step 1: get period options, due date

         // step 2: render active list, inactive list, remove item in active list, add item to active list, calculate summary, update quantity in active list
            //step 3: select address, fill address, select payment, get payment saved cards, calculate summary
         $(document).on('click', '[data-forward]', (e) => {
            let self = $(e.currentTarget),
               toStep = self.data('forward'),
               currentForm = self.closest('.fieldlist'),
               currentStep = $(currentForm).data('step');

            // Progress step
            switch (parseInt(toStep)) {
               case 1:
                  //progress bar
                  $(`[data-renew_progress_step_2], [data-renew_progress_step_3]`).removeClass('active');
                  $('[data-renew_progress_step_2], [data-renew_progress_step_3]').removeClass('current');
                  $('[data-renew_progress_step_1]').addClass('current');

                  break;
               case 2:
                  //progress bar
                  $('[data-renew_progress_step_3]').removeClass('active');
                  $('[data-renew_progress_step_1], [data-renew_progress_step_3]').removeClass('current');
                  $('[data-renew_progress_step_2]').addClass('current');
                  $('[data-renew_progress_step_2]').addClass('active');


                  let changePeriod = $('input[name="period"]:checked').val();
                  if (changePeriod == '1') {
                     this.selectedPeriod = parseInt($('.autoship__periods').val());
                  } else {
                     this.selectedPeriod = this.autoship.period;
                  }

                  let changeDuedate = $('[name="due_date"]:checked').val();
                  if (changeDuedate == '1') {
                     this.duedate = parseInt($('[data-select_payment_date]').val());
                  } else {
                     this.duedate = parseInt(this.autoship.payment_date);
                  }

                  if (this.selectedPeriod !== this.autoship.period) {
                     $('.change__renew-note').html(this.getString('note', {key: 'period', value: this.selectedPeriod}));
                  }  else {
                     $('.change__renew-note').html('');
                  }

                  if (this.selectedPeriod !== this.previousPeriod) {
                     this.activeItems = [];
                     this.inactiveItems = [];
                     this.categorizeItems();
                     this.getProductsByPeriod();
                  }
                  this.previousPeriod = this.selectedPeriod;
                  break;
               case 3:
                  this.clearCart();
                  break;
            }

            $(currentForm).addClass('hide');
            $(`[data-step="${toStep}"]`).removeClass('hide');
         });
      },

      showStep3: function () {
         if (!this.activeItems.length) {
            alert('Need atleast ONE products');
            return false;
         }
         //progress
         $('[data-renew_progress_step_1], [data-renew_progress_step_2]').removeClass('current');
         $('[data-renew_progress_step_3]').addClass('current');
         $('[data-renew_progress_step_3]').addClass('active');

         $('.item__total-cvpv .value').html(`${this.totalCv} | ${this.totalQv}`);
         $('.item__total-estimated .price').html(theme.Currency.formatMoney(this.totalGrand, theme.moneyFormat));

         this.getSavedCards();
      },

      getAvailablePeriods: function() {
         //call api to server to get periods,
         $.ajax({ url: '/apps/eai/api/renew/get-periods'}).done((result) => {
             this.availablePeriods = result.periods;
         });
      },

      //step 2
      getProductsByPeriod: function () {
         $.ajax({
            url: '/apps/eai/api/renew/get-products',
            data: {
               period: this.selectedPeriod
            },
            // beforeSend: () => {
            //    $(renewFormLoading).show();
            // },
         }).done((result) => {
            this.productOptions = result.products;
            this.renderProductOptions();
         }).always(() => {
            // $(renewFormLoading).hide();
         });
      },

      categorizeItems: function () {
         for (let item of this.autoship.items) {
            let flag = false;

            if (!item.product) {
               item.message = this.getString('unavailable',{key: "period", value: this.selectedPeriod});
               this.inactiveItems.push(item);
               continue;
            }
            let productId = item.product.product_id;

            if (!autoshipProducts.hasOwnProperty(productId)) {
               item.message = this.getString('unavailable',{key: "period", value: this.selectedPeriod});
               this.inactiveItems.push(item);
               continue;
            }

            let autoshipProduct = autoshipProducts[productId];
            let autoshipVariants = autoshipProduct.variants;

            for (let variant of autoshipVariants) {
               let period = parseInt(variant['sku'].substring(2, 4));
               if (period === this.selectedPeriod) {
                  variant.qty = item.qty;

                  //set message for before rendering
                  if (variant.member_price != (item.price * 100)) {
                     variant.message = this.getString('price_change', {key: "product", value: autoshipProduct.title})
                  }else if(this.autoship.period !== this.selectedPeriod) {
                     variant.message = this.getString('period_change',{key: "from", value: this.autoship.period}, {key: "to", value: this.selectedPeriod});
                  }

                  this.activeItems.push({variant, product: autoshipProduct});
                  flag = true;
                  break;
               }
            }

            if (!flag) {
               item.message = this.getString('period_not_support', {key: "period", value: this.selectedPeriod});
               this.inactiveItems.push(item);
            }
         }
         this.renderActiveList(this.activeItems);
         this.renderInactiveList(this.inactiveItems);
      },

      renderActiveList: function () {
         let template = lodash.template($('#active-list-template').html()),
            templateHtml = template({items: this.activeItems});
         $(activeListElem).html(templateHtml);
         this.summarizeRenew();
      },

      renderInactiveList: function () {
         let template = lodash.template($('#inactive-list-template').html()),
            templateHtml = template({items: this.inactiveItems});
         $(inactiveListElem).html(templateHtml);
      },

      renderProductOptions: function () {
         let optionsHtml = `<option value="">${renewString['default_product_options']}</option>`;
         console.log(this.productOptions);
         if (!this.productOptions.length) {
            optionsHtml = `<option value="">${renewString['no_product_options']}</option>`;
         } else {
            for (let item of this.productOptions) {
               let productId = item.product_id;

               if (!autoshipProducts.hasOwnProperty(item.product_id)) {
                  continue;
               }

               let product = autoshipProducts[productId];

               for (let variant of product.variants) {
                  if(variant['sku'] !== item['sku']) {
                     continue;
                  }
                  let period = parseInt(variant['sku'].substring(2, 4));
                  if (period === this.selectedPeriod) {
                     let selected = this.activeItems.filter(obj => obj.variant.id === variant.id);
                     optionsHtml +=
                        `<option value="${variant['sku']}"
                      data-image="${variant.featured_image ?? product.featured_image}"
                      data-product_title="${product.title}"
                      data-variant_title="${variant.title}"
                      data-cv="${variant.cv}"
                      data-qv="${variant.qv}"
                      data-price="${variant.member_price}"
                      data-variant_id="${variant.id}"
                      data-product_id="${product.id}"
                      ${selected.length ? 'disabled' : ''}>
                         ${product.title} - ${variant.title}
                     </option>`
                  }
               }
            }
         }

         $(renewProductOptions).html(optionsHtml);
         $(renewProductOptions).select2({
            templateResult: (option) => {
               if (!option.id) {
                  return option.text;
               }
               let template = lodash.template($('#renew-product-options').html()),
                  templateHtml = template({dataset: option.element.dataset, disabled: option.disabled});
               return $(templateHtml);
            },
            minimumResultsForSearch: Infinity,
            dropdownCssClass: "renew__select2-products"
         });
      },

      removeActiveItem: function (variantId) {
         let index = this.activeItems.findIndex(element => element.variant.id == variantId);
         if (index > -1) {
            this.activeItems.splice(index, 1);
            this.renderActiveList();
            this.renderProductOptions();
         }
      },

      summarizeRenew: function () {
         let totalQty = 0;
         this.totalQv = 0;
         this.totalCv = 0;
         this.totalGrand = 0;
         for (let item of this.activeItems) {
            let variant = item.variant;
            this.totalCv += variant.cv * variant.qty;
            this.totalQv += variant.qv * variant.qty;
            this.totalGrand += variant.member_price * variant.qty;
            totalQty += variant.qty;
         }
         $('#renew-total_price').html(theme.Currency.formatMoney(this.totalGrand, theme.moneyFormat));
         $('#renew-total_cv-qv').html(`${this.totalCv} | ${this.totalQv}`);
         $('#renew-total_qty').html(totalQty);
      },

      //step 3
      renderSavedCards: function (cards) {
         let optionHtml = '';
         cards.forEach((card, index) => {
             optionHtml += `<div class="form-check">
                              <input class="form-check-input" type="radio" name="payment" id="payment_${index}" value="${card['id']}" ${index === 0 ? 'checked' : ''}>
                              <label class="form-check-label" for="payment_${index}">
                              ${creditCardIcons.hasOwnProperty(card['type']) ? creditCardIcons[card['type']] : ''}
                              ${card['masked_pan']}
                              </label>
                          </div>`;
         });
         optionHtml += `<div class="form-check">
                           <input class="form-check-input" type="radio" name="payment" id="payment_default" value="">
                           <label class="form-check-label" for="payment_default">Pay with new card</label>
                        </div>`
         $('#select-payment').html(optionHtml);
      },

      getSavedCards: function () {
         $.ajax({
            url: '/apps/eai/api/orders/get-saved-cards',
            data: {
               customer: window.eai_customer
            }
         }).done((result) => {
            this.renderSavedCards(result.cards);
         });
      },

      clearCart: function () {
         fetch('/cart/clear.js', {method: 'post'}).then((res) => {
            //add to cart, and update cart mini
            window.showPopupCart = false;
            smartosc.doAjaxAddToCart(this.prepareCartData(), $('.error__container'));
         });
      },

      prepareCartData: function () {
         let items = [];
         for (let item of this.activeItems) {
            items.push({id: item.variant.id, quantity: item.variant.qty});
         }
         return items;
      },

      getAddress: function () {
         let changeAddress = parseInt($('[name="change__address"]:checked').val());
         return !changeAddress
             ? this.autoship.addresses.find(address => address.type === 'shipping')
            : {
               type: 'shipping',
               first_name: $('#AddressFirstName').val(),
               last_name: $('#AddressLastName').val(),
               street: $('#AddressAddress1').val(),
               zipcode: $('#AddressZip').val(),
               state: $('#AddressProvinceCode').val(),
               city: $('#AddressDistrictCode').val(),
               phone: $('#AddressPhone').val()
            };
      },

      getRenewData: function () {
         let data = {
            cart: this.cart.token,
            customer: window.eai_customer,
            address: this.getAddress(),
            application_id: this.autoship.application_id,
            payment: 'p2c2p'
        }
         let cardId = $('[name="payment"]:checked').val();
         if (cardId !== '') {
            data.card = cardId;
            $('[data-input="card-id"]').val(data.card);
            $('[data-input="cart"]').val(data.cart);
         }
         return data;
      },

      getString: function (key, ...replaces) {
         if (!renewString.hasOwnProperty(key)) {
            return '';
         }

         let string = renewString[key];
         if (!replaces.length) {
            return string;
         }

         for (let replace of replaces) {
            string = string.replace(`{${replace.key}}`, replace.value);
         }

         return string;
      }
   };

   smartUnilever.renew.init();
})
