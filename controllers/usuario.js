var mongoose       = require('mongoose')
    modeloUsuario  = require("../models/usuario")
    Usuario        = mongoose.model("usuario");
    mongoose.connect('localhost', 'lacet');
    // mongoose.connect("mongodb://daniel:12345@ds061198.mongolab.com:61198/lacet");

exports.iniciar =function(req, res){
    // modeloUsuario.findOne({nombre:req.body.usuario , password:req.body.password}, function(err, docs){
    //     if(err)
    //         throw err
    //     console.log(docs);
    //     req.session.nombre = docs.nombre;
    //     retStatus= "Success";
    //     res.send({
    //         retStatus: retStatus,
    //         redirecTo: '/proyecto',
    //         msg :"Just go there please",
    //         email: docs.email,
    //         usuario:docs.nombre
    //     });
    // })
}

exports.get = function(req, res){
    modeloUsuario.findOne({email: req.query.email, password:req.query.password},function(err, usuario){
        if(err)
            throw err;
        // req.session.nombre = usuario.nombre;
        // req.session.email = usuario.email;
        res.send(200,usuario)
    }) 
}

exports.post= function(req, res) {
    var usuario = new Usuario({
    	nombre: req.body.nombre,
    	email: req.body.email, 
    	password: req.body.password 
    });

    usuario.save(function(err){
        if(err) 
            return handleError(err)
        req.session.nombre = req.body.nombre;        
        req.session.nombre = req.body.email;
        res.send(200, usuario);
    });    
}
