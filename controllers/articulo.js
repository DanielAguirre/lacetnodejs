var mongoose 	   = require("mongoose"),
	modeloArticulo =require("../models/articulo"),
	articulo 	   = mongoose.model("marcas");
	// mongoose.connect("localhost", "lacet");

exports.get = function(req, res){
	console.log(req.query.marca);
	modeloArticulo.find({marca:req.query.marca},function(err,articulos){
		if(err)
			throw err;		
		res.send(200,articulos);
	});
}