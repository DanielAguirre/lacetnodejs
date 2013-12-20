var controladorUsuario = require('../controllers/usuario');
var controladorArticulo = require("../controllers/articulo");
var controladorPedido = require("../controllers/Pedidos");

module.exports = function(app){		

	app.get('/proyecto', function(req, res){				
		if(typeof (req.session.nombre != undefined)){			
			res.render('proyecto/proyecto', { title: 'Lacet', nombre: req.session.nombre});			
		}
		else
			res.render('proyecto/proyecto', { title: 'Lacet'});	

	})	
	
	app.get("/proyecto/registrar", controladorUsuario.get);

	app.get("/proyecto/logut",function(req,res){		
		req.session.destroy();
		res.redirect("/proyecto");
	});
	
	app.get("/proyecto/usuario", controladorUsuario.get);
	app.get("/proyecto/articulos/", controladorArticulo.get);	
	app.get("/proyecto/pedido",controladorPedido.get);	

	app.post("/proyecto/usuario", controladorUsuario.post);
	app.post("/proyecto/pedido",controladorPedido.post)
	app.post("/login",controladorUsuario.iniciar)
}