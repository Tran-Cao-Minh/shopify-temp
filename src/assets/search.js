$(function () {
   window.smartUnilever = window.smartUnilever || {};
   const urlParams = new URLSearchParams(window.location.search);
   let localeAPI = $('input[name="locale"]').val(),
      localeCurrent = '',
      localePrimary = $('input[name="locale"]').data('locale_primary'),
      term = urlParams.get('q'),
      loadingProduct = false,
      loadingArticle = false,
      elResultWrap = $('.search_result-wrap'),
      elListProduct = $('.list_products'),
      elWrapProduct = $('.products_result-wrap'),
      elListArticle = $('.list_blogs'),
      elWrapArticle = $('.articles_result-wrap');
   if (localeAPI == localePrimary) {
      localeCurrent = '';
   } else {
      localeCurrent = '/' + localeAPI;
   }

   // Update header term
   if (term && term.trim() != '') {
      $('.smart_search-page .text__search-term').text(term);
      $('[data-page_search_input]').val(term);
   }
   // Search app
   smartUnilever.searchAPP = {
      // Get data
      fetchData: function (link, locale, term) {
         $.ajax({
            url: link,
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
               locale: locale,
               term: term,
               group: window.customer_title,
            }),
            success: (result) => {
               if (result) {
                  // Call function render product
                  if (result.products.data) {
                     let dataProducts = result.products.data;
                     
                     if (dataProducts.length) {
                        this.renderProduct(result.products.data);
                        elWrapProduct.show();
                     } else {
                        elWrapProduct.hide();
                        loadingProduct = true;
                     }
                  }

                  // Call function render article
                  if (result.articles.data) {
                     let dataArticles = result.articles.data;
                     if (dataArticles.length) {
                        this.renderArticle(dataArticles);
                        elWrapArticle.show();
                     } else {
                        elWrapArticle.hide();
                        loadingArticle = true;
                     }
                  }

                  // Call function render pagination
                  let total = result.total,
                     current_page = 1,
                     per_page = result.products.per_page;
                  let article_total = result.articles.total,
                     product_total = result.products.total;
                  if (article_total > per_page || product_total > per_page) {
                     // get total article and product to compare then get current page of total max
                     if (article_total > product_total) {
                        current_page = result.articles.current_page;
                        total = article_total;
                     } else {
                        current_page = result.products.current_page;
                        total = product_total;
                     }
                     this.renderPagination(
                        total,
                        current_page,
                        per_page
                     );
                  }
               } else {
                  loadingProduct = true;
                  loadingArticle = true;
                  $('.search_result-content').addClass('hide');
               }
               // Call function remove loading
               this.removeLoading();
            },
            error: (error) => {
               console.log(error);
            },
         });
      },
      // Render HTML products
      renderProduct: function (products) {
         let htmlProducts = '';

         if (products.length) {
            for (let i in products) {
               let product = productsList[[products[i].product_id]];
               let productList = lodash.template($('#product-template').html());
               if(product) {
                  htmlProducts += productList({ product });
               }
            }
         } else {
            htmlProducts += 'There is no selected product, please start filling your bag.'
         }

         elListProduct.html(htmlProducts);

         smartosc.swatchChangeProductsList();

         if ($('.shopify-product-reviews-badge').length > 0 && window.SPR) {
            SPR.initDomEls();
            SPR.loadBadges();
         }

         loadingProduct = true;
      },
      renderArticle: function (articles) {
         let htmlArticles = '';

         $.each(articles, (index, article) => {
            let title = (localeAPI === 'th' && article.th_title) ? article.th_title : article.en_title,
               content = (localeAPI === 'th' && article.th_content) ? article.th_content : article.en_content,
               handle = article.url,
               image = article.image ? article.image.src : noImage;

            if (content) {
               content = content ? smartosc.trimString(content, 30, '...') : '';
            } else {
               content = '';
            }

            htmlArticles += `<div class="col-md-4"><div class="grid-view-item">`;

            // Render image
            htmlArticles += `<div class="article__list-image-wrapper">
                            <a class="article__list-image-container"
                              href="${localeCurrent}/blogs/${handle}"
                              style="padding-top: 72%"><img class="article__list-image" src="${image}" alt="" /></a>
                          </div>`;

            // Render title
            htmlArticles += `<h3 class="article__list-title"><a href="${localeCurrent}/blogs/${handle}">${title}</a></h3>`;

            // Render content
            htmlArticles += `<div class="article__list-desc">${content}</div>`;

            // Read more
            htmlArticles += `<a class="link-readmore text-underline" href="${localeCurrent}/blogs/${handle}" class="link-readmore">${theme.strings.read_more}</a>`;

            htmlArticles += `</div></div>`;
         });

         elListArticle.html(htmlArticles);
         loadingArticle = true;
      },
      renderPagination: function (total, current_page, per_page) {
         $('.pagination_result-wrap').simplePagination({
            items: total,
            prevText: theme.strings.paginationPrev,
            nextText: theme.strings.paginationNext,
            itemsOnPage: per_page,
            currentPage: current_page,
            displayedPages: 3,
            edges: 1,
            hrefTextPrefix: '?page-',
            onPageClick: function (pageNumber, event) {
               event.preventDefault();
               smartUnilever.searchAPP.addLoading();
               let urlState = '?q=' + term + '&pages=' + pageNumber;
               history.pushState({}, '', urlState);
               // Callback triggered when a page is clicked
               // Page number is given as an optional parameter
               let urlSearch = '/apps/eai/api/multilingual/site-search?page=' + pageNumber;
               smartUnilever.searchAPP.fetchData(urlSearch, localeAPI, term);
               $('html, body').animate({scrollTop: $('.search-page-form').offset().top - 50,},1000);
            },
         });
      },
      limitText: function (data) {
         let strData = data.replace(/<[^>]*>?/gm, '');
         return strData.replace(/^(.{30}[^\s]*).*/, '$1');
      },
      removeLoading: function () {
         if (loadingProduct && loadingArticle) {
            elResultWrap.removeClass('show_loading');
         }
      },
      addLoading: function () {
         elResultWrap.addClass('show_loading');
      },
      transform: function (products) {
         let transform = new Array(products.length);
         $.each(products, (index, product) => {
            transform[product.product_id] = product;
         });
         return transform;
      },

      init: function () {
         let urlSearch = '/apps/eai/api/multilingual/site-search',
            pageUrl = urlParams.get('pages');

         // Check page
         if (pageUrl) {
            urlSearch += '?page=' + pageUrl;
         }
         // Call API get data
         this.fetchData(urlSearch, localeAPI, term);
         // Button back to load page
         $(window).on('popstate', function (e) {
            location.reload();
         });
      },
   };
   smartUnilever.searchAPP.init();
});
