/*
    Project: Farmart HTML Template
    Version: 1.0.0
    Developed by: nouthemes
*/

(function($) {
    "use strict";

    function parallax() {
        $('.bg--parallax').each(function() {
            var el = $(this),
                xpos = "50%",
                windowHeight = $(window).height();
            $(window).scroll(function() {
                var current = $(window).scrollTop(),
                    top = el.offset().top,
                    height = el.outerHeight();
                if (top + height < current || top > current + windowHeight) {
                    return;
                }
                el.css('backgroundPosition', xpos + " " + Math.round((top - current) * 0.2) + "px");
            });
        });
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function() {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    'background': 'url(' + image_path + ')'
                });
            }
        });
    }

    function subMenuToggle() {
        $('.menu--mobile .menu-item-has-children > .sub-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent('.menu-item-has-children')
            $(this).toggleClass('active');
            current.siblings().find('.sub-toggle').removeClass('active');
            current.children('.sub-menu').slideToggle(350);
            current.siblings().find('.sub-menu').slideUp(350);
            $(this).parent().find('a').toggleClass('active');
        });
    }

    function menuFooterToggle() {
        $('.footer-toggle').on('click', function(e) {
            e.preventDefault();
            var current = $(this).parent().parent();
            current.children('ul').slideToggle(350);
            current.siblings().find('ul').slideUp(350);
        });

        $('.category__close').on('click', function (e) {
            $('.ps-category--mobile').toggleClass('open');
        });

        $('.footer-category').on('click', function (e) {
            $('.ps-category--mobile').toggleClass('open');
        });
    }

    function setAnimation(_elem, _InOut) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        _elem.each(function() {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data('animation-' + _InOut);

            $elem.addClass($animationType).one(animationEndEvent, function() {
                $elem.removeClass($animationType);
            });
        });
    }

    function owlCarouselConfig() {
        var target = $('.owl-carousel');
        if (target.length > 0) {
            target.each(function () {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataItemXL = el.data('owl-item-xl'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='icon-chevron-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='icon-chevron-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false,
                    center = el.data('owl-center');
                if (target.children('div, span, a, img, h1, h2, h3, h4, h5, h5').length >= 2) {
                    el.owlCarousel({
                        animateIn: dataAnimateIn,
                        animateOut: dataAnimateOut,
                        margin: dataGap,
                        autoplay: dataAuto,
                        autoplayTimeout: dataSpeed,
                        autoplayHoverPause: true,
                        loop: dataLoop,
                        nav: dataNav,
                        mouseDrag: datamouseDrag,
                        touchDrag: true,
                        autoplaySpeed: duration,
                        navSpeed: duration,
                        dotsSpeed: duration,
                        dragEndSpeed: duration,
                        navText: [dataNavLeft, dataNavRight],
                        dots: dataDots,
                        items: dataDefaultItem,
                        center: Boolean(center),
                        responsive: {
                            0: {
                                items: dataItemXS
                            },
                            480: {
                                items: dataItemSM
                            },
                            768: {
                                items: dataItemMD
                            },
                            992: {
                                items: dataItemLG
                            },
                            1200: {
                                items: dataItemXL
                            },
                            1680: {
                                items: dataDefaultItem
                            }
                        }
                    });

                    el.on('change.owl.carousel', function(event) {
                        var $currentItem = $('.owl-item', el).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-out]");
                        setAnimation($elemsToanim, 'out');
                    });

                    el.on('changed.owl.carousel', function(event) {
                        var $currentItem = $('.owl-item', el).eq(event.item.index);
                        var $elemsToanim = $currentItem.find("[data-animation-in]");
                        setAnimation($elemsToanim, 'in');
                    });
                }

            });
        }
    }

    function slickConfig() {
        var product = $('.ps-product--detail');
        if (product.length > 0) {
            var primary = product.find('.ps-product__gallery'),
                second = product.find('.ps-product__variants'),
                vertical = product.find('.ps-product__thumbnail').data('vertical');
            primary.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.ps-product__variants',
                fade: true,
                dots: false,
                infinite: false,
                arrows: primary.data('arrow'),
                prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>",
            });
            second.slick({
                slidesToShow: second.data('item'),
                slidesToScroll: 1,
                infinite: false,
                arrows: second.data('arrow'),
                focusOnSelect: true,
                prevArrow: "<a href='#'><i class='fa fa-angle-up'></i></a>",
                nextArrow: "<a href='#'><i class='fa fa-angle-down'></i></a>",
                asNavFor: '.ps-product__gallery',
                vertical: vertical,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: second.data('arrow'),
                            slidesToShow: 4,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            vertical: false,
                            prevArrow: "<a href='#'><i class='fa fa-angle-left'></i></a>",
                            nextArrow: "<a href='#'><i class='fa fa-angle-right'></i></a>"
                        }
                    },
                ]
            });

        }
    }

    function tabs() {
        $('.ps-tab-list  li > a ').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('li').siblings('li').removeClass('active');
            $(this).closest('li').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });

        $('.ps-tab-list.owl-slider .owl-item a').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $(this).closest('.owl-item').siblings('.owl-item').removeClass('active');
            $(this).closest('.owl-item').addClass('active');
            $(target).addClass('active');
            $(target).siblings('.ps-tab').removeClass('active');
        });
    }

    function navbarToogle() {
        $('.navbar-toggler').on('click', function(e) {
            $('.navigation--mobile').toggleClass('open');
        });
        
        $('.close-navbar-slide').on('click', function(e) {
            $('.navigation--mobile').removeClass('open');
        });
    }
    
    function currencyGetValue() {
        $('.currency-item').on('click', function(e) {
            $('.currency-item').removeClass('active');
            var value = $(this).attr('data-value');
            $(this).addClass('active');
            $('.current-currency').html(value);
        });
    }

    function languageGetValue() {
        $('.language-item').on('click', function (e) {
            $('.language-item').removeClass('active');
            var value = $(this).attr('data-value');
            $(this).addClass('active');
            $('.current-languages').html(value);
        });
    }

    function selectCategory() {
        $('.category-option a').on('click', function (e) {
            e.preventDefault();
            $('.category-option').removeClass('active');
            $(this).parent().addClass('active');
        });

        $('.header-search-select').on('click', function(e) {
            $(this).toggleClass('open');
        });
        $('.header-search-select').on('mouseleave', function (e) {
            $(this).removeClass('open');
        });
    }

    function openToggleIconHeader() {
        $('.search-mobile').on('click', function(e) {
            $('.mobile-search--slidebar').addClass('open');
        });
        $('.cancel-search').on('click', function(e) {
            $('.mobile-search--slidebar').removeClass('open');
        });
        $('#inputSearchMobile').on('click', function(e) {
            $('.mobile-search__result').addClass('open');
        });
        $('#inputSearchMobile').on('mouseleave', function (e) {
            $('.mobile-search__result').removeClass('open');
        });

        $('.btn-cart-header').on('click', function(e) {
            $('.mini-cart').toggleClass('open');
        });
        $('.mini-cart').on('mouseleave', function (e) {
            $(this).removeClass('open');
        });

        $('.close-cart').on('click', function (e) {
            $('.mini-cart').removeClass('open');
        });

        $('.input-search').on('click', function(e) {
            $('.result-search').toggleClass('open');
        });

        $('.header-inner__center').on('mouseleave', function (e) {
            $('.result-search').removeClass('open');
        });
    }

    function ratingStarProduct() {
        $('.rating-stars').each((index, value) => {
            var rate = $(value).attr('value');
            if ($(value).attr('value') === 0) {
                rate = "0";
            }
            $(value).barrating({
                theme: 'fontawesome-stars',
                initialRating: rate
            });
        });
    }

    function select2() {
        $('.single-select2').select2();
        $('.single-select2-no-search').each((index, value) => {
            $(value).select2().data('select2').$dropdown.addClass("select-no-input");
        });
    }

    function stickyMenu() {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            if (scroll > 39) {
                $('.header-desktop').addClass('header-sticky');
            } else {
                $('.header-desktop').removeClass('header-sticky')
            }

            if (scroll > 100) {
                $('.scroll-top').show();
            } else {
                $('.scroll-top').hide();
            }

            if (scroll > 1700) {
                $('.categories--floating').addClass('floating-sticky');
            } else {
                $('.categories--floating').removeClass('floating-sticky');
            }

            if ($("#freshFoodBlock").length > 0) {
                setActiveFloatingCategory();
            }
        });

        $('.scroll-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({ scrollTop: 0 }, 500);
        });

        $('.floating-item').on('click', function(event){     
            event.preventDefault();
            $('.floating-item').removeClass('active');
            $(this).addClass('active');
            $('html,body').animate({scrollTop:$(this.hash).offset().top - 85}, 500);
        });


        $('.main-page').delay(500).css({'overflow':'visible'});

        $('.ps-mobile-filter').on('click', function(e) {
            $('.ps-mobile-result').slideToggle();
        });

        if ($("#freshFoodBlock").length > 0) {
            setActiveFloatingCategory();
        }
    }

    function setActiveFloatingCategory() {
        if (isScrolledIntoView("#freshFoodBlock")) {
            $('.floating-item').removeClass('active');
            $("a[href='#freshFoodBlock']").addClass('active');
        } else if (isScrolledIntoView("#foodCupboardBlock")) {
            $('.floating-item').removeClass('active');
            $("a[href='#foodCupboardBlock']").addClass('active');
        } else if (isScrolledIntoView("#readyMealBlock")) {
            $('.floating-item').removeClass('active');
            $("a[href='#readyMealBlock']").addClass('active');
        } else if (isScrolledIntoView("#drinkTeaBlock")) {
            $('.floating-item').removeClass('active');
            $("a[href='#drinkTeaBlock']").addClass('active');
        } else if (isScrolledIntoView("#kitchenBlock")) {
            $('.floating-item').removeClass('active');
            $("a[href='#kitchenBlock']").addClass('active');
        }
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
    }

    function slickSingleItem() {
        $('.slick-single-item').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            prevArrow: "<button class='btn slick-nav slick-left'><i class='fa fa-angle-left'></i></button>",
            nextArrow: "<button class='btn slick-nav slick-right'><i class='fa fa-angle-right'></i></button>"
        });
    }

    function slickMenyItem() {
        $('.slick-many-item').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 8,
            adaptiveHeight: true,
            prevArrow: "<button class='btn slick-nav slick-left'><i class='fa fa-angle-left'></i></button>",
            nextArrow: "<button class='btn slick-nav slick-right'><i class='fa fa-angle-right'></i></button>",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 8
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3
                    }
                },
            ]
        });
    }

    function steps() {
        $('.nav-tabs > li a[title]').tooltip();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var step = $(this).attr('data-step');
            var noStep = $(this).attr('data-no-step');
            $('.nav-tabs li').removeClass('active');
            
            if (noStep) {
                $('.nav-tabs .step-' + step).addClass('active');
            } else {
                for (var index = 1; index <= step; index++) {
                    $('.nav-tabs .step-' + index).addClass('active');
                }
            }
            

            if(step <= 2) {
                $('.steps__action').scrollLeft(0);
            } else {
                var scroll = (step - 1) * 120;
                $('.steps__action').scrollLeft(scroll);
            }
        });

        $(".next-step").on('click', function (e) {
            var active = $('.nav-tabs li.active:last');
            active.next().removeClass('disabled');
            if (active.next().length) {
                var item = active.next().find('a[data-toggle="tab"]');
                nextTab(item);
            }
        });
        
        $(".prev-step").on('click', function (e) {
            var active = $('.nav-tabs li.active:last');
            if (active.prev().length) {
                prevTab(active);
            }
        });
    }

    function nextTab(item) {
        if (item.attr('data-no-step')) {
            $('.nav-tabs li.active').removeClass('active');
        }
        $('.steps--block .tab-pane').removeClass('active');
        item.attr('aria-selected', true);
        item.parent().addClass('active');
        var tabContent = item.attr('aria-controls');
        $('#' + tabContent).addClass('active');
    }

    function prevTab(elem) {
        var item = $(elem).prev().find('a[data-toggle="tab"]');
        if (item.attr('data-no-step')) {
            $('.nav-tabs li.active').removeClass('active');
        } else {
            $(elem).removeClass('active');
        }
        $('.steps--block .tab-pane').removeClass('active');
        item.attr('aria-selected', true);
        item.parent().addClass('active');
        var tabContent = item.attr('aria-controls');
        $('#' + tabContent).addClass('active');
    }

    function selectImageProductDetail() {
        $('#ps-lightgallery-videos').lightGallery({
            controls: true,
            autoplay: true,
        });

        $('.ps-gallery__item').on('click', function (e) {
            $('.ps-gallery__item').removeClass('active');
            $('#ps-lightgallery-videos').removeClass('active')
            $(this).addClass('active');
            $('#ps-product-zoom').attr("src", $(this).find('img').attr("src"));
            $('#ps-product-zoom').attr("data-zoom-image", $(this).find('img').attr("src"));

            if ($(this).attr("data-video-url")) {
                $('#ps-lightgallery-videos').addClass('active');
                $('#video-play').find('source').attr("src", $(this).attr("data-video-url"));
            }
        });

        $(".ps-product__attribute").on('click', function (e) {
            $(".ps-product__attribute").removeClass('active');
            $(this).addClass("active");
            $(".ps-product__attribute-value").text($(this).attr("data-value"));
        });

        $(".category-toggle-widget").on('click', function (e) {
            var current = $(this).parent().parent();
            current.find('.widget__list').toggleClass('open');
        });

        $('.shop-widget-toggle').on('click', function (e) {
            var tagi = $(this).find('i');
            tagi.toggleClass("icon-plus");
            tagi.toggleClass("icon-minus");
            var current = $(this).parent().parent();
            current.toggleClass("open");
        });

        $('.faq-toggle').on('click', function (e) {
            var tagi = $(this).find('i');
            tagi.toggleClass("icon-plus");
            tagi.toggleClass("icon-minus");
            var current = $(this).parent().parent();
            current.toggleClass("active");
        });
    }

    function slidePriceWidget() {
        var rangeSlider = document.getElementById('slide-price');
        if (rangeSlider) {
            var input0 = document.getElementById('input-with-keypress-0');
            var input1 = document.getElementById('input-with-keypress-1');
            var inputs = [input0, input1];
            noUiSlider.create(rangeSlider, {
                start: [20, 80],
                connect: true,
                step: 1,
                range: {
                    min: [1],
                    max: [100]
                }
            });

            rangeSlider.noUiSlider.on("update", function(values, handle) {
                inputs[handle].value = values[handle];

                /* begin Listen to keypress on the input */
                function setSliderHandle(i, value) {
                    var r = [null, null];
                    r[i] = value;
                    rangeSlider.noUiSlider.set(r);
                }

                inputs.forEach(function(input, handle) {
                    input.addEventListener("change", function() {
                        setSliderHandle(handle, this.value);
                    });

                    input.addEventListener("keydown", function(e) {
                        var values = rangeSlider.noUiSlider.get();
                        var value = Number(values[handle]);

                        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                        var steps = rangeSlider.noUiSlider.steps();

                        // [down, up]
                        var step = steps[handle];

                        var position;

                        // 13 is enter,
                        // 38 is key up,
                        // 40 is key down.
                        switch (e.which) {
                            case 13:
                            setSliderHandle(handle, this.value);
                            break;

                            case 38:
                            // Get step to go increase slider value (up)
                            position = step[1];

                            // false = no step is set
                            if (position === false) {
                                position = 1;
                            }

                            // null = edge of slider
                            if (position !== null) {
                                setSliderHandle(handle, value + position);
                            }

                            break;

                            case 40:
                            position = step[0];

                            if (position === false) {
                                position = 1;
                            }

                            if (position !== null) {
                                setSliderHandle(handle, value - position);
                            }

                            break;
                        }
                    });
                });
            });
        }
    }

    function shopallBrandTab() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $('.categories-item').removeClass('active');
            $('.categories-item').attr('aria-selected', "false");
            $(this).addClass('active');
        });
    }

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(endtime) {
        var daysSpan = $('.days');
        var hoursSpan = $('.hours');
        var minutesSpan = $('.minutes');
        var secondsSpan = $('.seconds');

        if (hoursSpan && minutesSpan && secondsSpan) {
            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        function updateClock() {
            var t = getTimeRemaining(endtime);
            
            var hoursText = ('0' + t.hours).slice(-2);
            var minutesText = ('0' + t.minutes).slice(-2);
            var secondsText = ('0' + t.seconds).slice(-2);

            if (daysSpan.length) {
                var daysText = '';
                if (t.days < 10) {
                    daysText = '0' + t.days + '<span class="subtime">days</span>';
                } else {
                    daysText = t.days + '<span class="subtime">days</span>';
                }
                daysSpan.each(function (index) {
                    $(this).html(daysText);
                });

                hoursSpan.each(function (index) {
                    $(this).html(hoursText + '<span class="subtime">hours</span>');
                });
                minutesSpan.each(function (index) {
                    $(this).html(minutesText + '<span class="subtime">mins</span>');
                });
                secondsSpan.each(function (index) {
                    $(this).html(secondsText + '<span class="subtime">secs</span>');
                });
            } else {
                hoursSpan.each(function (index) {
                    $(this).text(hoursText);
                });
                minutesSpan.each(function (index) {
                    $(this).text(minutesText);
                });
                secondsSpan.each(function (index) {
                    $(this).text(secondsText);
                });
            }

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
    }

    function countDown() {
        var deadline = new Date(Date.parse(new Date()) + 26 * 60 * 60 * 1000);
        initializeClock(deadline);
    }

    $(function() {
        countDown();
        shopallBrandTab();
        slidePriceWidget();
        selectImageProductDetail();
        backgroundImage();
        owlCarouselConfig();
        subMenuToggle();
        tabs();
        // slickConfig();
        parallax();
        selectCategory();
        openToggleIconHeader();
        navbarToogle();
        currencyGetValue();
        languageGetValue();
        menuFooterToggle();
        select2();
        stickyMenu();
        ratingStarProduct();
        slickSingleItem();
        slickMenyItem();
        steps();
    });
})(jQuery);

$(window).on('load', function() {
    $("#preloader").addClass('deactive');
});
