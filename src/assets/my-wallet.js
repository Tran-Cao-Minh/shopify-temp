$(() => {
   let wallet = {
      //init
      activeCardsCount: 0,
      autoshipCardsCount: 0,

      init: function () {
        this.getCardsAjax();
        this.bind();
      },

      //binding
      bind: function () {
         $(document).on('click', '[data-action="remove__item"]', (e) => {
            let self = $(e.currentTarget),
               cardId = self.data('card');
            // get card number and replace
            let cardNumber = self.parents('.content').find('.title').data('card');
            if (cardNumber) {
               let stringConfirmRemove = strings['deleteConfirmation'].replace('${number}', cardNumber);
               $('[data-wallet_modal_tilte]').html(stringConfirmRemove);
            }

            // Update data wallet_confirm_remove for button
            if (cardId) {
               $('[data-wallet_confirm_remove]').data('wallet_confirm_remove', cardId);
            }
            // Show popup
            $('.wallet__modal').show();
            // if (!confirm(strings['deleteConfirmation'])) {
            //    e.preventDefault();
            //    return false;
            // }
            // let self = $(e.currentTarget),
            //     cardId = self.data('card');
            // this.removeCardAjax(cardId);
         });

         // Confirm remove
         $(document).on('click', '[data-wallet_confirm_remove]', (e) => {
            let self = $(e.currentTarget),
               cardId = self.data('wallet_confirm_remove');
            this.removeCardAjax(cardId);
         });

         // Cancel popup remove to colse modal
         $(document).on('click', '[data-close_modal]', (e) => {
            $('.wallet__modal .close').trigger( "click" );
         });

         $(document).on('click', 'input[name="default-card"]', (e) => {
            let self = $(e.currentTarget),
                cardId = self.val();
            this.setDefaultCardAjax(cardId);
         })
      },

      //get credit card
      getCardsAjax: function () {
         $.ajax({
            url: '/apps/eai/api/my-wallet/get-cards',
            data: {
               customer: window.eai_customer
            }
         }).done(result => this.render(result));
      },

      //render
      render: function (result) {
         let activeCards = result.active_cards,
               autoshipCards = result.autoship_cards;

         this.activeCardsCount = activeCards.length;
         this.autoshipCardsCount = autoshipCards.length;

         if (activeCards.length > 0 || autoshipCards.length > 0) {
            this.renderActiveCards(activeCards, result.card_default);
            this.renderAutoshipCards(autoshipCards);
   
            $('#active-cards__count').html(strings['cardsCount'].replace('${number}', this.activeCardsCount))
            $('#autoship-cards__count').html(strings['cardsCountAutoship'].replace('${number}', this.autoshipCardsCount))
         }else {
            $('[data-wallet_box_loading]').addClass('hide');
            $('[data-wallet_no_item]').removeClass('hide');
         }
         
      },

      //render active card
      renderActiveCards: function (cards, defaultCard) {
         let template = lodash.template($('#active-cards-template').html());
         let templateHtml = template({cards, defaultCard})
         $('.wallet__box-normal').html(templateHtml);
         $('[data-wallet_content]').removeClass('hide');
         $('[data-wallet_box_loading]').addClass('hide');
      },

      //render autoship cards
      renderAutoshipCards: function (cards) {

         if (cards.length > 0) {
            let template = lodash.template($('#autoship-cards-template').html());
            let templateHtml = template({cards})
            $('.wallet__box-autoship').html(templateHtml);
         }else {
            $('.wallet__box-autoship').hide();
         }
         
         $('[data-wallet_content]').removeClass('hide');
         $('[data-wallet_box_loading]').addClass('hide');
      },

      //remove card
      removeCardAjax: function (cardId) {
         $('.wallet__modal').hide();
         $.ajax({
            url: '/apps/eai/api/my-wallet/remove-card',
            type: 'post',
            data: {
               customer: window.eai_customer,
               card: cardId
            }
         }).done(result => this.removeCard(result))
      },

      removeCard: function (result) {
         let cardId = result.card.id;
         //remove item
         $(`.item[data-index="${cardId}"]`).remove();

         //update qty card
         --this.activeCardsCount;
         $('#active-cards__count').html(strings['cardsCount'].replace('${number}', this.activeCardsCount))

         //append to autoship card if card is using for autoship order
         if (result.in_use) {
            this.appendAutoshipCard(result.card);
         }
      },

      //set default card for customer
      setDefaultCardAjax: function (cardId) {
         $.ajax({
            url: '/apps/eai/api/my-wallet/set-default-card',
            type: 'post',
            data: {
               customer: window.eai_customer,
               card: cardId
            },
         }).done(result => this.setDefaultCard(result));
      },

      setDefaultCard: function (result) {

      },

      appendAutoshipCard: function (card) {
         let template = lodash.template($('#autoship-card-item-template').html());
         $('.wallet__box-autoship .list-card').append(template({card}));

         ++this.autoshipCardsCount;
         $('#autoship-cards__count').html(strings['cardsCount'].replace('${number}', this.autoshipCardsCount))
      }
   };

   wallet.init();
})
