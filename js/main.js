(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        // Initialize modules
        initLanguageSwitcher();
        initGallery();
        initVideos();
        initAnimations();
    });

    // Language Switcher (English/Turkish/Arabic)
    function initLanguageSwitcher() {
        $('.language-switcher').on('click', 'a', function(e) {
            e.preventDefault();
            const lang = $(this).data('lang');
            switchLanguage(lang);
        });

        function switchLanguage(lang) {
            // RTL/LTR handling
            if (lang === 'ar') {
                $('html').attr('dir', 'rtl').attr('lang', 'ar');
            } else {
                $('html').attr('dir', 'ltr').attr('lang', lang);
            }
            
            // Here you would typically load language JSON files
            console.log(`Switched to ${lang} - Load your translations here`);
        }
    }

    // Gallery System (No image modifications)
    function initGallery() {
        $('.gallery-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            callbacks: {
                beforeOpen: function() {
                    // Your custom gallery logic
                }
            }
        });
    }

    // Video Player System
    function initVideos() {
        $('.video-player').each(function() {
            $(this).on('click', function() {
                const videoSrc = $(this).data('src');
                $(this).html(`
                    <iframe src="${videoSrc}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                `);
            });
        });
    }

    // Animation System
    function initAnimations() {
        $('[data-animate]').waypoint(function() {
            $(this.element).addClass('animated ' + $(this.element).data('animate'));
        }, {
            offset: '90%',
            triggerOnce: true
        });
    }

    // Original Carousels and Pickers (Keep all your existing code below)
    $('.date').datetimepicker({ format: 'L' });
    $('.time').datetimepicker({ format: 'LT' });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{ items:1 },
            992:{ items:2 },
            1200:{ items:3 }
        }
    });

    $(".team-carousel, .related-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{ items:1 },
            992:{ items:2 }
        }
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true
    });

})(jQuery);
