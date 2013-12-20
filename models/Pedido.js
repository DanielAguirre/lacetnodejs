var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Pedido = new Schema({
	nombre: String,
	email: String,
	fecha: String,
	total: String,
	codigo: String	
});

module.exports = mongoose.model("Pedidos", Pedido);