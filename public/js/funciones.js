$(function(){    
	$('#home').on('click',function(){
		window.location.replace("/");
	});	

	$('.logo').on('click',function(){
        window.location.replace("/proyecto");
    }); 

	$(".rslides").responsiveSlides({
        auto: true,             // Boolean: Animate automatically, true or false
        speed: 500,            // Integer: Speed of the transition, in milliseconds
        timeout: 4000,          // Integer: Time between slide transitions, in milliseconds
        pager: false,           // Boolean: Show pager, true or false
        nav: false,             // Boolean: Show navigation, true or false
        random: false,          // Boolean: Randomize the order of the slides, true or false
        pause: false,           // Boolean: Pause on hover, true or false
        pauseControls: true,    // Boolean: Pause when hovering controls, true or false
        prevText: "Previous",   // String: Text for the "previous" button
        nextText: "Next",       // String: Text for the "next" button
        maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
        navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
        manualControls: "",     // Selector: Declare custom pager navigation
        namespace: "rslides",   // String: Change the default namespace used
        before: function(){},   // Function: Before callback
        after: function(){}     // Function: After callback
    });
  

  $("#login").on("click",function(){    
    event.preventDefault();
    var usuario    = $("div.sesion #usuario").val();
    var password = $("div.sesion #password").val();        
    $.post("/login",{usuario: usuario,password:password},
        function(respuesta){
            $('div.sesion').slideToggle();
            platillaUsuario(respuesta);
        })
  });

  $("#registro").on("click", function(event){

    event.preventDefault(); 
    var listo    = true
    var usuario  = $("div.registrar #usuario").val();
    var correo   = $("div.registrar #email").val();
    var password = $("div.registrar #password").val();

    try{
        check(usuario, 'El campo esta vacio').notEmpty();
        check(usuario, 'El usuario no es valido').is(/^[a-zA-ZñÑ]+$/);
        check(usuario, 'Minimo 5 caracteres').len(5);
        check(usuario, 'Maximo 10 caracteres').len(5,10);
    }catch (e){        
        $(".errorregusuario").text(e.message);
        listo=false;
    }
    try{
        check(correo, "El campo esta vacio").notEmpty();
        check(correo, "El correo valido").isEmail();
    }catch(e){
        $(".errorregemail").text(e.message);
        listo=false;
    }
    try{
        check(password, "El campo esta vacio").notEmpty();
        check(password, "Minimo 4 caracteres").len(4);
    }catch(e){
        $(".errorregpassword").text(e.message);
        listo=false;
    }      
    if(listo)
         $.post( "/registrarse",{ usuario: usuario, email: correo, password:password },
            function(respuesta){
                $('div.registrar').slideToggle();
                platillaUsuario(respuesta);        
                }
         );
  })

  $("a.registro").on("click",function(event){
    event.preventDefault();    
    $('div.registrar').slideToggle(); 
    $('div.sesion').slideUp();
    $(".errorregusuario").text("");
    $(".errorregemail").text("");
    $(".errorregpassword").text("");
  });
  
  $("a.sesion").on("click",function(){
    event.preventDefault();
    $('div.registrar').slideUp(); 
    $('div.sesion').slideToggle();
  });

});

function platillaUsuario(data){    
    template = Handlebars.compile(
        " <a href='#' class='carrito'></a>"+
        "<strong>{{usuario}}</strong>"+
        "<a href='/cerrar'>Cerrar Sesion</a>"
        );
    $(".login").html(template(data)); 
}