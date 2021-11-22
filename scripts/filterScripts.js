var current_page = 1;
var records_per_page = 10;
var imageLink = "";
var objJson = [];
var imagesJson = []; 

$(document).ready(function() {
    var params = getQueryParams();
    if(params.get('location') == 'Provincia' && params.get('brand') == 'Marca' && params.get('fuel') == 'Combustible' && params.get('minprice') == 'Min.' && params.get('maxprice') == 'Max.' && params.get('doors') == 'Puertas') {
        var text = "<div class=\"col-10 mt-5 justify-content-center\"> \
        <div class=\"alert alert-primary h2 text-center\" role=\"alert\"> \
            No ha seleccionado ningun filtro \
        </div>\
    </div>";
        $('#filteredCars').append(text);
    } else {
        $.ajaxSetup({
            async: false
        });
        getFilteredCars(params);
        $.ajaxSetup({
            async: true
        });
    }
});

var getQueryParams = function() {
    return new URLSearchParams(window.location.search);
}

var formatParams = function(param) {
    if (param == "Provincia" || param == "Marca" || param == "Combustible" || param == "Min." || param == "Max." || param == "Puertas") {
        return "*";
    } else {
        return param
    }
}

var getFilteredCars = function(params) {
    var localizacion = formatParams(params.get('location'));
    var marca = formatParams(params.get('brand'));
    var combustible = formatParams(params.get('fuel'));
    var preciomin = formatParams(params.get('minprice'));
    var preciomax = formatParams(params.get('maxprice'));
    var puertas = formatParams(params.get('doors'));
    var navigationFilteredCars = document.getElementById("navigationFilteredCars");

    $.getJSON('../data/cars.json', function(coches) {
        
        var data = coches.filter( coche => (localizacion != "*" ? coche.Localizacion == localizacion : coche.Localizacion != "") && (marca != "*" ? coche.Marca == marca : coche.Marca != "") && (combustible != "*" ? coche.Combustible == combustible : coche.Combustible != "") && (preciomin != "*" ? coche.Precio >= preciomin : coche.Precio != "") && (preciomax != "*" ? coche.Precio <= preciomax : coche.Precio != "") && (puertas != "*" ? coche.Puertas == puertas : coche.Puertas != ""));

        if (data.length > 0) {
            var outstandingCars = data.filter(car => car.Destacado == 1);
            var otherCars = data.filter(car => car.Destacado != 1);
            outstandingCars.forEach(car => {
                objJson.push(car);
            });
            otherCars.forEach(car => {
                objJson.push(car);
            });
            navigationFilteredCars.innerHTML = "<nav aria-label=\"Page navigation example\"> \
                <ul class=\"pagination justify-content-center\"> \
                    <li class=\"page-item\"><a class=\"page-link\" id=\"btn_prev\" href=\"javascript:prevPage()\">Previous</a></li> \
                    <li class=\"page-item\"><a class=\"page-link\"><span id=\"page\"></span></a></li> \
                    <li class=\"page-item\"><a class=\"page-link\" id=\"btn_next\" href=\"javascript:nextPage()\">Next</a></li> \
                </ul> \
            </nav>";
            getImages();
            changePage(1);
        } else {
            // var text = "<p id=\"noFilteredCars\">NO HAY COCHES PARA LA BUSQUEDA SELECCIONADA</p>";
            var text = "<div class=\"col-10 mt-5 justify-content-center\"> \
                            <div class=\"alert alert-primary h2 text-center\" role=\"alert\"> \
                                No hay coches a mostrar para la busqueda seleccionada \
                            </div>\
                        </div>";
            
            $('#filteredCars').append(text);
        }
    });

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

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var filteredCars = document.getElementById("filteredCars");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    filteredCars.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        getImageLink(objJson[i].ID);
        var outstandingIcon = "";
        var carImage = imageLink;

        var descripcion = objJson[i].Descripcion;

        if (descripcion.length > 180) {
            descripcion = descripcion.substring(0,180) + "...";
        }

        if (!carImage) {
            carImage = "../Imagenes/defaultCar.png";
        }

        if (objJson[i].Destacado == 1) {
            outstandingIcon = "<i class=\"icon ion-ios-star\"></i>";
        }
        filteredCars.innerHTML += "<div class=\"col-lg-6 col-xs-12\"> \
            <div class=\"row\"> \
                <div class=\"col-12\"> \
                    <div class=\"courses-thumb courses-thumb-secondary\"> \
                        <div class=\"courses-top\"> \
                            <div class=\"courses-image text-center\"> \
                                <img src=\"" + carImage + "\" class=\"imgCoche\" alt=\"\"> \
                            </div> \
                            <div class=\"courses-date\"> \
                                <span title=\"Author\"><i class=\"fa fa-dashboard\"></i>" + objJson[i].Kilometros + " Km</span> \
                                <span title=\"Author\"><i class=\"fa fa-cube\"></i>" + objJson[i].Cilindrada + " CC</span> \
                                <span title=\"Views\"><i class=\"fa fa-cog\"></i>" + objJson[i].CajaDeCambios + "</span> \
                            </div> \
                        </div> \
                        <div class=\"courses-detail\"> \
                            <h3><a href=\"car-details.html\" class=\"carTitle\">" + outstandingIcon + " " + objJson[i].Marca + " " + objJson[i].Modelo + "</a></h3> \
                            <p class=\"lead\"><strong><b>" + objJson[i].Precio + "€</b></strong></p> \
                            <p>"+ objJson[i].Potencia +" &nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Combustible +" &nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Puertas + " Puertas &nbsp;&nbsp;/&nbsp;&nbsp; " + objJson[i].Localizacion + "</p> \
                            <p id=\"descripcion\">" + descripcion + "</p> \
                        </div> \
                        <div class=\"courses-info\"> \
                            <a href=\"infocoche.html?carid=" + objJson[i].ID + "\"class=\"btn btn-danger btn-lg btn-block\">View More</a>\
                        </div> \
                    </div> \
                </div> \
            </div> \
        </div>";
    }

}

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

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}
