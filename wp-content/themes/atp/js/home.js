(function($, window, undefined){

var atp = {}, // declare atp namespace
	windowHeight, 
	windowWidth, 
	headerHeight = 0; // declare numeric variables
	
var siteHeader = $('.site-header');

/*atp.getObjects = function(){
	atpHeader	= $('#masthead');
}*/

atp.getWindowSize = function() {
	windowHeight	= $(window).height();
	windowWidth		= $(window).width();
	//homeNavHeight	= $('#masthead').height();
	//windowRatio		= windowWidth/windowHeight;
};

atp.sizeHomeContainers = function(){
	if(windowHeight > 420){	
		$(".home-content").css({
			'min-height' : windowHeight + "px"
		});
	}
};

atp.blurBackground = function(){
	var heroHeight		= $('#welcome').height(),
		scrollTop		= $(window).scrollTop();
		
		console.log('hero ht: ' + heroHeight + ' scroll top: ' + scrollTop);
		
	if(scrollTop > heroHeight ){
		$('#bg').addClass('blur');
	
	}else{
		$('#bg').removeClass('blur');
	}
	
}

/*atp.sizeGrid = function(){
			
	$('#projects-grid').css({
		'height' : (windowHeight) + "px"
	});
	
	//size the grid
	$('#projects-grid').css({
		'height' : (windowHeight - homeNavHeight) + "px"
	});
	
	//-> max number to display?
	//-> check window size and adjust cells
	if(windowWidth <= 320){
		var cells = 6;
	} else 
	if(windowWidth <= 800){
		var cells = 9;
	} else	
	if(windowWidth <= 600){
		var cells = 6;
	} else {
		var cells = 12;
	}

	//-> normalized aspect ratio of window
	var aspectRatio = (windowHeight/windowWidth) * (360/295);
	
	//-> get raw number of cols/rows
	var rows		= Math.round(Math.sqrt(aspectRatio * cells));
	var cols		= Math.round(Math.sqrt(cells / aspectRatio));
	
	//-> remove extra rows, if not div by cells
	if( (rows * cols) % cells )	{ rows =  rows - 1; }
	
	//-> set box dimensions
	var bHeight	= (Math.round(windowHeight / rows) / windowHeight) * 100;
	var bWidth	= (Math.round(windowWidth / cols) / windowWidth) * 100;
	
	//-> make boxes fit 100%
	if( bWidth * cols > 100 )	{ bWidth = 100 / cols; }
	if( bHeight * rows > 100 )	{ bHeight = 100 / rows; }

	//set the new dimensions
	$('.grid-item').css({
		'min-height' : bHeight + '%',
		'min-width' : bWidth + '%'
	});	
	
	//$('#masthead').insertAfter($('.grid-item:nth-child(' + cols*3 + ')'));
};*/

atp.fancyHeader = function(){
	var scrollTop = $(window).scrollTop();
		
	if(scrollTop >= windowHeight ){
		siteHeader.addClass('visible');
	}else{
		siteHeader.removeClass('visible');
	}
}

/*atp.addScrollToClass = function(){
	$('#menu-home li a').each(function(){
		$(this).addClass('scroll-to');
	});
}

atp.getProject = function(url){
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'html',
		success: function(data){
			var dom = $(data);
			var projectContent = dom.find('#page').html();
			atp.displayProject(projectContent);
		}
	}).done(function(){
		Spinner().stop();
	});						
}

atp.displayProject = function(projectContent){
	$('#project-content').html('<div id="page" class="site"><div class="close-project">close</div>' + projectContent + '</div>');
	$('#project-content #page').animate({
		opacity: 1
	}, 500);
}

atp.closeProject = function(){
	$('#project-content #page').animate({
		opacity: 0
	}, 500, function(){
		$('#project-content').remove();
		$('#site-wrapper').removeClass('fixit blur').css('top', 0);
	});
}

atp.hidePostsNav = function(){
	$('.site .site-content .nav-previous a, .site .site-content .nav-next a').addClass('hidden-nav');
}*/

atp.scrollTo = function(url){
	$('#page').removeClass('slide');	
	var containerScrollTop = $(url).offset().top;
	$('html,body').stop().animate({scrollTop: containerScrollTop }, 1000);
}

/*
atp.spinner = {
  lines: 15, // The number of lines to draw
  length: 0, // The length of each line
  width: 10, // The line thickness
  radius: 35, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ffffff', // #rgb or #rrggbb
  speed: 0.5, // Rounds per second
  trail: 75, // Afterglow percentage
  shadow: true, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};*/

$(document).ready(function(){
	
	//$('html').removeClass('no-js').addClass('js');
	
	//atp.getObjects();
	atp.getWindowSize();
	atp.sizeHomeContainers();
	/*atp.sizeGrid();
	atp.stickyHeader();
	atp.addScrollToClass();
	atp.hidePostsNav();*/
	
	$('.scroll-to a').click(function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		atp.scrollTo(url);
	});	
	
	/*$('.ajax-project').click(function(e){
		e.preventDefault();
		
		//see if the user has scrolled down at all fix site in place
		var pageOffset = ($(window).scrollTop())*-1;
		$('.site-wrapper').css('top', pageOffset + 'px').addClass('fixit blur');
		
		//throw up a spinner in the middle of the window
		$('body').append('<div id="project-content"></div>');
		var target = document.getElementById('project-content');
		var spinner = new Spinner(atp.spinner).spin(target);
		
		var url = $(this).attr('href');
		atp.getProject(url);
	});
	
	$('.modern-touch .grid-item').click(function(e){
		e.preventDefault();
		$('.grid-item').removeClass('hovered');
		$(this).addClass('hovered');
	});
	
	$('body').delegate('.close-project', 'click', function(){
		atp.closeProject();
	});
	
	$('body').delegate('#project-content .nav-previous a, #project-content .nav-next a', 'click', function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		
		$('#project-content #page').animate({
			opacity: 0
		}, 500, function(){
			$('#project-content #page').remove();
			var target = document.getElementById('project-content');
			var spinner = new Spinner(atp.spinner).spin(target);
			
			atp.getProject(url);
			
		});
	});*/
	
}); //end document ready


$(window).on("resize", function(){
	atp.getWindowSize();
	atp.sizeHomeContainers();
});

$(window).scroll(function(){
	//atp.fancyHeader();
	//atp.blurBackground();
});



})(jQuery, window);
