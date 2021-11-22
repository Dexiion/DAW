var current_page = 1;
var records_per_page = 10;

var objJson = []; // Can be obtained from another source, such as your objJson variable

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

    var count = 1;

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {


        if (count == 1) {
            allCarsHTML.innerHTML += "<div class=\"col-lg-5 col-md-8 mt-5 me-lg-5\"> \
            <div class=\"row\"> \
                <div class=\"col-lg-8 \"> \
                    <div class=\"row \"> \
                        <div class=\"col-4\"> \
                            <p>" + objJson[i].Marca + " " + objJson[i].Modelo + "</p> \
                        </div> \
                        <div class=\"col-4\"></div> \
                        <div class=\"col-4\"> \
                            <p>" + objJson[i].Precio +"€</p> \
                        </div> \
                    </div> \
                    <div class=\"row\">" +
                        objJson[i].Descripcion +
                    " </div> \
                </div> \
                <div class=\"col-lg-4\"> \
                    <img class=\"imgCoche d-flex justify-content-end\" src=\"Imagenes/corsaBueno.jpg\"/> \
                </div> \
                <div class=\"row\"> \
                    <button class=\"button\" onclick=\"window.location.href='infocoche.html'\">Mas Info</button> \
                </div> \
            </div>";
            count--;
        } else {
            allCarsHTML.innerHTML += "<div class=\"col-lg-5 col-md-8 mt-5 ms-lg-5\"> \
            <div class=\"row\"> \
                <div class=\"col-lg-8 \"> \
                    <div class=\"row \"> \
                        <div class=\"col-4\"> \
                            <p>" + objJson[i].Marca + " " + objJson[i].Modelo + "</p> \
                        </div> \
                        <div class=\"col-4\"></div> \
                        <div class=\"col-4\"> \
                            <p>" + objJson[i].Precio +"€</p> \
                        </div> \
                    </div> \
                    <div class=\"row\">" +
                        objJson[i].Descripcion +
                    " </div> \
                </div> \
                <div class=\"col-lg-4\"> \
                    <img class=\"imgCoche d-flex justify-content-end\" src=\"Imagenes/corsaBueno.jpg\"/> \
                </div> \
                <div class=\"row\"> \
                    <button class=\"button\" onclick=\"window.location.href='infocoche.html'\">Mas Info</button> \
                </div> \
            </div>";
            count++;       
        }

    }

    page_span.innerHTML = page + "/" + numPages();

}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

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
    });
    $.ajaxSetup({
        async: true
    });
    changePage(1);
};