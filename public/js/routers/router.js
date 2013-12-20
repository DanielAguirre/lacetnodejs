Lacet.Routers.Base = Backbone.Router.extend({
	routes:{
		"": "index",
		"articulos/:marca": "getArticulos",
		"articulos/:marca/:id": "getArticulo",
		"carrito/:id": "carrito",
		"usuario/:id": "usuario"
	},
	index: function(e){
		console.log("inicio");
		window.app.state ="root";
		window.app.article = null;
	},
	getArticulo: function(id){
		console.log("articulo"+id);
	},
	getArticulos: function(marca){
		window.app.state ="getArticulos";
		window.app.articles = marca;
	},
	carrito:function(){

	},
	usuario:function(){
		// debugger
		// 
	}
});