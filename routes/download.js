module.exports = function(app){	

	 app.get('/download/:nombre', function(req, res){
	 	var nombre = req.params.nombre;
	 	var file = "public/downloads/"+nombre+".docx";	 	
	 	res.download(file);
	 })
}