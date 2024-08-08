/*
	Name: Editor
	Description: Responsive HTML5 Template
	Version: 1.0
	Author: pixelwars
*/

(function($) { "use strict"; 
	
	/* global variables */
	var $masonry_container;
	
	/* DOCUMENT READY */
	$(function() {
		
		
		// ------------------------------
        // OWL-CAROUSEL
		var owl = $('.owl-carousel');
		if(owl.length) {
			owl.each(function(index, element) {
				//wait for images
				$(element).imagesLoaded( function() {
					
					//remove loading
					$(element).find('.loading').remove();
					
					var items = $(element).data('items');
					$(element).owlCarousel({
						loop: 				$(element).data('loop'),
						center : 			$(element).data('center'),
						mouseDrag : 		$(element).data('mouse-drag'),
						dots : 				$(element).data('dots'),
						nav : 				$(element).data('nav'),
						autoplay : 			$(element).data('autoplay'),
						autoplaySpeed : 	$(element).data('autoplay-speed'),
						autoplayTimeout : 	$(element).data('autoplay-timeout'),
						navText	:			[$(element).data('nav-prev-text') ,$(element).data('nav-next-text')],
						autoplayHoverPause :true,
						responsive:{
							0:		{ items: 1 },
							768:	{ items: items <= 2 ? items : 2 },
							1200:	{ items: items <= 3 ? items : 3 },
							1600:	{ items: items }
						}
					});
					
					
				});
			});	
		}
		// ------------------------------


		
		
		// ------------------------------
        // FIXED NAV MENU
			
		var previousScroll = 0, // previous scroll position
		menuOffset = 54, // height of menu (once scroll passed it, menu is hidden)
		detachPoint = 650, // point of detach (after scroll passed it, menu is fixed)
		hideShowOffset = 6; // scrolling value after which triggers hide/show menu
		var $navMenu = $('.site-navigation'),
			$html = $('html');
		
		// on scroll hide/show menu
		$(window).scroll(function() {
								
			if (!$html.hasClass('menu-expanded')) {
			var currentScroll = $(this).scrollTop(), // gets current scroll position
				scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling
			// if scrolled past menu
			if (currentScroll > menuOffset) {
			  // if scrolled past detach point add class to fix menu
			  if (currentScroll > detachPoint) {
				if (!$html.hasClass('menu-detached'))
				  $html.addClass('menu-detached');
			  }
			  // if scrolling faster than hideShowOffset hide/show menu
			  if (scrollDifference >= hideShowOffset) {
				if (currentScroll > previousScroll) {
				  // scrolling down; hide menu
				  if (!$html.hasClass('menu-invisible'))
					$html.addClass('menu-invisible');
				} else {
				  // scrolling up; show menu
				  if ($html.hasClass('menu-invisible'))
					$html.removeClass('menu-invisible');
				}
			  }
			} else {
			  // only remove “detached” class if user is at the top of document (menu jump fix)
			  if (currentScroll <= 0){
				$html.removeClass('menu-detached').removeClass('menu-invisible');
			  }
			}
			// if user is at the bottom of document show menu
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			  $html.removeClass('menu-invisible');
			}
			// replace previous scroll position with new one
			previousScroll = currentScroll;
		  }
				
		})// window.scroll
		
		
		// shows/hides navigation’s popover if class "expanded"
		$('.search-toggle').on('click', function(event) {
		  showHideNav();
		  event.preventDefault();
		})
		
		// checks if navigation’s popover is shown
		function showHideNav() {
		  if ($html.hasClass('menu-expanded')) {
			hideNav();
		  } else {
			showNav();
		  }
		}
		// shows the navigation’s popover
		function showNav() {
		  setTimeout(function() { $('.search-container input[type="search"]').trigger('focus') },300);
		  $html.removeClass('menu-invisible').addClass('menu-expanded');
		  window.setTimeout(function(){$('body').addClass('no_scroll');}, 200); // Firefox hack. Hides scrollbar as soon as menu animation is done
		}
		// hides the navigation’s popover
		function hideNav() {
		  window.setTimeout(function(){$('body').removeClass();}, 10); // allow animations to start before removing class (Firefox)
		  $html.removeClass('menu-expanded');
		}
		// keyboard shortcuts
		$('body').keydown(function(e) {
		  // if ESC show/hide menu
		  if (e.keyCode === 27) {
			showHideNav();
			e.preventDefault();
		  }
		})
		// ------------------------------
		


		// ------------------------------	
        // HEADER MENU TOGGLE
        $('.menu-toggle').click(function(e) {
            e.stopPropagation();
            $('html').toggleClass('is-menu-toggled-on');
            $('html').removeClass('is-search-toggled-on');
            $('html').removeClass('is-social-toggled-on');
        });
        // ------------------------------
        
        
		
		
		// ------------------------------
		// FILL PROGRESS BARS
		function fillBars() {
			$('.bar').each(function() {
				 var bar = $(this);
                 var percent = bar.attr('data-percent');
				 bar.find('.progress').css('width', percent + '%' ).html('<span>'+percent+'</span>');
				});
		}	
		fillBars();
		// ------------------------------
		
		
		
		// ------------------------------
		// Rotating Words
		var rotate_words = $('.rotate-words');
		if(rotate_words.length) {
			
			var next_word_index = 0;
			
			if(Modernizr.csstransforms) {
			
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active');
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
						$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
					},3000);
				});
	
			}
			else {
				
				rotate_words.each(function(index, element) {
					$(element).find('span').eq(0).addClass('active').show();
					setInterval(function(){
						next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
						$(element).find('.active').removeClass('active').slideUp(500);
						$(element).find('span').eq(next_word_index).addClass('active').slideDown(500);
					},3000);
				});
			}
		}
		// ------------------------------
		
		
        
		// ------------------------------
		// FluidBox : Zoomable Images
		$('.fluidbox-gallery a').fluidbox();
		$('.entry-content > p a, .wp-caption a').each(function(index, element) {
            if($(this).attr('href').match(/\.(jpeg|jpg|gif|png)$/) != null) {
				$(this).fluidbox();
				}
        });
		if(!($('html').hasClass('no-fluidbox'))) {
			$('.gallery a').fluidbox();
			}
        // ------------------------------
        
        
        // ------------------------------
        // READING TIME + SELECTION SHARER
		if(!$('html').hasClass("no-canvas")) { //disable on IE8 
			
			 // READING TIME
			 if($('.read-time').length) {	 
				 $('article').each(function() {
					
						$(this).readingTime({
							readingTimeTarget: $(this).find('.eta'),
							remotePath: $(this).find('.entry-title a').attr('href'),
							remoteTarget: 'article .entry-content'
						});
						
					});
			 }
            
            // Selection Sharer
            if($('.single').length) {	
                $('.single .post .entry-content p, .single .post .entry-content blockquote').selectionSharer();
            }
			 
		}
        // ------------------------------
        
        
	
        // ------------------------------
		/* BOOKS */
		var bookshelf = $('.bookshelf');
		if(bookshelf.length) {
			
			bookshelf.find('figure').each(function(index, element) {
				
				var el = $(this);
				var front = el.find('.front');
				front.css('background-image', 'url(' + front.find('img').attr('src') + ')');
				
				var spine = el.find('.spine');
				spine.css('background-image', 'url(' + spine.find('img').attr('src') + ')');
				
				el.find('.open-details').click(function() {
					el.addClass('details-open');
					return false;
				});
				
				el.find('.close-details').click(function() {
					el.removeClass('details-open');
				});
		
			});	
			
		}

		// csstransformspreserve3d check
		(function(Modernizr, win){
			Modernizr.addTest('csstransformspreserve3d', function () {
		
				var prop = Modernizr.prefixed('transformStyle');
				var val = 'preserve-3d';
				var computedStyle;
				if(!prop) return false;
		
				prop = prop.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
		
				Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
					computedStyle = win.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
				});
		
				return (computedStyle === val);
			});
		}(Modernizr, window));
        // ------------------------------
		

		
		// ------------------------------
		// remove click delay on touch devices
		//FastClick.attach(document.body);  ***not compatible with elastislide on ipad- nav arrows clicks don't work
		// ------------------------------
		
		
		
		// ------------------------------
		// LIGHTBOX
		setupLigtbox();
		// ------------------------------
	
			
		
		// ------------------------------
		// TABS
		$('.tabs').each(function() {
			if(!$(this).find('.tab-titles li a.active').length) {
				$(this).find('.tab-titles li:first-child a').addClass('active');
				$(this).find('.tab-content > div:first-child').show();
			} else {
				$(this).find('.tab-content > div').eq($(this).find('.tab-titles li a.active').parent().index()).show();	
			}
		});
		
		$('.tabs .tab-titles li a').click(function() {
			if($(this).hasClass('active')) { return; }
			$(this).parent().siblings().find('a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('.tabs').find('.tab-content > div').hide().eq($(this).parent().index()).show();
			return false;
		});
		// ------------------------------
		
		
		// ------------------------------
		// TOGGLES
		var toggleSpeed = 300;
		$('.toggle h4.active + .toggle-content').show();
	
		$('.toggle h4').click(function() {
			if($(this).hasClass('active')) { 
				$(this).removeClass('active');
				$(this).next('.toggle-content').stop(true,true).slideUp(toggleSpeed);
			} else {
				
				$(this).addClass('active');
				$(this).next('.toggle-content').stop(true,true).slideDown(toggleSpeed);
				
				//accordion
				if($(this).parents('.toggle-group').hasClass('accordion')) {
					$(this).parent().siblings().find('h4').removeClass('active');
					$(this).parent().siblings().find('.toggle-content').stop(true,true).slideUp(toggleSpeed);
				}
				
			}
			return false;
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// RESPONSIVE VIDEOS
		$("body").fitVids();
		// ------------------------------
		
		
		
		// ------------------------------
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
				
		
		
		// ------------------------------
		/* jQuery Ajax Mail Send Script */	
		var contactForm = $( '#contact-form' );
		var $submit = contactForm.find('.submit');
		
		contactForm.submit(function()
		{
			if (contactForm.valid())
			{
				$submit.addClass("active loading");
				var formValues = contactForm.serialize();
				
				$.post(contactForm.attr('action'), formValues, function(data)
				{
					if ( data == 'success' )
					{
						setTimeout(function() { 
							$submit.removeClass("loading").addClass("success"); 
							contactForm.clearForm();
						},2000);
					}
					else
					{
						$submit.removeClass("loading").addClass("error");
					}
				});
			}
			
			return false
		});

		$.fn.clearForm = function() {
		  return this.each(function() {
		    var type = this.type, tag = this.tagName.toLowerCase();
		    if (tag == 'form')
		      return $(':input',this).clearForm();
		    if (type == 'text' || type == 'password' || tag == 'textarea')
		      this.value = '';
		    else if (type == 'checkbox' || type == 'radio')
		      this.checked = false;
		    else if (tag == 'select')
		      this.selectedIndex = -1;
		  });
		};
		// ------------------------------
		
		
		
		
		// ------------------------------
		// MASONRY - ISOTOPE
		$masonry_container = $('.masonry');
		if($masonry_container.length) {
			$masonry_container.imagesLoaded(function() {
				$masonry_container.width($masonry_container.parent().width());
				// initialize isotope
				$masonry_container.isotope({
				  itemSelector : '.hentry',
				  layoutMode : $masonry_container.data('layout')
				});
				
				setMasonry();
				setTimeout(function() { $masonry_container.isotope(); }, 20);	
				$(window).resize(function() {
					// hack : make container width fixed
					$masonry_container.width($masonry_container.parent().width());
					setMasonry();					
				});
				
				// filter items when filter link is clicked
				$('#filters a').click(function(){
				  var selector = $(this).attr('data-filter');
				  setMasonry();
				  $masonry_container.isotope({ filter: selector });
				  $(this).parent().addClass('current').siblings().removeClass('current');
				  return false;
				});
				
			});
		}
		// ------------------------------
	
		// ------------------------------
        // FULL WIDTH IMAGES
		fullWidthImages();
		// ------------------------------
		
		
		
    });
    // DOCUMENT READY
	
	
	
	// WINDOW ONLOAD
	window.onload = function() {	
		
		
	};
	// WINDOW ONLOAD	
	
	
	
	
	// ------------------------------
	// ------------------------------
		// FUNCTIONS
	// ------------------------------
	// ------------------------------
	
	
	
	// ------------------------------
	// FULL WIDTH IMAGES
	function fullWidthImages() { 
		$('.content-area:not(.with-sidebar) img.full').each(function(index, element) {
			var full_img = element;
			$(full_img).imagesLoaded(function() {
				$('<div class="full-width-image"></div>').insertBefore(full_img);
				var wrapper = $(full_img).prev('.full-width-image');
				wrapper.append(full_img);
				wrapper.css("min-height", $(full_img).height());
			});
        });
		// adapt screen on resize
		$( window ).resize(function() {
			$('.full-width-image').each(function(index, element) {
            	$(this).css("min-height", $(this).find('img').height());    
            });
		});
	}
	// ------------------------------
	
	
	// ------------------------------
	// PORTFOLIO MASONRY LAYOUT : changes the number of masonry columns based on the current container's width
	function setMasonry() {
		
		var itemW = $masonry_container.data('item-width');
		var containerW = $masonry_container.width();
		var items = $masonry_container.children('.hentry');
		var columns = Math.round(containerW/itemW);
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = $(this).hasClass('x2') && columns > 1 ? 2 : 1;
			var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			$(this).css( 'width', itemRealWidth + '%' );
		});
	
		var columnWidth = Math.floor( containerW / columns );
		$masonry_container.isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// LIGHTBOX
	function setupLigtbox() {	
		
		if($(".lightbox").length) {
			
			$('.media-box, .r-gallery-single').each(function(index, element) {
				var $media_box = $(this);
				$media_box.magnificPopup({
					delegate: '.lightbox', // the selector for gallery item
					gallery: {
					  enabled: $media_box.find('.lightbox').length > 1 ? true : false
					},
					type: 'image',
					iframe: {
						 markup: '<div class="mfp-iframe-scaler">'+
									'<div class="mfp-close"></div>'+
									'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
									'<div class="mfp-title">Some caption</div>'+
								  '</div>'
					  },
					  callbacks: {
						markupParse: function(template, values, item) {
						 values.title = item.el.attr('title');
						},
				 	}
				});
				
			});
		}
	}
	// ------------------------------	
	
})(jQuery);
