jQuery(document).ready(function() {
	jQuery(".open-menu").click(function(){
		jQuery("#header,#mobile-header,#container,#footer").toggleClass('show');
	});
});

jQuery(document).ready(function() {
	jQuery("a.night").click(function(){
		jQuery("body").toggleClass('night');
	});
});

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
$(document).pjax('a[target!=_blank][pjax!="no"][rel!="nofollow"]', '#main-container', {fragment:'#main-container', timeout:6000});    
	$(document).on('pjax:send', function() {
		//$('#main-container').fadeTo(700,0.0);
		jQuery('body,html').animate({scrollTop: 0},100);
		$("#loading").css('display','block'); 
	});
	$(document).on('pjax:complete', function() {
		//$('#main-container').fadeTo(700,1);
		$("#loading").css('display','none'); 
		var width = jQuery(".post-gallery img").width();
		jQuery(".post-gallery img").height(width);
		jQuery(".gallery-item a").attr('data-fancybox','gallery');
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