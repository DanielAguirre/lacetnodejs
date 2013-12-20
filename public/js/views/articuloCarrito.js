Lacet.Views.ArtiuloCarrito = Backbone.View.extend({
	events:{
		"click a": "borrarArticulo"
	},
	initialize: function(){
		this.template = _.template($("#articuloCarritoTemplate").html());
	},
	render:function(){
		var data = this.model.toJSON();
		console.log(data)
		var html = this.template(data);
		this.$el.html(html);
	},
	renderTotal:function(total){
		var data = {total:total};
		var totalTemplate = _.template($("#totalTemplate").html());
		var html = totalTemplate(data);
		this.$el.html(html);
	},
	borrarArticulo: function(){
		var total=$("#precio").text();
		total=parseInt(total.substring(1,5));
		debugger
		if(confirm("Estas Seguro que quieres eliminar este articulo")){
			for (var i =0;i< window.collections.carrito.length ; i++){
				if(window.collections.carrito.models[i].attributes._id===this.model.get("_id")){
					modelo = window.collections.carrito.models[i];
					total-=parseInt(modelo.attributes.precio);;
					window.collections.carrito.remove(modelo);
					this.$el.hide();
				}
			localStorage.removeItem("carrito");
			window.storage.carrito= JSON.stringify(window.collections.carrito);
			}
			$(".total #precio").html("$"+total+".00");
		}
	},
	total:function(){
		var total=0;
		totalTemplate = _.template($("#totalTemplate").html());
		for (var i =0;i< window.collections.carrito.length ; i++){
			total+=window.collections.carrito.models[i].attributes.precio;
		}
		var data = { total:total};
		var html = totalTemplate(data);
		this.$el.html(html);
	}
});