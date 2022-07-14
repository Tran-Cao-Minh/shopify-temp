$(()=> {
   window.smartUnilever = window.smartUnilever || {};

   let getOrdersApi = '/apps/eai/api/orders/regulars',
       getAutoshipApi = '/apps/eai/api/orders/autoships',
       regularOrderWrap = $('[data-regular_order_list]'),
       autoshipOrderWrap = $('[data-autoship_order_list]'),
       renewProductOptions = '[data-renew="renew__options"]',
       renewFormLoading = '.renew__form--loading';
   let orders;

   window.smartUnilever.myOrder = {
      autoships: [],
      init: function () {
         this.binding();
         this.fetchOrders();
         this.fetchAutoships();

         this.collapseAction();
      },

      fetchOrders: function (url) {
         let uri = url ?? getOrdersApi;
         $.ajax({
            url: uri,
            data: {
               customer: window.eai_customer,
               limit: 10
            },
            beforeSend: () => {
               regularOrderWrap.parent().addClass('show-loading');
            },
            type: 'GET',
            success: (result) => {
               let pagination = result.meta.pagination;
               orders = result.data;
               this.renderOrders(orders);
               this.renderPagination(pagination, 0);
            }
         }).always(() => {
            regularOrderWrap.parent().removeClass('show-loading');
         });
      },

      renderOrders: function (orders) {
         let ordersHtml = '';

         if(orders.length) {
            let ordersTemplate = lodash.template($('#regular-template').html());
            ordersHtml = ordersTemplate({orders});
            regularOrderWrap.html(ordersHtml);
         } else {
            regularOrderWrap.addClass('no-order');
         }
         
      },

      fetchAutoships: function (url) {
         let uri = url ?? getAutoshipApi;
         $.ajax({
            url: uri,
            data: {
               customer: window.eai_customer,
               limit: 10
            },
            beforeSend: () => {
               autoshipOrderWrap.parent().addClass('show-loading');
            },
         }).done((result) => {
            this.autoships = result.data;
            let pagination = result.meta.pagination;
            this.renderAutoships();
            this.renderPagination(pagination, 1);
            autoshipOrderWrap.parent().removeClass('show-loading');
         }).always(() => {
            autoshipOrderWrap.parent().removeClass('show-loading');
         });
      },

      renderAutoships: function () {
         let autoshipHtml = '';
         if(this.autoships.length) {
            let autoshipTemplate = lodash.template($('#autoship-template').html());
            autoshipHtml = autoshipTemplate({autoships: this.autoships});
            autoshipOrderWrap.html(autoshipHtml);
         } else {
            autoshipOrderWrap.addClass('no-order');  
         }
         
      },

      renderPagination: function (pagination, type_order) {
         let total = pagination.total,
            currentPage = pagination.current_page,
            perPage = pagination.per_page,
            elPagination = '';

         if (type_order) {
            elPagination = $('[data-pagination_autoship]');
         }else {
            elPagination = $('[data-pagination_regular]');
         }

         if(total > perPage) {
            elPagination.simplePagination({
               items: total,
               prevText: theme.strings.paginationPrev,
               nextText: theme.strings.paginationNext,
               itemsOnPage: perPage,
               currentPage: currentPage,
               displayedPages: 3,
               edges: 1,
               hrefTextPrefix: '?page-',
               onPageClick: function (pageNumber, event) {
                  event.preventDefault();
                  $("html, body").animate({ scrollTop: $('.page__heading').offset().top - 50 }, 1000);
                  if (type_order) {
                     let urlSearch = `${getAutoshipApi}?page=${pageNumber}`;
                     smartUnilever.myOrder.fetchAutoships(urlSearch);
                  } else {
                     let urlSearch = `${getOrdersApi}?page=${pageNumber}`;
                     smartUnilever.myOrder.fetchOrders(urlSearch);
                  }

               },
            });
         } else {
            elPagination.html('');
         }
      },
      // collapse active
      collapseAction: function () {
         $(document).on('click', '[data-collapse_active]', (e) => {
            // console.log(e.currentTarget);
            $('[data-collapse_active]').toggleClass('show_collapse');
            $('.reorder__list-active').slideToggle();
         });
         $(document).on('click', '[data-collapse_inactive]', (e) => {
            let self = $(e.currentTarget);
            self.toggleClass('show_collapse');
            self.parents('[data-collapse_inactive_wrap]').find('[data-collapse_inactive_content]').slideToggle();
         });
      },

      binding: function () {
         $(document).on('click', '.see__children--btn', (e) => {
            let self = $(e.target);
            e.preventDefault();
            $(`a[data-parent="${self.data('parent')}"]`).toggleClass('show-children');
            $(`.children__orders[data-parent="${self.data('parent')}"]`).toggleClass('hide');
         });
      }
   };

   smartUnilever.myOrder.init();
});
