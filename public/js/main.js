$(function(){
	var f = new Date();
	console.log( f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
	if(window.storage.email){
		var data ={
				"nombre": window.storage.nombre,
				"email": window.storage.email
			};
		var modelo = new Lacet.Models.Usuario(data);
		var view = new Lacet.Views.Usuarios({model:modelo});
		view.render();
		$(".login").html("");
		view.$el.appendTo(".login");
		console.log("main.js loaded");
	}

	$(".rslides").responsiveSlides({
        auto: true,             // Boolean: Animate automatically, true or false
        speed: 500,            // Integer: Speed of the transition, in milliseconds
        timeout: 3000,          // Integer: Time between slide transitions, in milliseconds
        pager: false,           // Boolean: Show pager, true or false
        nav: false,             // Boolean: Shownavigation, true or false
        random: false,          // Boolean: Randomize the order of the slides, true or false
        pause: false,           // Boolean: Pause on hover, true or false
        pauseControls: true,    // Boolean: Pause when hovering controls, true or false
        prevText: "Previous",   // String: Text for the "previous" button
        nextText: "Next",       // String: Text for the "next" button
        maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
        navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
        manualControls: "",     // Selector: Declare custom pager navigation
        namespace: "rslides",   // String: Change the default namespace used
        before: function(){},   // Function: Before callback
        after: function(){}     // Function: After callback
    });

	window.routers.base = new Lacet.Routers.Base();
	window.collections.carrito = new Lacet.Collections.Carrito();
	window.views.app = new Lacet.Views.App($("body"));
	Backbone.history.start({
		root: "/proyecto",
		pushState: true,
		silent: false
	});
});