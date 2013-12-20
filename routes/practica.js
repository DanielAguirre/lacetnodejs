
/*
 * GET practica listing.
 */

module.exports = function(app){	

   app.get('/practica/:numero', function(req,res){
   numero=parseInt(req.params.numero);
	switch(numero){
		case 1:
			res.render('practicas/practica');
			break;
		case 2:	
			res.render('practicas/practica2');
			break;
		case 3:	
			res.render('practicas/practica3');
			break;	
		default:
			res.send("waht", "404");
			//  console.log("error");
			// next(404);	
		}
	})
}