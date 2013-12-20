var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var Usuario = new Schema({
	nombre: String,
	email: 	{
    	type: String,
    	index: { unique: true }
  	},
	password: String,
	fecha: {type: Date, default: Date.now}
});

Usuario.methods.prueba=function(){
	console.log("Prueba modelo");
}

module.exports = mongoose.model("usuario", Usuario);
