var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var Articulo = new Schema({
	marca: String,
	modelo: String,
	precio: Number,
	imagen: String
});

// module.exports = mongoose.model("articulo", Articulo)
module.exports = mongoose.model("marcas", Articulo);