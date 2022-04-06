
$(document).ready(function ($) {
	"use strict";
	awe_backtotop();
});
/* ==== Load plugin when scroll page ==== */
var is_load = 0;
function load_after_scroll(){
    if(is_load) return 
	is_load = 1;
	function loadCSS(e, t, n) { "use strict"; var i = window.document.createElement("link"); var o = t || window.document.getElementsByTagName("footer")[0]; i.rel = "stylesheet"; i.href = e; i.media = "only x"; o.parentNode.insertBefore(i, o); setTimeout(function () { i.media = n || "all" }) }loadCSS("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
}
$(document).ready(function ($) {
	!is_load && setTimeout(load_after_scroll,10000)
	$(window).on('scroll click mousemove touchstart',load_after_scroll);
});

/*--------------- Back to top button ---------------*/ 
function awe_backtotop() { 
	if ($('.back-to-top').length) {
		var scrollTrigger = 100,
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top').addClass('show');
				} else {
					$('.back-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
} window.awe_backtotop=awe_backtotop;

/*--------------- Open cart ---------------*/ 
$('.img_hover_cart').click(function(){
	$('.cart_sidebar').addClass('active');
	$('.opacity_menu').toggleClass('open_opacity');
});

/*==== Click nav mobile ====*/

$('.menubutton').click(function(e){
	e.stopPropagation();
	$('.wrapmenu_right').toggleClass('open_sidebar_menu');
	$('.opacity_menu').toggleClass('open_opacity');
});
$('.wrapmenu_right .nav-close').click(function(e) {
    e.preventDefault();
    $('.wrapmenu_right').removeClass('open_sidebar_menu');
	$('.opacity_menu').removeClass('open_opacity');
});
$('.opacity_menu, .cart_btn-close').click(function(e){
	$('.wrapmenu_right').removeClass('open_sidebar_menu');
	$('.cart_sidebar').removeClass('active');
	$('.opacity_menu').removeClass('open_opacity');
	$('#quick-view-product').hide();
});
/* ==== Click archor menu ==== */
$('.js-anchor-link').click(function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    if (target.length) {
        var scrollTo = target.offset().top - 30;
        $('body, html').animate({ scrollTop: scrollTo + 'px' }, 800);
    }
});
var sections = $('section');
$(window).on('scroll',function(){
  sections.each(function(){
    let top = $(window).scrollTop();
    let offset = $(this).offset().top - 70;
    let id = $(this).attr('id');
    let height = $(this).height();
  })
});
$('.wrapmenu_full .menu_mobile .ul_collections li.level0 > a').click(function(e) {
    $('.wrapmenu_right').removeClass('open_sidebar_menu');
	$('.opacity_menu').removeClass('open_opacity');s
});


$(document).ready(function ($) {
	/*==== Slider index ====*/
	var swiperSlider = new Swiper('.home-slider', {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.home-slider .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.home-slider .swiper-button-next',
			prevEl: '.home-slider .swiper-button-prev',
		},
	});
	/*==== Slider Policy ====*/
	var swiperPolicy = new Swiper('.slickpoli', {
		spaceBetween: 0,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},

			768: {
				slidesPerView: 3,
			},

			1024: {
				slidesPerView: 4,
			},
		},
	});
});