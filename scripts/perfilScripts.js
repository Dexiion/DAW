
var userID = "";
var accountJson=[];


$(document).ready(function() {
    checkIfUserIsLogged();
    userID = localStorage.getItem("userID");

    $.ajaxSetup({
        async: false
    });
    getProfile();
    
    $.ajaxSetup({
        async: true
    });
    createCardFoto();
    createCardData();
});


function getProfile() {
    $.getJSON('../data/accounts.json', function(accounts) {
        accountJson = accounts.filter(account => account.ID == userID);
    });
}




var createCardFoto = function(){
    var data = accountJson[0];
    var cardFoto = "<div class=\"text-center\"> \
        <img src=\"{{Imagen}}\" class=\"card-image-perfil rounded img-fluid\" alt=\"foto Usuario\"> \
    </div> \
    <div class=\"nombre\"> \
        <h5 class=\"text-center user-name\">{{NombreApellidos}}</h5> \
        <h6 class=\"text-center user-email\">{{Email}}</h6> \
    </div>";

    var text = "";
    text = Mustache.render(cardFoto, data);
    $('#cardFoto').append(text);
}



var createCardData = function(){
    var data = accountJson[0];
    $("#Nombre").attr('placeholder',data.NombreApellidos);
    $("#phone").attr('placeholder',data.Telefono);
    $("#edad").attr('placeholder',data.FechaNacimiento);
    $("#email").attr('placeholder',data.Email);
    $("#Provincia").attr('placeholder',data.Localizacion);
    $("#Codigo").attr('placeholder',data.CodigoPostal);



    Provincia
}



