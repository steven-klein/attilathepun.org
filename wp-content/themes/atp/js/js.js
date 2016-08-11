(function($, window, undefined){
	
	$('html').removeClass('no-js').addClass('js');
	
	var atp = {}, // declare atp namespace
		windowHeight, 
		windowWidth, 
		headerHeight = 0; // declare numeric variables
	
	$(document).ready(function(){
		
		$(".menu-toggle").click(function(){
			if($('#page').hasClass('slide')){
				$('#page').removeClass('slide');	
				
			}else{
				$('#page').addClass('slide');
			}
		});
		
		$(".gallery-icon a").each( function(){
			var rel = $(this).parents('.gallery').attr('id');
			$(this).attr('rel', rel);
		});
		
		$(".gallery-icon a").fancybox({
		    helpers:  {
		        openEffect	: 'none',
		        closeEffect	: 'none',
		        prevEfect	: 'fade',
		        nextEffect	: 'fade',
		        title 	: {
		        		type: 'inside'
		        },
		        thumbs	: {
		        		width : 50,
		        		height: 50
		        }
		    }
		});			
	}); //end document ready
	
	$(window).on("resize", function(){
	
	});
	
	$(window).scroll(function(){
	
	});

})(jQuery, window);











