Lacet.Views.App = Backbone.View.extend({
	events:{
		"click .registro"			 : "showRegistro",
		"click .sesion"				 : "showSesion",
		"click .logo"				 : "getHome",
		"click li a"				 : "getMarca",
		"submit .registrar form "	 : "creaUsuario",
		"submit .iniciarSesion form ": "logUsuario",
		"click #realizarPedido"		 : "pedido",
		"click #cancelarPedido"		 :"cancelarPedido" 
		
	},
	initialize: function ($el){
		this.$el = $el;
	},
	cancelarPedido:function(){
		var model;
		if(confirm("Estas seguro Que quieres Cancelar el Pedido")){
			localStorage.removeItem("carrito");
			$("#carrito").hide();
			while(model =window.collections.carrito.first()){
				model.destroy();
			}
		Backbone.history.navigate("", {trigger: true});
		$("#articulos").hide();
		$("#carrito").hide();
		$(".slider").show();
		window.views.app = new Lacet.Views.App($("body"));
		}
	},	
	creaUsuario: function(e){
		e.preventDefault();
		var listo    = true
	    var usuario  = $("div.registrar #usuario").val();
	    var correo   = $("div.registrar #email").val();
	    var password = $("div.registrar #password").val();
	    try{
	        check(usuario, 'El campo esta vacio').notEmpty();
	        check(usuario, 'El usuario no es valido').is(/^[a-zA-ZñÑ]+$/);
	        check(usuario, 'Minimo 5 caracteres').len(5);
	        check(usuario, 'Maximo 10 caracteres').len(5,10);
	    }catch (e){        
	        $(".errorregusuario").text(e.message);
	        listo=false;
	    }
	    try{
	        check(correo, "El campo esta vacio").notEmpty();
	        check(correo, "El correo valido").isEmail();
	    }catch(e){
	        $(".errorregemail").text(e.message);
	        listo=false;
	    }
	    try{
	        check(password, "El campo esta vacio").notEmpty();
	        check(password, "Minimo 4 caracteres").len(4);
	    }catch(e){
	        $(".errorregpassword").text(e.message);
	        listo=false;
	    }      		
		if(listo){
			var data ={
				"nombre": usuario,
				"email": correo, 
				"password": password
			};
			var modelo = new Lacet.Models.Usuario(data);
			modelo.save({}, {
				success: function(){
					window.collections.usuario  = new Lacet.Collections.Usuarios({email:data.email});
					window.collections.usuario.add(modelo);		
					window.collections.usuario.fetch({data:{email:[data.email]} }).done(function(respuesta){
						window.storage.nombre=respuesta.nombre
						window.storage.email=respuesta.email
	    				window.storage.id= respuesta._id
						var view = new Lacet.Views.Usuarios({model:modelo});
	    				view.render();
	    				$(".login").html("");
	    				view.$el.appendTo(".login");
	    				$('div.registrar').slideToggle();
	    			});
	    		},
	    		error: function(respuesta){ console.log("error"+respuesta)}
	    	});
	    }
	},
	getHome:function(){
		window.location.replace("/proyecto");
		// Backbone.history.navigate("", {trigger: true});
		// $("#articulos").hide();
		// $("#carrito").hide();
		// $(".slider").show();
		// window.views.app = new Lacet.Views.App($("body"));
	},
	getMarca: function(e){
		e.preventDefault();  
		e.stopPropagation();		
		marca=$(e.target).data("marca")	
		Backbone.history.navigate("articulos/"+marca, {trigger: true});
		window.collections.articulo = new Lacet.Collections.Articulos({marca:marca});
		window.collections.articulo
							.fetch({
								data:{marca: marca}	
							})
							.done(function(respuesta){								
								$(".slider").hide();
								$(".reporte").hide();
								$("#articulos").hide();
								$("#carrito .articulos").hide();
								$("#articulos").html("");
								for(i=0;i<respuesta.length;i++){
									var modelo = new Lacet.Models.Usuario(respuesta[i]);
									var view = new Lacet.Views.Articulos({model:modelo});
									view.render();
									view.$el.appendTo("#articulos");
									$(".total").hide()
								}
								$("#articulos").show()
							});		
	},
	logUsuario:function(e){
		e.preventDefault();  
		e.stopPropagation();
		var listo = true;
	    var correo   = $("div.iniciarSesion #email").val();
	    var password = $("div.iniciarSesion #password").val();		
		try{
	        check(correo, "El campo esta vacio").notEmpty();
	        check(correo, "El correo valido").isEmail();
	    }catch(e){
	        $("div.iniciarSesion .errorsesemail").text(e.message);
	        listo=false;
	    }
	    try{
	        check(password, "El campo esta vacio").notEmpty();
	        check(password, "Minimo 4 caracteres").len(4);
	    }catch(e){
	        $("div.iniciarSesion .errorsespassword").text(e.message);
	        listo=false;
	    }
	    if(listo){
	    	window.collections.usuario	= new Lacet.Collections.Usuarios();
	    	window.collections.usuario
	    							.fetch({
	    								data:{
	    									email:correo,
	    									password:password
	    								}
	    							})
	    							.done(function(respuesta){
	    								window.storage.nombre=respuesta.nombre
	    								window.storage.email=respuesta.email
	    								window.storage.id=respuesta._id
	    								var modelo = new Lacet.Models.Usuario(respuesta)
	    								var view = new Lacet.Views.Usuarios({model:modelo})
	    								view.render()
	    								$(".login").html("");
				    					view.$el.appendTo(".login");
				    					$('div.iniciarSesion').slideToggle();
	    							})
	    }
	},
	showRegistro: function(event){		
		event.preventDefault();
	    $('div.registrar').slideToggle();
	    $('div.sesion').slideUp();
	    $(".errorregusuario").text("");
	    $(".errorregemail").text("");
	    $(".errorregpassword").text("");
	},
	showSesion: function(e){
		e.preventDefault();
	    $('div.registrar').slideUp();
	    $('div.iniciarSesion').slideToggle();
	},
	pedido: function(){
		var f = new Date();
		fecha = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
		var codigo = uuid.v1();
		// for(var i =0;i<window.collections.carrito.length;i++){
			var data={
				nombre: window.storage.nombre,
				email: window.storage.email,
				fecha: fecha,
				total: $("#precio").text(),
				codigo: codigo				
			};
			var modelo = new Lacet.Models.Pedido(data)
			modelo.save();			
		// }
		localStorage.removeItem("carrito");
		$("#carrito").hide();
		while(model = window.collections.carrito.first()){
			model.destroy();
		}
		alert("Felicidades tu Pedido se ha Reaizado con Exito :)");		
	},
});