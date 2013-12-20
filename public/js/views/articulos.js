Lacet.Views.Articulos = Backbone.View.extend({
	events:{
		"click img": "addCarrito"
	},
	initialize: function(){
		this.template = _.template($("#articulosTemplate").html());
	},
	render:function(){
		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html(html);
	},
	addCarrito: function(e){
		e.preventDefault();
		e.stopPropagation();
		if(window.storage.email){
			var modelo = new Lacet.Models.Articulo(this.model.toJSON());
			window.collections.carrito.add(modelo);
			window.storage.carrito= JSON.stringify(window.collections.carrito);
		}
		else
			alert("tienes que registrarteo iniciar sesion para agregar un producto al carrito");
	}
});