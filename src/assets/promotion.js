window.smartosc = window.smartosc || {};
smartosc.promotionSlideshow = function () {
    // Slide show
    if ($('.promotion__slideshow .swiper-slide').length > 0) {
        $('.promotion__slideshow .swiper-container').each(function() {
            let idBlock = $(this).data('slideshow_id'),
                elSlideshow = `[data-promotion__slideshow_${ idBlock }]`;
                smartosc.ssSlider(elSlideshow);
        });
        // smartosc.ssSlider('[data-slide_viewed]');
    }
}
smartosc.adobePromoView = function() {
    var ev = {};
    digitalData.promotion=[];
    digitalData.promotion.push({
            'promotionInfo': {
            'promotionId':'PROMO ID',
            'promotionName':'PROMO NAME',
            'promotionCreative':'PROMO CREATIVE',
            'position': 'POSITION if there are multiple promotions on the page'
        }}
    );
    ev.eventInfo={
        'type':ctConstants.promotionView,
    };
    ev.attributes = {'nonInteractive': {'nonInteraction': 1}};
    ev.category ={'primaryCategory':ctConstants.custom};         
    ev.subcategory = 'Load';
    digitalData.event.push(ev);
}
smartosc.adobePromoClick = function() {
    var ev = {};
    digitalData.promotion=[];
    digitalData.promotion.push({
            'promotionInfo': {
            'promotionId':'PROMO ID',
            'promotionName':'PROMO NAME',
            'promotionCreative':'PROMO CREATIVE',
            'position':'POSITION if there are multiple promotions on the page'
        }}
    );
    ev.eventInfo={
        'type':ctConstants.promotionClick,
    };
    ev.category ={'primaryCategory':ctConstants.custom};     
    ev.subcategory = 'Interest';
    digitalData.event.push(ev);
}
$(function () {
    smartosc.promotionSlideshow();
});

$(document).on('shopify:section:load', function (e) {
    if (e.target.className.includes('ss-promotion')) {
        smartosc.promotionSlideshow();
    }
});

smartosc.adobePromoView();
$(".btn-more-detail").on('click',(e)=>{
    smartosc.adobePromoClick();
});