jQuery(document).ready(function() {
	jQuery(".open-menu").click(function(){
		jQuery("#header,#mobile-header,#container,#footer").toggleClass('show');
	});
});

jQuery(document).ready(function() {
	jQuery("a.read-setting-toolbar").click(function(){
		jQuery(".read-setting").toggleClass('show');
	});
	jQuery("a.white").click(function(){
		jQuery("body").removeClass();
		jQuery("body").addClass('white');
	});
	jQuery("a.green").click(function(){
		jQuery("body").removeClass();
		jQuery("body").addClass('green');
	});
	jQuery("a.yellow").click(function(){
		jQuery("body").removeClass();
		jQuery("body").addClass('yellow');
	});
	jQuery("a.blue").click(function(){
		jQuery("body").removeClass();
		jQuery("body").addClass('blue');
	});
	jQuery("a.night").click(function(){
		//jQuery("body").toggleClass('night');
		jQuery("body").removeClass();
		jQuery("body").addClass('night');
	});
});

jQuery(document).ready(function() {
	fade();
});
function fade() {
	checkShow();
	jQuery(window).on('scroll', function(){//监听滚动事件
		checkShow();
	})
}
function isShow($el){
	var winH = jQuery(window).height(),//获取窗口高度
		scrollH = jQuery(window).scrollTop(),//获取窗口滚动高度
		top = $el.offset().top;//获取元素距离窗口顶部偏移高度
	if(top < scrollH + winH ){
		return true;//在可视范围
	}else{
		return false;//不在可视范围
	}
}
function checkShow() {
	jQuery(".fade").each(function(){
		if(jQuery(this).hasClass("show")){return;}
		if(isShow(jQuery(this))){jQuery(this).addClass("show");}
	});
}

jQuery.fn.postLike = function() {
    if (jQuery(this).hasClass('done')) {
        return false;
    } else {
        jQuery(this).addClass('done');
        var id = jQuery(this).data("id"),
        action = jQuery(this).data('action'),
        rateHolder = jQuery(this).children('.count');
        var ajax_data = {
            action: "bigfa_like",
            um_id: id,
            um_action: action
        };
        jQuery.post("/wp-admin/admin-ajax.php", ajax_data,
        function(data) {
            jQuery(rateHolder).html(data);
        });
        return false;
    }
};
jQuery(document).on("click", ".favorite",function() {
    jQuery(this).postLike();
});

jQuery(document).ready(function($) {
$(document).pjax('a[target!=_blank][pjax!="no"][rel!="nofollow"]', '#container', {fragment:'#container', timeout:6000});    
	$(document).on('pjax:send', function() {
		//$('#main-container').fadeTo(700,0.0);
		jQuery('body,html').animate({scrollTop: 0},100);
		$("#loading").css('display','block'); 
	});
	$(document).on('pjax:complete', function() {
		//$('#main-container').fadeTo(700,1);
		$("#loading").css('display','none'); 
		fade();
		var width = jQuery(".post-gallery img").width();
		jQuery(".post-gallery img").height(width);
		jQuery('[data-fancybox="gallery"]').fancybox();
		jQuery(function() {
      		jQuery(".post-gallery img, div.lazy").lazyload({effect: "fadeIn"});
  		});
	});
});

jQuery(document).ready(function() {
	//首先将#btn隐藏
	jQuery(".go-top").hide();
	//当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
	jQuery(function() {
	  jQuery(window).scroll(function() {
	    if (jQuery(window).scrollTop() > 50) {
	      jQuery(".go-top").fadeIn(200);
	    } else {
	      jQuery(".go-top").fadeOut(200);
	    }
	  });
	  //当点击跳转链接后，回到页面顶部位置
	  jQuery(".go-top").click(function() {
	    jQuery('body,html').animate({
	      scrollTop: 0
	    },
	    500);
	    return false;
	  });
	});
});