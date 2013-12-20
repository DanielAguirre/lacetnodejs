var mongoose 	   = require("mongoose"),
	modeloPedido =require("../models/Pedido"),
	Pedido= mongoose.model("Pedidos");

exports.post = function(req,res){	
	// var pedido = new Pedido({
	// 	nombre: req.body.nombre,
	// 	email: req.body.email,
	// 	total: req.body.total,
	// 	fecha: req.body.fecha,
	// 	codigo:req.body.codigo,
	// 	articulo:req.body.articulo,
	// });
	var pedido = new Pedido({
		nombre: req.body.nombre,
		email: req.body.email,
		total: req.body.total,
		fecha: req.body.fecha,
		codigo:req.body.codigo		
	});	
	pedido.save(function(err){
		if(err)
            throw err;
        res.send(200);
	});
};

exports.get = function(req,res){
	modeloPedido.find({email : req.query.email},function(err, pedidos){
        if(err)
            throw err;
        console.log(pedidos);
        res.send(200,pedidos);
    });
};