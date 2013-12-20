Lacet.Views.Usuarios = Backbone.View.extend({
	events:{
		"click #cerrar": "cerrarSesion",
		"click .carrito ": "showCarrito",
		"click strong":"perfil",
		"click #realizarPedido": "pedido"
	},
	initialize: function(){
		this.template = _.template($("#usuarioTemplate").html());		
	},
	cerrarSesion: function(e){
		e.preventDefault();
		e.stopPropagation();
		localStorage.removeItem("email");
		localStorage.removeItem("nombre");
		localStorage.removeItem("id");
		localStorage.removeItem("carrito");
		window.location.replace("/proyecto/logut");
	},
	perfil: function(){	

		window.collections.pedidos = new Lacet.Collections.Pedidos();
		window.collections.pedidos
							.fetch({
								data:{email: window.storage.email}
							})
							.done(function(respuesta){
								$(".reporte").show();
								$(".reporte").html("");
								for(var i =0;i<respuesta.length;i++){
									console.log(respuesta[i]);									
									var modelo = new Lacet.Models.Pedido(respuesta[i]);
									console.log(modelo);
									var view = new Lacet.Views.Pedidos({model:modelo});
									view.render();									
									view.$el.appendTo(".reporte");
									$(".slider").hide();
									$("#articulos").hide();
									$("#carrito").hide();
								}
								Backbone.history.navigate("usuario/"+window.storage.id,{trigger: true});
							});
	},
	showCarrito: function(e){
		e.preventDefault();
		e.stopPropagation();
		$(".slider").hide();
		$("#articulos").hide();
		$(".reporte").hide();
		$("#carrito .total").slideDown();
		var total= 0;
		var carrito={};

		if(window.storage.carrito && !window.collections.carrito.length){
			carrito = JSON.parse(window.storage.carrito);
			for(var i =0; i <carrito.length;i++){
				var data = {
					_id: carrito[i]._id,
					marca:carrito[i].marca,
					modelo:carrito[i].modelo,
					precio:carrito[i].precio,
					imagen:carrito[i].imagen
				}
				var modelo = new Lacet.Models.Articulo(data);
				window.collections.carrito.add(modelo);
			}
		}
		$("#carrito .articulos").html("");
		for(var i =0;i<window.collections.carrito.length;i++){
			var modelo = new Lacet.Models.Articulo(window.collections.carrito.models[i].attributes);
			var view = new Lacet.Views.ArtiuloCarrito({model:modelo});
			console.log(modelo)
			total+=parseInt(modelo.attributes.precio);
			view.render();
			view.$el.appendTo("#carrito .articulos");
			$(".total #precio").html("$"+total+".00");
		}
		$("#carrito").show();
		$("#carrito .articulos").show();
		Backbone.history.navigate("carrito/"+window.storage.id,{trigger: true});
	},	
	render: function(){
		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html(html);
	}
});