/*==========================================================
http://www.matsusho-h.ed.jp
============================================================*/


imgPath = '/matrix/nimages';


// byon.js difference
var dif = 0;


// ie
var ltIE7 = $.browser.msie && parseFloat($.browser.version) < 7;
var ltIE8 = $.browser.msie && parseFloat($.browser.version) < 8;
var ltIE9 = $.browser.msie && parseFloat($.browser.version) < 9;
var IE    = $.browser.msie;


try { 
	document.execCommand('BackgroundImageCache', false, true); 
} catch(e) {} 



$(document).ready(function(){
//--============================================================================


//reset
	$("a").focus(function(){this.blur();})
	$("area").focus(function(){this.blur();})


if (ltIE7) {
	DD_belatedPNG.fix('.iepngfix');
}


//radius
if(IE) {
//	DD_roundies.addRule('.radius3', 3); 
}




//byon
pageScroll();


//hvop
$('.hvop a img').bind('mouseover',imgHv);


//gnv
var gnvLi = $('#header .gnv li');
gnvLi.hover(
	function() { $(this).find('.nm').stop().fadeTo(50, 0.0)  },
	function() { $(this).find('.nm').stop().fadeTo(400, 1.0) }
);
if(gnvID != ""){
	$('#gnv' + gnvID).find("img").attr('src',imgPath + '/header/gnvSl' + gnvID  + '.jpg').removeClass().addClass('sl');
}
gnvLi.each(function(i){
	if(!$(this).find('img').hasClass('sl')) {
		$(this).find('img').after('<img src="' + imgPath + '/header/gnvSl' + i + '.jpg" class="hvBg">');
	}
});



//lnv
if ($('#lnv').length) {
	var lnvLi = $('#lnv li');
	lnvLi.mouseover(function(){$(this).find('a').addClass('sl')})
		.mouseout(function(){$(this).find('a').removeClass('sl')});
	if(lnvID != ""){
		$('#lnv' + lnvID).unbind('mouseover').unbind('mouseout').find('a').addClass('sl');
	}
}






$('#crumb li:first-child').addClass('firstChild');


$('.indexLnv li:odd').addClass('oddElem');
var timer = setTimeout(function(){
	$('.indexLnv li a').flatHeights();
	clearTimeout(timer);
},100);


$('.listStyle1 li:last-child').addClass('lastChild');
$('.listStyle2 li:last-child').addClass('lastChild');


$('#footer1 .section').flatHeights();



//bannersフォームテンプレ
$('#bannersLoadBox').load('/matrix/ninc/rightColBannersFormTmpl.txt');



//--============================================================================
});


function imgHv() {
	$(this).stop().fadeTo(100,0.5).fadeTo(500,1.0);
}



$(function(){
	var va = $('#ft2Banners');
	var moveLayer = va.find('.move');
	var moveLayerUlInit = moveLayer.find('ul');
	var moveLayerLiInitCount = moveLayerUlInit.find('li').length;
	var controlBtn  = va.find('.btn');
	var initLeft = 0;
	var liWidth = 212;
	var currentPannel = 1;
	var thisLeft;
	var timer;
	
	
	moveLayerUlInit.clone().prependTo(moveLayer);
	moveLayerUlInit.clone().appendTo(moveLayer);
	moveLayer.css({
		left:  -liWidth * (moveLayerLiInitCount) + 'px',
		width: liWidth * moveLayer.find('li').length + 'px'
	})
	.find('a img').bind('mouseover',imgHv);
	

	controlBtn.find('img').mouseover(imgHv).click(function(){
		if(!$(this).hasClass('off')) {
			if($(this).parent().hasClass('BK')) move(1,900); 
			else if($(this).parent().hasClass('FWD')) move(-1,900); 
			
		}
	});
	
	function move(val,duration) {
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
				width: liWidth * moveLayer.find('li').length + 'px'
			});
		}
		else if(liWidth * (moveLayer.find('li').length -3) + thisLeft == liWidth) {
			moveLayerUlInit.clone().appendTo(moveLayer);
			moveLayer.css({
				width: liWidth * moveLayer.find('li').length + 'px'
			});
		}
		
		controlBtn.find('img').removeClass().addClass('on');
		moveLayer.addClass('hvop')
			.find('a img').bind('mouseover',imgHv);
	}

});



/* byon.js
 * Copyright (c) 2009 SACHIO MARUYAMA
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */
var pageScroll = function() {

	var scrolledX = scrolledY = null;
	var targetX = targetY = null;
	var scrollX,scrollY;
	var html = document.documentElement;
	var body = document.body;
	var scrollBtns = document.links;
	var url = location.href.replace(location.hash,"");
	
	var easing = 0.25;
	var interval = 30;
	
	
	for(var i=0;i<scrollBtns.length;i++){
		if(scrollBtns[i].getAttribute("href").match("#")){
			var btn = scrollBtns[i];
			btn.onclick = function(){
				var TargetId = (this.getAttribute("href").replace(url,"")).substr(1);
				if (document.getElementById(TargetId)) {
					var Target = document.getElementById(TargetId);
					try {
						var position = Target.getBoundingClientRect();
						targetX = position.left + (body.scrollLeft || html.scrollLeft) - html.clientLeft;
						targetY = position.top + (body.scrollTop || html.scrollTop) - html.clientTop;
					} catch(e) {
						targetX = Target.offsetLeft, targetY = Target.offsetTop;
					}
					scrollX = window.pageXOffset || html.scrollLeft || body.scrollLeft || 0;
					scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
					scroll();
					return false;
				}
			}
		}
	}

	function scroll(){
		var X = window.pageXOffset || html.scrollLeft || body.scrollLeft || 0;
		var Y = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
//			scrollX += Math.floor((targetX - X) * easing);
		scrollX = X;
		scrollY += Math.floor((targetY - Y + dif) * easing);
		if((targetY === scrollX && targetY === scrollY) || (X === scrolledX && Y === scrolledY)) {
			scrolledX = scrolledY = null;
		} else {
			window.scrollTo(scrollX, scrollY);
			scrolledX = X, scrolledY = Y;
			setTimeout(function(){scroll()},interval);
		}
	}
}





