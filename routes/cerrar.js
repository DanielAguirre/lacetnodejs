/*
 * GET home page.
 */

module.exports = function(app){	
	app.get('/cerrar', function(req, res){
		req.session.destroy()
		res.render('proyecto/proyecto', { title: 'Lacet' });
		
	})
}