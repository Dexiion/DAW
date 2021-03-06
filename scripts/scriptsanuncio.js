
var counter = 1;


var carID ="";
var objJson = [];
var imagesLinks = [];
var accountJson = [];  

$(document).ready(function() {
    checkIfUserIsLogged();
    var params = getQueryParams();
    carID = params.get("carid")
    $.ajaxSetup({
        async: false
    });
    getCars();
    getImageLink();
    getProfile();
    
    $.ajaxSetup({
        async: true
    });
    createAdCard();
    createCarousel();
    createDesc();
    createInfoCar();
    createImagecontacto();
    createInfoContacto();

});

var getQueryParams = function() {
    return new URLSearchParams(window.location.search);
}

function getCars(){
    $.getJSON('../data/cars.json', function(cars) {
        
        objJson=cars.filter(car => car.ID == carID)
        
    });
    
}


function getImageLink() {
    $.getJSON('../data/carimages.json', function(images) {
        images.forEach(image => {
            if(image.IDCar == carID) {
                imagesLinks.push(image.Link);
            }
        });
    });
}

function getProfile() {
    $.getJSON('../data/accounts.json', function(accounts) {
        var userID = objJson[0].IDUsuario;
        accountJson = accounts.filter(account => account.ID == userID);
    });
}




var createAdCard = function(){
    var data = objJson[0];
    var firstHtmlCard = "<h3 class=\"card-title text-center\"> {{Marca}} {{Modelo}}  -  {{Precio}} € </h3>";
    var text = "";
    text = Mustache.render(firstHtmlCard, data);
    $('#MarcaPrecio').append(text);
}

var createDesc =  function(){
    var data = objJson[0];
    var desc = "<h4 class=\"box-title mt-3\">Descripcion</h4> \
    <p > {{Descripcion}} </p>";
    var text = "";
    text = Mustache.render(desc, data);
    $('#descripcion').append(text);

}

var createInfoContacto =  function(){
    var data = accountJson[0];
    var tablacontaco = " <table class=\"table table-striped table-product mt-2\"> \
        <tbody> \
            <tr> \
                <td >Nombre</td> \
                <td>{{NombreApellidos}}</td> \
            </tr> \
            <tr> \
                <td>Telefono</td> \
                <td>{{Telefono}}</td> \
            </tr> \
            <tr> \
                <td>Email</td> \
                <td><small>{{Email}}</td> \
            </tr> \
        </tbody> \
    </table>";

    var text = "";
    text = Mustache.render(tablacontaco, data);
    $('#tableVendedor').append(text);

}

var createImagecontacto = function() {
    var data = accountJson[0];
    var imagecont = "<h4 class=\"card-title text-center\"> Vendedor</h4> \
    <div class=\"white-box text-center\"> \
        <img src={{Imagen}} class=\"img-fluid\"> \
    </div>";
    var text = "";
    text = Mustache.render(imagecont, data);
    $('#fotocontacto').append(text);
}


var createInfoCar = function(){
    var data = objJson[0];
    var tabla = "<h4 class=\"box-title mt-lg-4\">Informacion del vehiculo</h4> \
    <div class=\"table-responsive\"> \
        <table class=\"table table-striped table-product \"> \
            <tbody> \
                <tr> \
                    <td width=\"390\" >Fecha de matriculación</td> \
                    <td>{{Matriculacion}}</td> \
                </tr> \
                <tr> \
                    <td>Kilómetros</td> \
                    <td>{{Kilometros}}</td> \
                </tr> \
                <tr> \
                    <td>Combustible</td> \
                    <td>{{Combustible}}</td> \
                </tr> \
                <tr> \
                    <td>Localizacion</td> \
                    <td>{{Localizacion}}</td> \
                </tr> \
                <tr> \
                    <td>Potencia</td> \
                    <td>{{Potencia}}</td> \
                </tr> \
                <tr> \
                    <td>Color</td>\
                    <td>{{Color}}</td> \
                </tr> \
                <tr> \
                    <td>Puertas</td> \
                    <td>{{Puertas}}</td> \
                </tr> \
                <tr> \
                    <td>Caja de cambios</td> \
                    <td>{{CajaDeCambios}}</td> \
                </tr> \
                <tr> \
                    <td>Cilindrada</td> \
                    <td>{{Cilindrada}}</td> \
                </tr> \
            </tbody> \
        </table> \
    </div>";

    var text = "";
    text = Mustache.render(tabla, data);
    $('#infotabla').append(text);
} 

var createCarousel = function(){

    if(imagesLinks.length > 0){
        imagesLinks.forEach(image => {
            var firstImage = "<div class=\"carousel-item justify-content-around active active\"> \
                <div class=\"card-image-anuncio\"> \
                    <img src=\"" + image + "\"> \
                </div>    \
            </div>";

            var otherImage = "<div class=\"carousel-item justify-content-around\"> \
                <div class=\"card-image-anuncio img\"> \
                    <img src=\"" + image + "\"> \
                </div>    \
            </div>";    
            if (counter == 1){
                $('#Imagenes').append(firstImage);
                counter--;
            }else{
                $('#Imagenes').append(otherImage);
            }
        });

        if (imagesLinks.length > 1) {
            var carouselNav = "<a class=\"carousel-control-prev bg-transparent w-aut \" href=\"#carouselId\" role=\"button\" data-bs-slide=\"prev\" style=\"height: 32px; width: 32px; margin-top: 13rem !important; margin-left: -1.8rem !important;\"> \
                <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span> \
            </a> \
            <a class=\"carousel-control-next bg-transparent w-aut\" href=\"#carouselId\" role=\"button\" data-bs-slide=\"next\" style=\"height: 32px; width: 32px; margin-top: 13rem !important; margin-right: -1.5rem !important;\"> \
                <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span> \
            </a>";
            $('#carouselNav').append(carouselNav);
        }

    }else{
        var firstImage = "<div class=\"carousel-item justify-content-around active active\"> \
                <div class=\"card-image-anuncio\"> \
                    <img src=\"../Imagenes/defaultCar.png\"> \
                </div>    \
            </div>";
        $('#Imagenes').append(firstImage);

    }
    
}

