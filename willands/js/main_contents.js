/***** スムーススクロール *****/
$(function(){
	$('a[href^=#]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

/***** ホバー時の透明度変更 *****/
$(function(){
	$(".hover_img").hover(function(){
		$(this).stop().fadeTo(300,0.5);
	},
	function(){
		$(this).stop().fadeTo(300,1.0);
	});
});