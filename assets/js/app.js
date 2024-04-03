"use strict";
jQuery(function($) {
    'use strict';
    $(window).ready(function() {
        $('#preloader').delay(200).fadeOut('fade');
    });
    $('.js-mega-menu').HSMegaMenu({
        event: 'hover',
        pageContainer: $('.container'),
        breakpoint: 767.98,
        hideTimeOut: 0
    });
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 100) {
            $('.main-header-menu-wrap').addClass('affix');
        } else {
            $('.main-header-menu-wrap').removeClass('affix');
        }
    });
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $('.scroll-to-target').addClass('open');
        } else {
            $('.scroll-to-target').removeClass('open');
        }
        if ($('.scroll-to-target').length) {
            $(".scroll-to-target").on('click', function() {
                var target = $(this).attr('data-target');
                var new_time = new Date();
                if (!this.old_time || new_time - this.old_time > 1000) {
                    $('html, body').animate({
                        scrollTop: $(target).offset().top
                    }, 500);
                    this.old_time = new_time;
                }
            });
        }
    });
    fetch("data.json").then(response=>response.json()).then(vpsPriceInfo=>console.log(vpsPriceInfo));
    var cPlan = $('#c-plan');
    if (cPlan.length) {
        cPlan.slider({
            tooltip: 'always'
        });
        cPlan.on("slide", function(e) {
            $.each(vpsPriceInfo, function(index, vpsObj) {
                if (vpsObj.vpsPlan == e.value) {
                    setVpsValue(vpsObj);
                }
            });
        });
        initSlider();
    }
    function initSlider() {
        cPlan.value = cPlan.data("slider-value");
        var defaultVpsCore = parseInt(cPlan.value);
        $.each(vpsPriceInfo, function(index, vpsObj) {
            if (vpsObj.vpsPlan == defaultVpsCore) {
                $('.slider .tooltip', '#custom-plan').append('<div class="tooltip-up"></div>');
                $('.slider .tooltip-inner', '#custom-plan').attr("data-unit", cPlan.data("unit"));
                $('.slider .tooltip-up', '#custom-plan').attr("data-currency", cPlan.data("currency"));
                setVpsValue(vpsObj);
            }
        });
    }
    function setVpsValue(vpsObj) {
        $('.slider .tooltip-up', '#custom-plan').text(vpsObj.vpsPrice);
        $('.vpsPrice', '#custom-plan').text(vpsObj.vpsPrice + cPlan.data("currency"));
        $('.vpsCore span', '#custom-plan').text(vpsObj.vpsCore);
        $('.vpsMemory span', '#custom-plan').text(vpsObj.vpsMemory);
        $('.vpsStorage span', '#custom-plan').text(vpsObj.vpsStorage);
        $('.vpsBandwidth span', '#custom-plan').text(vpsObj.vpsBandwidth);
        $('.vpsWHmcsUrl', '#custom-plan').attr("href", vpsObj.vpsWHmcsUrl);
    }
    if ($(".billingCycle").length > 0) {
        var billingPlanInputs = $("input[name='billingPlan']");
        billingPlanInputs.change(function() {
            var billingPlan = $(this).val();
            $.each(['.monthly-price', '.yearly-price', '.biannual-price', '.triennial-price'], function(index, tag) {
                $(tag).css('display', 'none');
            });
            $('.' + billingPlan + '-price').css('display', 'block');
        });
    }
    $('.custom-map-location li span').tooltip('show');
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $('.hero-slider-one').owlCarousel({
        loop: true,
        autoplay: true,
        dots: true,
        autoplayHoverPause: true,
        items: 1,
        smartSpeed: 1000,
        animateOut: "slideOutUp",
        animateIn: "slideInDown"
    });
    $('.hero-content-slider').owlCarousel({
        loop: false,
        autoplay: true,
        dots: true,
        autoplayHoverPause: true,
        items: 1,
        smartSpeed: 1000,
        animateOut: "slideOutUp",
        animateIn: "slideInDown"
    });
    $('.client-testimonial').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        responsiveClass: true,
        autoplay: true,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });
    $('.clients-carousel').owlCarousel({
        autoplay: true,
        loop: true,
        margin: 15,
        dots: false,
        slideTransition: 'linear',
        autoplayTimeout: 4500,
        autoplayHoverPause: true,
        autoplaySpeed: 4500,
        responsive: {
            0: {
                items: 2
            },
            500: {
                items: 3
            },
            600: {
                items: 4
            },
            800: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });
    $('.team-member-carousel, .gallery-img-slider').owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        responsiveClass: true,
        autoplay: true,
        autoplayHoverPause: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
    $('.clock').countdown('2023/02/01', function(event) {
        $(this).html(event.strftime('' + '<div class="row">' + '<div class="col">' + '<h2 class="mb-1">%-D</h2>' + '<h6>Jour%!d</h6>' + '</div>' + '<div class="col">' + '<h2 class="mb-1">%H</h2>' + '<h6>Heures</h6>' + '</div>' + '<div class="col">' + '<h2 class="mb-1">%M</h2>' + '<h6>Minutes</h6>' + '</div>' + '<div class="col">' + '<h2 class="mb-1">%S</h2>' + '<h6>Secondes</h6>' + '</div>' + '</div>'));
    });
    $(function() {
        if ($('#countdown').length) {
            var second = 1000
              , minute = second * 60
              , hour = minute * 60
              , day = hour * 24
              , set_time = "December 30, 2022 00:00:00";
            var countDown = new Date(set_time).getTime();
            var x = setInterval(function() {
                var now = new Date().getTime();
                var distance = countDown - now;
                document.getElementById("days").innerText = Math.floor(distance / day);
                document.getElementById("hours").innerText = Math.floor(distance % day / hour);
                document.getElementById("minutes").innerText = Math.floor(distance % hour / minute);
                document.getElementById("seconds").innerText = Math.floor(distance % minute / second);
                if (distance < 0) {
                    var countdown = document.getElementById("countdown");
                    var content = document.getElementById("end-countdown");
                    countdown.style.display = "none";
                    content.style.display = "block";
                    clearInterval(x);
                }
            }, second);
        }
    });
    $(function() {
        if ($('#sticky').length) {
            var el = $('#sticky');
            var stickyTop = $('#sticky').offset().top;
            var stickyHeight = $('#sticky').height();
            $(window).scroll(function() {
                var limit = $('#section-footer').offset().top - stickyHeight - 20;
                var windowTop = $(window).scrollTop();
                if (stickyTop < windowTop) {
                    el.css({
                        position: 'fixed',
                        top: 20,
                        width: 350
                    });
                } else {
                    el.css('position', 'static');
                }
                if (limit < windowTop) {
                    var diff = limit - windowTop;
                    el.css({
                        top: diff
                    });
                }
            });
        }
    });
});
