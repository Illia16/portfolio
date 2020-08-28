//Script - fixed links
var headerHeight = jQuery("header").height();
var headerTopPos = jQuery("header").offset().top;
var headerStickyOnLoad = false;
var footerStickyOnLoad = false;
var headeroverlay = false;
var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));

jQuery(window).load(function($) {	
	var headerHeight = jQuery("header").height();
	
	/* Check if sticky on load */
	if (jQuery('.sticky-header').length > 0) { headerStickyOnLoad = true; }
	if (jQuery('.sticky-footer').length > 0) { footerStickyOnLoad = true; }
			
	/* BUGFIX for revolutionslider when header shrinks */
	jQuery('body').append('<div id="pseudo-header"></div>');
	
	initHeader();
	
});

jQuery( window ).resize(function() {
	initHeader();
});  

function initHeader() {
	var headerHeight = jQuery("header").height();
	var borderWidthHeight = parseInt(jQuery("#page-content").css("padding-top"));
	
	if (jQuery('.non-overlay').length > 0) {
		jQuery('#pseudo-header').css({ 'height':headerHeight+(borderWidthHeight*2)+'px', 'position':'absolute', 'top':0, 'left':0, 'opacity':0 });
	} else {
		jQuery('#pseudo-header').css({ 'height':(borderWidthHeight*2)+'px', 'position':'absolute', 'top':0, 'left':0, 'opacity':0, 'z-index':'-1' });
		if (jQuery('header.overlay-bottom').length > 0) { 
			setTimeout(function() { 
				offsetTop = parseInt( jQuery("#page-content section").first().height()-headerHeight+borderWidthHeight);
				jQuery('header').css({ 'top':offsetTop+'px' }); 
			},500);
		}
		headeroverlay = true;
	}
	
	/* Bugfix for browser don't allow calc(100vh-**) */
	if (jQuery('.full-height').length > 0) {
		jQuery('.full-height').css({ 'min-height':(jQuery(window).height()-borderWidthHeight-borderWidthHeight)+'px'});
	}
	if (jQuery('.portfolio-carousel-item').length > 0) {
		if (parseInt(jQuery('.portfolio-carousel-item').css("height")) > (jQuery(window).height()-borderWidthHeight-borderWidthHeight+1) ||
			parseInt(jQuery('.portfolio-carousel-item').css("height")) < (jQuery(window).height()-borderWidthHeight-borderWidthHeight-1)) {
			jQuery('.portfolio-carousel-item').css({ 'min-height':(jQuery(window).height()-borderWidthHeight-borderWidthHeight)+'px'});
		}
	}
	if (jQuery('.portfolio-slider-item').length > 0) {
		if (parseInt(jQuery('.portfolio-slider-item').css("height")) > (jQuery(window).height()-borderWidthHeight-borderWidthHeight+1) ||
			parseInt(jQuery('.portfolio-slider-item').css("height")) < (jQuery(window).height()-borderWidthHeight-borderWidthHeight-1)) {
			jQuery('.portfolio-slider-item').css({ 'min-height':(jQuery(window).height()-borderWidthHeight-borderWidthHeight)+'px'});
		}
	}
}

jQuery( window ).scroll(function() {
	fixHeader();
});

function fixHeader() {
	if (jQuery('header.non-sticky').length < 1 && jQuery('#page-loader').css('display') !== 'block' && !headerStickyOnLoad) { 
			
		if (jQuery("header").is(':first-child')) { headerTopPos = 0+borderWidthHeight; } 
		else { headerTopPos = jQuery("#page-content section").first().height()+borderWidthHeight; }
		
		
		if (headeroverlay) { 
			if (jQuery('header.overlay-bottom').length < 1) { headerTopPos = 0+borderWidthHeight; }
			else { headerTopPos = jQuery("#page-content section").first().height()+borderWidthHeight-headerHeight; } 
		}
				
		var scrollTopPos = jQuery( window ).scrollTop();
		if (scrollTopPos-headerHeight+borderWidthHeight > headerTopPos) {
			jQuery("header").addClass("sticky-header");
			if (jQuery('#sticky-header-pseudo').length < 1 && !headeroverlay) {
				jQuery("header").after('<div id="sticky-header-pseudo"></div>');
				jQuery('#sticky-header-pseudo').css({ 'height':headerHeight+'px'});
			} else if (headeroverlay) {
				jQuery('#sticky-header-pseudo').remove();
			}
			
			// Animate Footer if border is active
			if (borderWidthHeight > 0 && !footerStickyOnLoad) { jQuery("footer").addClass("sticky-footer"); }
		} else {
			jQuery("header").removeClass("sticky-header");
			//jQuery('header.overlay-bottom').css({ 'top':headerTopPos+'px' });
			if (jQuery('#sticky-header-pseudo').length > 0 && !headeroverlay) {
				jQuery('#sticky-header-pseudo').remove();
			}
			// Animate Footer if border is active
			if (borderWidthHeight > 0 && !footerStickyOnLoad) { jQuery("footer").removeClass("sticky-footer"); }
		}
	} else if (jQuery('header.non-sticky').length > 0 || headerStickyOnLoad && !footerStickyOnLoad && borderWidthHeight > 0) {
		// Footer Sticky
		if (jQuery( window ).scrollTop() > 100) {
			jQuery("footer").addClass("sticky-footer");
		} else {
			jQuery("footer").removeClass("sticky-footer");
		}
	}
}

