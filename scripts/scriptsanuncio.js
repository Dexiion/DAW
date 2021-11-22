
var counter = 1;


var carID ="";
var objJson = [];
var imagesLinks = [];
var accountJson = [];  

$(document).ready(function() {
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
    // console.log(objJson);
    // console.log(imagesLinks);
    // console.log(accountJson);

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

var createCarousel =function(){
    imagesLinks.forEach(image => {
        
        var firstImage = "<div class=\"carousel-item active\"> \
            <div class=\"card-image-anuncio\"> \
                <img src=\"" + image + "\"> \
            </div>    \
        </div>";

        var otherImage = "<div class=\"carousel-item\"> \
            <div class=\"card-image-anuncio\"> \
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

    
}

