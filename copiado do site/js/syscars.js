// JavaScript Document
$(document).ready(function(){
	NProgress.start();

	/*
	Extend jQuery with an "inview" selector to 
	select elements that are in the visible
	part of the page (at least partiacialy) 
	*/
	$.extend($.expr[':'], {
		inview: function(el) {
			var e = $(el),
			w = $(window),
			wt = w.scrollTop(),
			wb = wt + w.height(),
			et = e.offset().top,
			eb = et + e.height();
	
			return ( (eb >= wt) && (et <= wb) );
		}
	});
	
	$("ul#container img").lazyload({ 
		event : "scroll filter",
		effect : "fadeIn"
	});
	
	$.filtrify("container", "placeHolder", {
		block : ["data-original", "data-title", "data-toggle", "data-target", "data-remote"],
		callback : function( query, match, mismatch ) {
			$(match).find("img:inview").trigger("filter"); 
		} 
	}); 

    $('.object').tooltip({
       placement:"auto",
       container:"body",
       html:"true"
    });

	$("#bt_newsletter_submit").click(function(){
		var fnome = $("#field_newsletter_nome").val();
		var femail = $("#field_newsletter_email").val();
		if(fnome == "" || femail == "") {
			var n = noty({text: 'Digite seu nome e seu e-mail!', type: 'error'});
		} else {
			$.post( "/veiculos", { nome: fnome, email: femail, action:'addnewsletter' }).done(function() {
		    		var n = noty({text: 'E-mail cadastrado com sucesso!', type: 'success'});
		    		$("#field_newsletter_nome").val("");
		    		$("#field_newsletter_email").val("");
			});
		}
	});     

	$(".fancybox").fancybox();  

});
	
$(window).load(function(){
	NProgress.done();
});

$.noty.defaults = {
    layout: 'top',
    theme: 'defaultTheme',
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: 3000, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 5, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click'], // ['click', 'button', 'hover']
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {}
    },
    buttons: false // an array of buttons
};

