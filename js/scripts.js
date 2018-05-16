$(document).ready(function($) {
    var windowEl = $(window);
    var windowW = windowEl.width();
    var header = $("#header");
    var beforeWidth = $(this).width();

    // обновление страницы при масштабировании
    $(window).resize(function() {
        var afterWidth = $(this).width();
        if (afterWidth != beforeWidth) {
            location.reload()
        }
    })

    windowEl.scroll(function(scrlevt) {
        scrlevt.preventDefault();
        var scroll = $(window).scrollTop();
        if (scroll > 1) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        };
        return false;
    });

    // slider
    $('.services-slider').slick({
        slidesToShow: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                dots: true,
                arrows: false,
                slidesToScroll: 1,
            }
        }]
    });

    if (windowW < 1191) {
        $('.reviews-item-yellow-block, .reviews-item-gray-block').remove();
        $('.reviews-items').slick({
            slidesToShow: 3,
            dots: true,
            arrows: false,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        dots: true,
                        arrows: false,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        dots: true,
                        arrows: false,
                        slidesToScroll: 1,
                    }
                },
            ]
        });
    };

    if (windowW < 1191) {
        $('.services-slider-wrapp').addClass('container');
    }

    var cur = 0;
    var count = $('.home-slide').length;

    $('.home-slide').hide();
    $('.home-slide').eq(0).show();

    setInterval(function() {
        $('.home-slide').eq(cur).fadeOut(function() {
            cur = (cur + 1) % count;
            $('.home-slide').eq(cur).fadeIn();
        });
    }, 3000);

    // выравнивание по самому высокому блоку
    $(document).ready(function() {
        $.fn.equivalent = function() {
            var $blocks = $(this),
                maxH = $blocks.eq(0).height();
            $blocks.each(function() {
                if ($(this).height() > maxH) {
                    maxH = $(this).height();
                }
            });
            $blocks.height(maxH);
        }
        $('.reviews-item-discr').equivalent();
    });

    var mh = 0;
    $(".reviews-item").each(function() {
        var h_block = parseInt($(this).height());
        if (h_block > mh) {
            mh = h_block;
        };
    });
    $(".reviews-item").height(mh);

    // rewiews
    $('.reviews-item-person').hover(function() {
        $(this).next('.reviews-item-discr').toggleClass('reviews-item-discr-visible');
    });

    // плавный переход по якорям
    $(".header-menu a, .header-logo-wrapp, .footer-logo-wrapp").on("click", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            headerHeight = $("#header").outerHeight() - 50,
            top = $(id).offset().top - headerHeight;
        $('body,html').animate({ scrollTop: top }, 500);
        $('.header-menu-wrapp').removeClass('open-menu');
        $('.hamburger').removeClass('close-menu');
        return false;
    });

    //open and close menu and popup
    $('.hamburger').on('click', function() {
        $('.header-menu-wrapp').addClass('open-menu');
        return false;
    });

    $('.header-cross').on('click', function() {
        $('.header-menu-wrapp').removeClass('open-menu');
        return false;
    });

    $('.btn').on('click', function() {
        $('.pop-up-form-wrapp').addClass('open-popup');
        return false;
    });

    $('.pop-up-cross').on('click', function() {
        $('.pop-up-form-wrapp').removeClass('open-popup');
        $('.pop-up-succes-wrapp').removeClass('open-popup');
        return false;
    });

    /*передает данные в форму*/

    $('.btn').on('click', function() {
        var oneVal = $(this).attr('name');
        $('.form-id').val(oneVal);
    });

    //form

    $('form').submit(function(e) {
        var thisForm = $(this);
        var form = $('form');
        var submitBtn = thisForm.find('input[type="submit"]');
        var data = new FormData(thisForm[0]);
        submitBtn.prop("disabled", true);
        $.ajax({
            url: '/mail.php',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            type: 'POST',
            success: function(data) {
                thisForm[0].reset();
                form[0].reset();
                submitBtn.prop("disabled", false);
                $('.pop-up-succes-wrapp').addClass('open-popup');
                $(dataLayer.push({ 'event': 'event_lendos' }));
            },
        });
        e.preventDefault();
    });

    /*Динамическая подсветка пунктов меню*/

    $(window).scroll(function() {
        if (windowW > 991) {
            $('.magic').each(function() {
                var window_top = $(window).scrollTop();
                var div_top = $(this).offset().top;
                var div_1 = $(this).attr('id');
                if (window_top > div_top - 120) {
                    $('.header-menu').find('li').removeClass('menu-active');
                    $('.header-menu').find('li[class="' + div_1 + '"]').addClass('menu-active');
                } else {
                    $('.header-menu').find('li[class="' + div_1 + '"]').removeClass('menu-active');
                };
            });
        }

    });

    //map
    initMap();

    function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
            scrollwheel: false,
            zoom: 12,
            styles: [{
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#111111"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]
        });

        var geocoder = new google.maps.Geocoder();

        var address = $('#map-address').text();

        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: document.title,
                    icon: 'img/map-pin.svg'
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
});