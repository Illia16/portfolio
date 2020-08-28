//Script - All Custom frontend jQuery scripts & functions
setTimeout(function() { jQuery("body").addClass("loading"); },200); // Start loading animation

jQuery(window).load(function($) {		
	
	splitSection();
	jQuery(window).resize(function() {
		splitSection();
	});
	
	
	/*---------------------------------------------- 
			H I D E   P A G E   L O A D E R  + S M O O T H   S H O W
	------------------------------------------------*/
	var openSection = window.location.hash.substr(1);
	var borderWidthHeight = parseInt(jQuery("#bodyborder-top").height());
	jQuery("#page-loader .page-loader-inner").delay(500).fadeIn(10, function(){
		jQuery("body").addClass("loading-end");
		jQuery("#page-loader .page-loader-inner").fadeOut(1000, function(){
			if (openSection) { 
				jQuery('html,body').animate({ scrollTop: jQuery( "#"+openSection ).offset().top-jQuery("header").height()+80}, 10, 'easeInOutExpo'); 
			}	
		});
		jQuery("#page-loader").delay(1300).animate({top:borderWidthHeight+'px',height:jQuery(window).height()-(borderWidthHeight*2)+'px'},10).slideUp(1000, 'easeInOutExpo',function(){ jQuery("#page-loader").animate({top:'0',height:'100%'},10) });
	});
	
	
	
	/*---------------------------------------------- 
			T R A N S I T I O N   (when leaving the page)
	------------------------------------------------*/
	jQuery(window).unload(function() { });		// work-around for browser back button
	jQuery('.transition').click(function(e) {
		href = jQuery(this).attr('href');
		if (href.charAt(0) !== '#') {
			smoothtransistion(href);
			return false;
		} else {
			return true;
		}
	});
	
	function smoothtransistion(url) {
		jQuery("#page-loader").slideDown(800, 'easeInOutExpo', function() {
			setTimeout(function() { window.location = url; }, 300);
		});
		setTimeout(function() { jQuery("body").removeClass("loading-end"); }, 500);
	}
	
	
		
	if( jQuery().isotope ) {
		
		/*---------------------------------------------- 
					C A L L   I S O T O P E   
		------------------------------------------------*/	
		jQuery('.masonry').each(function(){
			var $container = jQuery(this);
			
			$container.imagesLoaded( function(){
				$container.isotope({
					itemSelector : '.masonry-item',
					transformsEnabled: true			// Important for videos
				});	
			});
		});
		
		
		/*---------------------------------------------- 
					I S O T O P E : Filter
		------------------------------------------------*/
		jQuery('.filter li a').click(function(){
			
			var parentul = jQuery(this).parents('ul.filter').data('related-grid');
			jQuery(this).parents('ul.filter').find('li a').removeClass('active');
			jQuery(this).addClass('active');
			
			var selector = jQuery(this).attr('data-option-value');
			jQuery('#'+parentul).isotope({ filter: selector }, function(){ });
			
			return(false);
		});
		
		
		/*---------------------------------------------- 
					I S O T O P E : reorganize
		------------------------------------------------*/
		function reorganizeIsotope() {
			jQuery('.masonry').each(function(){
				$container = jQuery(this);
				var maxitemwidth = $container.data('maxitemwidth');
				if (!maxitemwidth) { maxitemwidth = 370; }
				var containerwidth = Math.ceil((($container.width()+(parseInt($container.css('marginLeft'))*2)) / 120) * 100 - (parseInt($container.css('marginLeft'))*2));
				//alert(containerwidth);
				var itemmargin = parseInt($container.children('div').css('marginRight')) + parseInt($container.children('div').css('marginLeft'));
				var rows = Math.ceil(containerwidth/maxitemwidth);
				var marginperrow = (rows-1)*itemmargin;
				var newitemmargin = marginperrow / rows;
				var itemwidth = Math.floor((containerwidth/rows)-newitemmargin+1);
				//$container.css({ 'width': '110%' });
				$container.children('div').css({ 'width': itemwidth+'px' });
				if ($container.children('div').hasClass('isotope-item')) { $container.isotope( 'reLayout' ); }
			});
		}
		reorganizeIsotope();
			
		jQuery(window).resize(function() {
			reorganizeIsotope();
		});
		
		
	} /* END if isotope */
	
	
	
	/*---------------------------------------------- 
			D R O P   D O W N   N A  V I   (Mobile) + SHARE CLICK
	------------------------------------------------*/
	jQuery('nav#main-nav ul').on("click", "li", function() {
		if (jQuery(window).width() < 1025) {
			if (jQuery(this).find("ul").length > 0) {
				if (jQuery(this).find("ul").css('visibility') == 'hidden') {
					jQuery(this).addClass("hovered");
					return false;	
				} else {
					jQuery(this).removeClass("hovered");
					return false;	
				}
			}
		}
		var href = jQuery(this).find('a').attr('href');
		if (href.charAt(0) !== '#') {
			smoothtransistion(href);
			return false;
		} else {
			hideResponsiveNav();
			return true;
		}
	});
	
	
	
	
	/*---------------------------------------------- 
					O P E N   N A V 
	------------------------------------------------*/
	jQuery('header').on("click", ".open-nav", function() { 
		var hidden = jQuery('#main-nav').css('display');
		var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));
		var fullheight = jQuery(window).height()-(borderWidthHeight*2);
		
		if (hidden == 'block') {
			hideResponsiveNav();
		} else {
			jQuery('.open-nav span').toggleClass('is-clicked'); 
			jQuery('#main-nav').slideDown(700,'easeInOutExpo',function(){
				jQuery('#main-nav').addClass("nav-visible");
				var menuHeight = jQuery(".nav-inner").height();
				jQuery(".nav-inner").css({'max-height':menuHeight+'px'});
				if(menuHeight < fullheight) {
					var marginTop = parseInt((fullheight-menuHeight)/2);
				} else {
					var marginTop = 0;
				}
				jQuery(".nav-inner").animate({"marginTop": marginTop+'px', opacity: 1}, 700, 'easeInOutQuart');
			});
		}
		return false;
	});
	
	function hideResponsiveNav(){
		jQuery('.open-nav span').toggleClass('is-clicked'); 
		jQuery('#main-nav').removeClass("nav-visible");
		jQuery('.nav-inner').animate({marginTop: '0px', opacity: 0}, 700, 'easeInOutExpo', function(){ });
		jQuery("#main-nav").delay(100).slideUp(700,'easeInOutExpo');
		
	}
	
	
	
	
	
	
	
	
	/*---------------------------------------------- 
				B A C K   T O P   T O P
	------------------------------------------------*/
	jQuery('#backtotop').click(function(){
		jQuery('html, body').animate({scrollTop: 0}, 1000, 'easeInOutQuart');
		return false;						   
	});
	
});


jQuery( window ).scroll(function() {
	smoothShow();
});


// SMOOTH SHOW FUNCION FOR ELEMENTS THAT TAKE ACTION WHEN VISIBLE (counter & animations & skills, etc)
function smoothShow() {
	
	/*---------------------------------------------- 
					B I G   L E T T E R
	------------------------------------------------*/
	jQuery('h1[data-bigletter],h2[data-bigletter],h3[data-bigletter],h4[data-bigletter],h5[data-bigletter],h6[data-bigletter]').each(function() {
		if (jQuery(window).width() > 700) {
			var visible = jQuery(this).visible(false);
			if (visible) {
				if (jQuery(this).hasClass( "visible" )) {} else { jQuery(this).addClass("visible"); }
			} else {
				jQuery(this).removeClass("visible");
			}
		} else {
				jQuery(this).addClass("visible");
		}
	});
	
}


function splitSection() { 
	
	var borderWidthHeight = parseInt(jQuery("#bodyborder-top").height());
	
	/*---------------------------------------------- 
			S P L I T   S E C T I O N
	------------------------------------------------*/
	if (jQuery(".split-section").length > 0) {
		contentWidth =  jQuery(".wrapper").width();
		if(!contentWidth || contentWidth < 300) {
			contentWidth = 1080;
			if (jQuery(window).width() < 1281) { contentWidth = 900;  } else
			if (jQuery(window).width() < 1121) { contentWidth = 730; } else
			if (jQuery(window).width() < 861) { contentWidth = 280; }
		}
		contentThird =  Math.round(contentWidth/3);
		windowWidth =  jQuery(window).width()-(borderWidthHeight*2);
		difference = Math.round((windowWidth - contentWidth) /2);
		smallWidth = contentThird+difference+13;
		bigWidth = windowWidth-smallWidth;
		
		if (jQuery(window).width() < 861) { 
			jQuery(".split-onethird, .split-onethird .split-bg, .split-twothird, .split-twothird .split-bg").css({"width": "100%"});
		} else {
			jQuery(".split-onethird, .split-onethird .split-bg").css({"width": smallWidth+"px"});
			jQuery(".split-twothird, .split-twothird .split-bg").css({"width": bigWidth+"px"});
		}
		
		setTimeout(function() {
			jQuery(".split-section .vertical-center").each(function(index, element) { 
				var centerHeight =  jQuery(this).height();
				var padding =  parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom'));
				var fullHeight = centerHeight+padding;
				var splitHeight =  jQuery(this).parents(".split-section").height();
				if (fullHeight < splitHeight && jQuery(window).width() > 861) {
					var margin = (splitHeight-fullHeight)/2;
					jQuery(this).css({"marginTop": margin+"px"});
				} else {
					jQuery(this).css({"marginTop": "0px"});
				}
			});
		},500);
	}
	
	
	if (jQuery(window).width() < 861) { 
		jQuery(".split-left, .split-right").each(function(index, element) {
			var thisHeight = jQuery(this).height();
			if (thisHeight < 50) {
				jQuery(this).css({"min-height": "300px"});
			} 
		});
	}
	
}