/*================================
  //Slide_Banner//
==================================*/



$(function(){
	var va = $('#frontVA');
	var moveLayer = va.find('.move');
	var moveLayerUlInit = moveLayer.find('.ul');
	var moveLayerLiInitCount = moveLayerUlInit.find('.li').length;
	var controlBtn  = va.find('.btn');
	var initLeft = 0;
	var liWidth = 1034;
	var thisLeft;
	var timer;
	
	
	moveLayerUlInit.clone().prependTo(moveLayer);
	moveLayer.css({
		left:  -liWidth * (moveLayerLiInitCount - 1) + 'px',
		width: liWidth * moveLayer.find('.li').length + 'px'
	})
	.find('a img').bind('mouseover',imgHv);
	
	
	function loopslider(){
		timer = setInterval(function(){
			move(-1,1200);
		},7000);
	};
	loopslider();
	
	
	va.mouseenter(function(){clearTimeout(timer)})
		.mouseleave(loopslider);	
	

	controlBtn.find('img').mouseover(imgHv).click(function(){
		if(!$(this).hasClass('off')) {
			if($(this).parent().hasClass('BK')) move(1,900); 
			else if($(this).parent().hasClass('FWD')) move(-1,900); 
			
		}
	});
	
	function move(val,duration) {
		controlBtn.css({'display':'none'});
		controlBtn.find('img').removeClass().addClass('off');
		moveLayer.removeClass('hvop')
			.find('a img').unbind('mouseover');
		moveLayer.stop().animate(
			{left: moveLayer.position().left + val*liWidth + 'px'},
			duration,
			'easeInOutCirc',
			function(){afterMove(val)}
		);
	}
	
	function afterMove(val) {
		thisLeft = moveLayer.position().left;
		
		if(thisLeft == 0) {
			moveLayerUlInit.clone().prependTo(moveLayer);
			moveLayer.css({
				left:  thisLeft - liWidth * moveLayerLiInitCount + 'px',
				width: liWidth * moveLayer.find('.li').length + 'px'
			});
		}
		else if(liWidth * (moveLayer.find('.li').length -2) + thisLeft == liWidth) {
			moveLayerUlInit.clone().appendTo(moveLayer);
			moveLayer.css({
				width: liWidth * moveLayer.find('.li').length + 'px'
			});
		}
		controlBtn.css({'display':'block'});
		controlBtn.find('img').removeClass().addClass('on');
		moveLayer.addClass('hvop')
			.find('a img').bind('mouseover',imgHv);
	}

});


