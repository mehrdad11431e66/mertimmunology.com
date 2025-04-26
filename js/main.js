(function ($) {
    "use strict";
    
    // ==================== NEW LANGUAGE SYSTEM ====================
    let currentLang = 'en';
    const translations = {
        en: {
            welcome: "Welcome to Our Hospital",
            appointment: "Make Appointment",
            services: "Our Services",
            // Add more English translations here
        },
        tr: {
            welcome: "Hastanemize Hoş Geldiniz",
            appointment: "Randevu Al",
            services: "Hizmetlerimiz",
            // Add more Turkish translations here
        },
        ar: {
            welcome: "مرحبا بكم في مستشفانا",
            appointment: "حجز موعد",
            services: "خدماتنا",
            // Add more Arabic translations here
        }
    };

    function applyLanguage(lang) {
        // RTL/LTR handling
        if (lang === 'ar') {
            $('html').attr('dir', 'rtl').addClass('rtl');
        } else {
            $('html').attr('dir', 'ltr').removeClass('rtl');
        }

        // Apply translations to all marked elements
        $.each(translations[lang], function(key, value) {
            $(`[data-translate="${key}"]`).text(value);
        });

        // Refresh carousels after language change
        $('.owl-carousel').trigger('refresh.owl.carousel');
    }

    // ==================== YOUR ORIGINAL CODE ====================
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

        // Initialize language switcher
        $('.language-option').click(function(e) {
            e.preventDefault();
            currentLang = $(this).data('lang');
            applyLanguage(currentLang);
        });

        // Apply default language
        applyLanguage(currentLang);
    });

    // Date and time picker
    $('.date').datetimepicker({ format: 'L' });
    $('.time').datetimepicker({ format: 'LT' });

    // Back to top button
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

    // Price carousel
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

    // Team carousel
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

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true
    });

    // ==================== NEW FEATURES ====================
    // Gallery System
    $('.gallery-item').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        callbacks: {
            beforeOpen: function() {
                // Handle RTL in gallery if needed
                if(currentLang === 'ar') {
                    this.container.addClass('rtl-gallery');
                }
            }
        }
    });

    // Video System
    $('.video-container').on('click', function() {
        const videoSrc = $(this).data('src');
        $(this).html(`
            <iframe src="${videoSrc}?autoplay=1&rel=0" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope" 
                    allowfullscreen></iframe>
        `);
    });

    // Animation System
    $('[data-animate]').waypoint(function() {
        $(this.element).addClass('animate__animated animate__' + $(this.element).data('animate'));
    }, { offset: '75%' });

})(jQuery);
// translations
const translations = {
    en: {
        welcome: "Welcome to Our Site",
        appointment: "Make an Appointment",
        contact: "Contact Us"
    },
    tr: {
        welcome: "Sitemize Hoşgeldiniz",
        appointment: "Randevu Al",
        contact: "Bize Ulaşın"
    },
    ar: {
        welcome: "مرحبًا بكم في موقعنا",
        appointment: "حدد موعدًا",
        contact: "اتصل بنا"
    }
};

// function to change language
function setLanguage(lang) {
    document.querySelectorAll("[data-translate]").forEach(function(el) {
        const key = el.getAttribute("data-translate");
        el.innerText = translations[lang][key] || el.innerText;
    });

    if (lang === "ar") {
        document.body.classList.add("rtl");
    } else {
        document.body.classList.remove("rtl");
    }
}

// event listeners
document.querySelectorAll(".language-option").forEach(function(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const lang = this.getAttribute("data-lang");
        setLanguage(lang);
    });
});
