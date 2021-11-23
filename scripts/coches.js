var current_page = 1;
var records_per_page = 10;

var objJson = []; // Can be obtained from another source, such as your objJson variable
var imagesJson = []; 
var imageLink = "";



function prevPage()
{
    if (current_page > 1) {
        current_page--;
        $('html,body').scrollTop(0);
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        $('html,body').scrollTop(0);
        changePage(current_page);
    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var allCarsHTML = document.getElementById("allCars");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    allCarsHTML.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {


        getImageLink(objJson[i].ID);
        var outstandingIcon = "";

        var descripcion = objJson[i].Descripcion;

        if (descripcion.length > 180) {
            descripcion = descripcion.substring(0,180) + "...";
        }

        if (objJson[i].Destacado == 1) {
            outstandingIcon = "<i class=\"icon ion-ios-star\"></i>";
        }
        allCarsHTML.innerHTML += "<div class=\"col-lg-6 col-xs-12\"> \
            <div class=\"row\"> \
                <div class=\"col-12\"> \
                    <div class=\"courses-thumb courses-thumb-secondary\"> \
                        <div class=\"courses-top\"> \
                            <div class=\"courses-image text-center\"> \
                                <img src=\"" + imageLink + "\" class=\"imgCoche\" alt=\"\"> \
                            </div> \
                            <div class=\"courses-date\"> \
                                <span title=\"Author\"><i class=\"fa fa-dashboard\"></i>" + objJson[i].Kilometros + " Km</span> \
                                <span title=\"Author\"><i class=\"fa fa-cube\"></i>" + objJson[i].Cilindrada + " CC</span> \
                                <span title=\"Views\"><i class=\"fa fa-cog\"></i>" + objJson[i].CajaDeCambios + "</span> \
                            </div> \
                        </div> \
                        <div class=\"courses-detail\"> \
                            <h3><a href=\"infocoche.html?carid=" + objJson[i].ID + "\"class=\"carTitle\">" + outstandingIcon + " " + objJson[i].Marca + " " + objJson[i].Modelo + "</a></h3> \
                            <p class=\"lead\"><strong><b>" + objJson[i].Precio + "€</b></strong></p> \
                            <p>"+ objJson[i].Potencia +" CV&nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Combustible +" &nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Puertas + " Puertas &nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Localizacion + "</p> \
                            <p>" + descripcion + "</p> \
                        </div> \
                        <div class=\"courses-info\"> \
                            <a href=\"infocoche.html?carid=" + objJson[i].ID + "\"class=\"btn btn-danger btn-lg btn-block\">Mas Info</a>\
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div>";

    }

    page_span.innerHTML = page + "/" + numPages();

}

function getImageLink(idCar) {
    for (let i = 0; i < imagesJson.length; i++) {
        const image = imagesJson[i];
        if(image.IDCar == idCar) {
            imageLink = image.Link;
            break;
        } else {
            imageLink = "../Imagenes/defaultCar.png";
        }
    }
}

function getImages() {
    $.getJSON('../data/carimages.json', function(images) {
        images.forEach(image => {
            imagesJson.push(image);
        });
    });
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}


$(document).ready(function() {
    checkIfUserIsLogged();
});

window.onload = function() {

    $.ajaxSetup({
        async: false
    });
    $.getJSON('../data/cars.json', function(cars) {
        var outstandingCars = cars.filter(car => car.Destacado == 1);
        var otherCars = cars.filter(car => car.Destacado != 1);
        outstandingCars.forEach(car => {
            objJson.push(car);
        });
        otherCars.forEach(car => {
            objJson.push(car);
        });
        getImages();
    });
    $.ajaxSetup({
        async: true
    });
    changePage(1);
};