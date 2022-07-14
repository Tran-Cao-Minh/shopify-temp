let smartosc = {};

smartosc.sectionSlide = function (positionScroll,partners, oftSlideItem1, oftSlideItem2, oftSlideItem3,oftSlideItem4) {

    //$(partners).css('background-position', '0% ' + parseInt(-positionScroll / 5) + 'px');
    if (positionScroll < oftSlideItem1) {
        $(partners).find('.itemCarousel').removeClass('show');
        $('[data-itemCarousel-1]',partners).addClass('show');

    }else if (positionScroll < oftSlideItem2) {
        $(partners).find('.itemCarousel').removeClass('show');
        $('[data-itemCarousel-2]',partners).addClass('show');

    }else if (positionScroll < oftSlideItem3) {
        $(partners).find('.itemCarousel').removeClass('show');
        $('[data-itemCarousel-3]',partners).addClass('show');

    }else if (positionScroll < oftSlideItem4) {
        $(partners).find('.itemCarousel').removeClass('show');
        $('[data-itemCarousel-4]',partners).addClass('show');
    }
}

smartosc.sectionAutoNumber = function (positionScroll,partners, oftSlideItem1, oftSlideItem2, oftSlideItem3,oftSlideItem4,oftSlideItem5) {
    //$('.section_slide .itemCarousel').removeClass('show');

    if (positionScroll < oftSlideItem1) {
        $(partners).find('.itemCarousel').removeClass('show show-repeat');
        $(partners).find('.lifeSliderPagination__item').removeClass('show show-repeat');
        $('[data-itemCarousel-1]',partners).addClass('show');
        $('[data-autoNumberDot1]',partners).addClass('show');


    }else if (positionScroll < oftSlideItem2) {
        $(partners).find('.itemCarousel').removeClass('show show-repeat');
        $(partners).find('.lifeSliderPagination__item').removeClass('show show-repeat');
        $('[data-itemCarousel-2]',partners).addClass('show');
        $('[data-autoNumberDot2]',partners).addClass('show');

    }else if (positionScroll < oftSlideItem3) {
        $(partners).find('.itemCarousel').removeClass('show show-repeat');
        $(partners).find('.lifeSliderPagination__item').removeClass('show show-repeat');
        $('[data-itemCarousel-3]',partners).addClass('show-repeat');
        $('[data-autoNumberDot3]',partners).addClass('show');

    }else if (positionScroll < oftSlideItem4) {
        $(partners).find('.itemCarousel').removeClass('show show-repeat');
        $(partners).find('.lifeSliderPagination__item').removeClass('show show-repeat');
        $('[data-itemCarousel-4]',partners).addClass('show');
        $('.lifeSliderPagination__item',partners).addClass('show-repeat');
    }
    else if (positionScroll < oftSlideItem5) {
        $(partners).find('.itemCarousel').removeClass('show show-repeat');
        $(partners).find('.lifeSliderPagination__item').removeClass('show show-repeat');
        $('[data-itemCarousel-5]',partners).addClass('show');
        $('.lifeSliderPagination__item',partners).addClass('show-repeat');
    }
}

smartosc.expanderBlockBrand = function () {
    const btn_Close  = $('.brandFan__close');
    const btn_Open   = $('.brandFan__open');
    const collapse_content = $('.brandFan__content');

    if ( window.innerWidth <= 767) {
        console.log('remove class');
        $(collapse_content).removeClass('open');
        $(btn_Open).addClass("open");
    }

    $(btn_Close).click(function(e){
        e.preventDefault();

        if (!$(collapse_content).hasClass("open")) {
            $(collapse_content).addClass("open").slideDown("normal");
            $(btn_Open).removeClass("open");
        }
        else {
            $(collapse_content).removeClass("open").slideUp("normal");
            $(btn_Open).addClass("open");
        }
    });

    $(btn_Open).click(function(e){
        e.preventDefault();

        if (!$(collapse_content).hasClass("open")) {
            $(collapse_content).addClass("open").slideDown("normal");
            $(btn_Open).removeClass("open");
        }
        else {
            $(collapse_content).removeClass("open").slideUp("normal");
            $(btn_Open).addClass("open");
        }
    });
}

smartosc.sectionSlide3 = function (
    positionScroll,
    oftSlideItem1,
    oftSlideItem2,
    oftSlideItem3
) {
    if (positionScroll < oftSlideItem1) {
        $(".section_slide.section-3 .item").removeClass("show");
        $(".section_slide.section-3 [data-slide_item1]").addClass("show");
    } else if (positionScroll < oftSlideItem2) {
        $(".section_slide.section-3 .item").removeClass("show");
        $(".section_slide.section-3 [data-slide_item2]").addClass("show");
    } else if (positionScroll < oftSlideItem3) {
        $(".section_slide.section-3 .item").removeClass("show");
        $(".section_slide.section-3 [data-slide_item3]").addClass("show");
    }
};

smartosc.sectionSlide4 = function (
    positionScroll,
    oftSlideItem1,
    oftSlideItem2,
    oftSlideItem3,
    oftSlideItem4
) {
    if (positionScroll < oftSlideItem1) {
        $(".section_slide.section-4 .item").removeClass("show");
        $(".section_slide.section-4 [data-slide_item1]").addClass("show");
    } else if (positionScroll < oftSlideItem2) {
        $(".section_slide.section-4 .item").removeClass("show");
        $(".section_slide.section-4 [data-slide_item2]").addClass("show");
    } else if (positionScroll < oftSlideItem3) {
        $(".section_slide.section-4 .item").removeClass("show");
        $(".section_slide.section-4 [data-slide_item3]").addClass("show");
    } else if (positionScroll < oftSlideItem4) {
        $(".section_slide.section-4 .item").removeClass("show");
        $(".section_slide.section-4 [data-slide_item4]").addClass("show");
    }
};

smartosc.sectionSlide5 = function (
    positionScroll,
    oftSlideItem1,
    oftSlideItem2,
    oftSlideItem3,
    oftSlideItem4,
) {
    const matchMobileScreen = window.matchMedia("(max-width: 576px)").matches
    if (positionScroll < oftSlideItem1) {
        $(".section_slide.section-5 .item").removeClass("show");
        $(".section_slide.section-5 [data-slide_item1]").addClass("show");
    } else if (positionScroll < oftSlideItem2) {
        $(".section_slide.section-5 .item").removeClass("show");
        $(".section_slide.section-5 [data-slide_item2]").addClass("show");
    } else if (positionScroll < oftSlideItem3) {
        $(".section_slide.section-5 .item").removeClass("show");
        if (!matchMobileScreen) {
            $(".section_slide.section-5 [data-slide_item3].item3").addClass("show");
        } else {
            $(".section_slide.section-5 [data-slide_item3].item3-mb").addClass("show");
        }
    } else if (positionScroll < oftSlideItem4) {
        if (matchMobileScreen) {
            $(".section_slide.section-5 .item").removeClass("show");
            $(".section_slide.section-5 [data-slide_item4].item3-mb").addClass("show");
        }
    }

};
smartosc.sectionSlide6 = function (
    positionScroll,
    oftSlideItem1,
    oftSlideItem2,
    oftSlideItem3,
    oftSlideItem4,
    oftSlideItem5
) {
    if (positionScroll < oftSlideItem1) {
        $(".section_slide.section-6 .item").removeClass("show");
        $(".section_slide.section-6 [data-slide_item1]").addClass("show");
    } else if (positionScroll < oftSlideItem2) {
        $(".section_slide.section-6 .item").removeClass("show");
        $(".section_slide.section-6 [data-slide_item2]").addClass("show");
    } else if (positionScroll < oftSlideItem3) {
        $(".section_slide.section-6 .item").removeClass("show");
        $(".section_slide.section-6 [data-slide_item3]").addClass("show");
    } else if (positionScroll < oftSlideItem4) {
        $(".section_slide.section-6 .item").removeClass("show");
        $(".section_slide.section-6 [data-slide_item4]").addClass("show");
    } else if (positionScroll < oftSlideItem5) {
        $(".section_slide.section-6 .item").removeClass("show");
        $(".section_slide.section-6 [data-slide_item5]").addClass("show");
    }
};


smartosc.playMyVideo = function ($myVideo) {
     var playMyVideo;
     window.onYouTubeIframeAPIReady = function() {
         new YT.Player( $('iframe',$myVideo), {
             events: {
                 onReady: function(e) {
                     playMyVideo = function() {
                         var player = e.target
                         player.playVideo()
                     }
                 }
             }
         })
     }
    $('.play',$myVideo).on( "click", function(event) {
        event.preventDefault()
         $(this).hide();
        playMyVideo()
     });
}
$(document).ready(function() {
    let heightWindow = $(window).height();
    smartosc.section1          = $('[data-section_slide]');

    // 1.Get top section life Slider
    let section1        =   $('[data-section_slideHeader]'),
        oftSlide        =   section1.offset().top,
        heightlide      =    section1.height(),
        oftSlideItem1   = $('[data-slide_scroll_item1]',section1).offset().top,
        oftSlideItem2   = $('[data-slide_scroll_item2]',section1).offset().top,
        oftSlideItem3   = $('[data-slide_scroll_item3]',section1).offset().top,
        oftSlideItem4   = $('[data-slide_scroll_item4]',section1).offset().top;


    // 2.Get top section Auto Number
    let section2        =   $('[data-section_autonumber]'),
        oftSection2     =   section2.offset().top,
        heightSection2  =    section2.height(),
        oftSection2Item1   = $('[data-slide_scroll_item1]',section2).offset().top,
        oftSection2Item2   = $('[data-slide_scroll_item2]',section2).offset().top,
        oftSection2Item3   = $('[data-slide_scroll_item3]',section2).offset().top,
        oftSection2Item4   = $('[data-slide_scroll_item4]',section2).offset().top,
        oftSection2Item5   = $('[data-slide_scroll_item5]',section2).offset().top;

    smartosc.expanderBlockBrand();

    //3.Section Video
    //smartosc.playMyVideo('.mediaVimeo');

    //4.Section 3D hover plane effect
    //smartosc.mouseOvePerspective();

    // Section slide 3
    let oftSlide3 = $("[data-section_slide].section-3").offset().top,
        oftSlide3_Item1 = $(".section-3 [data-slide_scroll_item1]").offset().top,
        oftSlide3_Item2 = $(".section-3 [data-slide_scroll_item2]").offset().top,
        oftSlide3_Item3 = $(".section-3 [data-slide_scroll_item3]").offset().top,
        heightlide3 = $("[data-section_slide].section-3").height(),

        // Section slide 4
        oftSlide4 = $("[data-section_slide].section-4").offset().top,
        oftSlide4_Item1 = $(".section-4 [data-slide_scroll_item1]").offset().top,
        oftSlide4_Item2 = $(".section-4 [data-slide_scroll_item2]").offset().top,
        oftSlide4_Item3 = $(".section-4 [data-slide_scroll_item3]").offset().top,
        oftSlide4_Item4 = $(".section-4 [data-slide_scroll_item4]").offset().top,
        heightlide4 = $("[data-section_slide].section-4").height(),

        // Section slide 5
        oftSlide5 = $("[data-section_slide].section-5").offset().top,
        oftSlide5_Item1 = $(".section-5 [data-slide_scroll_item1]").offset().top,
        oftSlide5_Item2 = $(".section-5 [data-slide_scroll_item2]").offset().top,
        oftSlide5_Item3 = $(".section-5 [data-slide_scroll_item3]").offset().top,
        oftSlide5_Item4 = $(".section-5 [data-slide_scroll_item4]").offset().top,
        heightlide5 = $("[data-section_slide].section-5").height(),

        // Section slide 6
        oftSlide6 = $("[data-section_slide].section-6").offset().top,
        oftSlide6_Item1 = $(".section-6 [data-slide_scroll_item1]").offset().top,
        oftSlide6_Item2 = $(".section-6 [data-slide_scroll_item2]").offset().top,
        oftSlide6_Item3 = $(".section-6 [data-slide_scroll_item3]").offset().top,
        oftSlide6_Item4 = $(".section-6 [data-slide_scroll_item4]").offset().top,
        oftSlide6_Item5 = $(".section-6 [data-slide_scroll_item5]").offset().top,
        heightlide6 = $("[data-section_slide].section-6").height();


    $(window).on("resize scroll", function () {
        let positionScroll = $(window).scrollTop();

        // 1.Get top section life Slider
        if ((positionScroll + heightWindow) > oftSlide && positionScroll < (oftSlide + heightlide)) {
            smartosc.sectionSlide(positionScroll,section1, oftSlideItem1, oftSlideItem2, oftSlideItem3,oftSlideItem4);
        }

        // 2.Get top section Auto Number
        if ((positionScroll + heightWindow) > oftSection2 && positionScroll < (oftSection2 + heightSection2)) {
            smartosc.sectionAutoNumber(positionScroll,section2, oftSection2Item1, oftSection2Item2, oftSection2Item3,oftSection2Item4,oftSection2Item5);
        }

        // 3.Get Section 3
        if (positionScroll + heightWindow > oftSlide3 && positionScroll < oftSlide3 + heightlide3 ) {
            smartosc.sectionSlide3(positionScroll, oftSlide3_Item1, oftSlide3_Item2, oftSlide3_Item3);
        }

        // 4.Get Section 4
        if (positionScroll + heightWindow > oftSlide4 && positionScroll < oftSlide4 + heightlide4 ) {
            smartosc.sectionSlide4(positionScroll, oftSlide4_Item1, oftSlide4_Item2, oftSlide4_Item3,oftSlide4_Item4);
        }

        // 5.Get Section 5
        if (positionScroll + heightWindow > oftSlide5 && positionScroll < oftSlide5 + heightlide5 ) {
            smartosc.sectionSlide5(positionScroll, oftSlide5_Item1, oftSlide5_Item2, oftSlide5_Item3,oftSlide5_Item4);
        }

        // 5.Get Section 6
        if (positionScroll + heightWindow > oftSlide6 && positionScroll < oftSlide6 + heightlide5 ) {
            smartosc.sectionSlide6(positionScroll, oftSlide6_Item1, oftSlide6_Item2, oftSlide6_Item3,oftSlide6_Item4, oftSlide6_Item5);
        }
    });
})
