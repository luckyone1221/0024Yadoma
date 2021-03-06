const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),


	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container && $('.menu-mobile--js').is('active')) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 1020px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	toggleFilter() {
		const btnToggleFilter = document.querySelectorAll(".toggle-filter--js");
		const filterMobile = document.querySelector(".filter-wrap-js");
		if (btnToggleFilter) {
			btnToggleFilter.forEach(el => {
				el.addEventListener('click', () => {
					// console.log(this);
					btnToggleFilter.forEach(el => el.classList.toggle("on"));
					filterMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 1020px)").matches) {
					btnToggleFilter.forEach(el => el.classList.remove("on"));
					filterMobile.classList.remove("active");
					document.body.classList.remove("fixed");
					document.querySelector('html').classList.remove("fixed");
				}
			}, { passive: true });
		}
	},

	// closeFilter() {
	// 	if (this.filterMobile) {
	// 		this.btnToggleFilter.forEach(element => {
	// 			element.classList.remove("on");
	// 		});
	// 		this.filterMobile.classList.remove("active");
	// 		document.body.classList.remove("fixed");
	// 		document.querySelector('html').classList.remove("fixed");
	// 	}
	// },
	// filterMenu() {
	// 	if (this.menuMobileLink) {
	// 		this.toggleMenu();
	// 		document.addEventListener('mouseup', (event) => {
	// 			let container = event.target.closest(".menu-mobile--js.active"); // (1)
	// 			if (!container) {
	// 				this.closeMenu();
	// 			}
	// 		}, { passive: true });

	// 		window.addEventListener('resize', () => {
	// 			if (window.matchMedia("(min-width: 1020px)").matches) {
	// 				JSCCommon.closeFilter();
	// 			}
	// 		}, { passive: true });
	// 	}
	// },
	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").after('<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(".scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear(); 
		}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	//JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	//JSCCommon.animateScroll();
	JSCCommon.toggleFilter();
	// JSCCommon.closeFilter();
	// JSCCommon.filterMenu();

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = '01-375.png';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $("header ").innerHeight();
		if ($(window).scrollTop() > topH) {
			$('.top-nav  ').addClass('fixed');
		} else {
			$('.top-nav  ').removeClass('fixed');
		}

	}

	window.addEventListener('resize', () => {
		//whenResize();

	}, { passive: true });

	//whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyone js

	//lower header menu js
	function topMnuMissclickHandler() {
		if (event.target.closest('.inner-popup-js')) return
		closeTopMnu();
		document.body.removeEventListener('click', topMnuMissclickHandler);
	}
	function closeTopMnu(){
		$('.pop-up-link-js, .inner-popup-js, .pop-up-cont-js > ul').removeClass('active');
		$('body').removeClass('blured');
	}

	//mob toggle
	window.addEventListener('resize', function (){
		if (window.matchMedia("(min-width: 1020px)").matches) {
			$('.inner-popup-js').slideUp(function (){
				$(this).removeClass('opened');
			});
			closeMainPopUp();
			closeTopMnu();
		}
	}, {passive: true});

	$('.pop-up-link-js').click(function () {
		if (window.matchMedia("(max-width: 1020px)").matches) {
			$(this.parentElement).find('.inner-popup-js').slideToggle(function (){
				$(this).toggleClass('opened');
			});
		}
		//end mob toggle

		document.body.removeEventListener('click', topMnuMissclickHandler);
		event.preventDefault();
		event.stopPropagation();
		let self = this;

		//remove from others
		$('.pop-up-link-js').each(function (){
			if (this !== self){
				$(this).removeClass('active');
			}
			else{
				$(this).toggleClass('active');
			}

			let cuurPopUp = this.parentElement.querySelector('.inner-popup-js');
			let thisPopUp = self.parentElement.querySelector('.inner-popup-js');

			if (cuurPopUp !== thisPopUp){
				$(cuurPopUp).removeClass('active');
			}
			else{
				$(cuurPopUp).toggleClass('active');
			}
		});

		//other
		if (this.classList.contains('active')){
			$('body').addClass('blured');
			$('.pop-up-cont-js > ul').addClass('active');
		}
		else{
			$('body').removeClass('blured');
			$('.pop-up-cont-js > ul').removeClass('active');
		}

		document.body.addEventListener('click', topMnuMissclickHandler);
	});
	//mob mnu main popup
	$('.burger-btn-js').click(function (){
		$('.burger-btn-js, .pop-up-menu-js').toggleClass('active');
		$('body').toggleClass('fixed2');
		$('html').toggleClass('fixed');
	});
	function closeMainPopUp(){
		$('.burger-btn-js, .pop-up-menu-js').removeClass('active');
		$('body').removeClass('fixed2');
		$('html').removeClass('fixed');
	}

	//mob sub sub
	$('.sub-col-title-js').click(function (){
		$(this).toggleClass('active');

		$(this.parentElement).find('.sub-col-list-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});


	//.search-btn-js

	function searchPopUpMissClick() {
		if (!event.target.closest('.search-strip-js')){
			$('.search-strip-js, .search-btn-js').removeClass('active');
		}
	}

	$('.search-btn-js').click(function (){
		event.stopPropagation();
		document.body.removeEventListener('click', searchPopUpMissClick);

	 	$(this).toggleClass('active');
		$('.search-strip-js').toggleClass('active');

		document.body.addEventListener('click', searchPopUpMissClick);
	});

	//headerSlider
	let headerSliderSolid = new Swiper('.l-header-slider-js', {
		loop: true,
		spaceBetween: 10,

		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},
	});

	let headerSlider = new Swiper('.header-slider-js', {
		loop: true,
		spaceBetween: 10,

		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		//
		navigation: {
			nextEl: '.header-next--js',
			prevEl: '.header-prev--js',
		},
		pagination: {
			el: '.header-pugin--js',
			clickable: true,
		},
	});
	headerSliderSolid.controller.control = headerSlider;
	headerSlider.controller.control = headerSliderSolid;

	//newSlider

	let newSlider = new Swiper('.new-slider-js', {
		slidesPerView: 'auto',
		//loop: true,
		breakpoints: {
			0: {
				spaceBetween: 24,
			},
			768: {
				spaceBetween: 15,
			},
			1550: {
				spaceBetween: 30,
			},

		},

		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},
		//
		navigation: {
			nextEl: '.new-next--js',
			//prevEl: '.header-prev--js',
		},
	});
	//instagramSlider
	let instagramSlider = new Swiper('.instag-slider-js', {
		slidesPerView: 'auto',
		loop: true,

		breakpoints: {
			0: {
				spaceBetween: 18,
			},
			768: {
				spaceBetween: 20,
			},
			1368: {
				spaceBetween: 50,
			},
		},

		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
	});
	//footer js
	$('.foot-title-js').click(function (){
		$(this).toggleClass('active');
		$(this.parentElement).find('.foot-list-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});
	//breadcrumbs
	let breadSl = new Swiper('.breadcrumb-slider-js', {
		slidesPerView: 'auto',
		// spaceBetween: 30,
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,
	});
	//prod card sliders
	let prodCardThumb = new Swiper('.prod-thumb-js', {
		slidesPerView: 'auto',
		//
		breakpoints: {
			1: {
				direction: 'horizontal',
				spaceBetween: 6,
			},
			1024: {
				direction: 'vertical',
				spaceBetween: 10,
			},
			1368: {
				direction: 'vertical',
				spaceBetween: 20,
			},
		},

		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},

		//thumb
		// on: {
		// 	click: () => {
		// 		//photoGaleryThumb.slideTo(photoGaleryThumb.clickedIndex - 1, 700, false);
		// 		prodCardThumb.updateSlidesClasses();
		// 		prodCardSlider.updateSlidesClasses();
		// 	},
		// },

	});
	let prodCardSlider = new Swiper('.prod-slider-js', {
		spaceBetween: 20,
		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		loop: true,
		// on: {
		// 	click: () => {
		// 		//photoGaleryThumb.slideTo(photoGaleryThumb.clickedIndex - 1, 700, false);
		// 		prodCardThumb.updateSlidesClasses();
		// 		prodCardSlider.updateSlidesClasses();
		// 	},
		// },

	});
	//prod card dd
	$('.dd-title-js').click(function (){
		$(this).toggleClass('active');
		$(this.parentElement).find('.dd-content-js').slideToggle(function (){
			$(this).toggleClass('active');
		});
	});

	//end luckyone js

	// Aleksandr js start

	$('.accardion-toggle-js').on('click', function(){
		$(this).parent().toggleClass('active');
		$(this).parent().find('.accardion-inner-js').slideToggle().toggleClass('active');
	})

	// end Aleksandr js


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
