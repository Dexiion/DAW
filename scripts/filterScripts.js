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

    var count = 1;

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        if (count == 1) {
            filteredCars.innerHTML += "<div class=\"col-lg-5 col-md-8 mt-5 me-lg-5\"> \
            <div class=\"row\"> \
                <div class=\"col-lg-8 col-sm-6 \"> \
                    <div class=\"row \"> \
                        <div class=\"col-6 marca\"> \
                            <p>" + objJson[i].Marca + " " + objJson[i].Modelo + "</p> \
                        </div> \
                        <div class=\"col-6 precio justify-content-end\"> \
                            <p>" + objJson[i].Precio +"€</p> \
                        </div> \
                    </div> \
                    <div class=\"row\">" +
                        objJson[i].Descripcion +
                    " </div> \
                </div> \
                <div class=\"col-lg-4 col-sm-6\"> \
                    <img class=\"imgCoche d-flex justify-content-end\" src=\"Imagenes/corsaBueno.jpg\"/> \
                </div> \
                <div class=\"row p-0\"> \
                    <button class=\"button\" onclick=\"window.location.href='infocoche.html'\">Mas Info</button> \
                </div> \
            </div>";
            count--;
        } else {
            filteredCars.innerHTML += "<div class=\"col-lg-5 col-md-8 mt-5 ms-lg-5\"> \
            <div class=\"row\"> \
                <div class=\"col-lg-8 col-sm-6\"> \
                    <div class=\"row \"> \
                        <div class=\"col-6 marca\"> \
                            <p>" + objJson[i].Marca + " " + objJson[i].Modelo + "</p> \
                        </div> \
                        <div class=\"col-6 precio justify-content-end\"> \
                            <p>" + objJson[i].Precio +"€</p> \
                        </div> \
                    </div> \
                    <div class=\"row\">" +
                        objJson[i].Descripcion +
                    " </div> \
                </div> \
                <div class=\"col-lg-4 col-sm-6\"> \
                    <img class=\"imgCoche d-flex justify-content-end\" src=\"Imagenes/corsaBueno.jpg\"/> \
                </div> \
                <div class=\"row p-0\"> \
                    <button class=\"button\" onclick=\"window.location.href='infocoche.html'\">Mas Info</button> \
                </div> \
            </div>";
            count++;       
        }

    }

    page_span.innerHTML = page + "/" + numPages();

}

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}
