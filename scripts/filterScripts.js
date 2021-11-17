$(document).ready(function() {
    var params = getQueryParams();
    if(params.get('location') == 'Provincia' && params.get('brand') == 'Marca' && params.get('fuel') == 'Combustible' && params.get('minprice') == 'Min.' && params.get('maxprice') == 'Max.' && params.get('doors') == 'Puertas') {
        var text = "<p id=\"noFilteredCars\">NO HA SELECCIONADO NINGUN FILTRO</p>";
        $('#filteredCars').append(text);
    } else {
        getFilteredCars(params)
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

    $.getJSON('../data/cars.json', function(coches) {
        
        var data = coches.filter( coche => (localizacion != "*" ? coche.Localizacion == localizacion : coche.Localizacion != "") && (marca != "*" ? coche.Marca == marca : coche.Marca != "") && (combustible != "*" ? coche.Combustible == combustible : coche.Combustible != "") && (preciomin != "*" ? coche.Precio >= preciomin : coche.Precio != "") && (preciomax != "*" ? coche.Precio <= preciomax : coche.Precio != "") && (puertas != "*" ? coche.Puertas == puertas : coche.Puertas != ""));

        if (data.length > 0) {
            data.forEach(carData => {
                createFilteredCar(carData);
            });
        } else {
            var text = "<p id=\"noFilteredCars\">NO HAY COCHES PARA LA BUSQUEDA SELECCIONADA</p>";
            $('#filteredCars').append(text);
        }
    });

}

var createFilteredCar = function(carData) {
    var htmlCode = "<div class=\"col-lg-4 col-md-8 offset-1 mt-5\"> \
            <div class=\"row\"> \
                <div class=\"col-lg-8 \"> \
                    <div class=\"row \"> \
                        <div class=\"col-4\"> \
                            <p>{{Marca}} {{Modelo}}</p> \
                        </div> \
                        <div class=\"col-4\"></div> \
                        <div class=\"col-4\"> \
                            <p>{{Precio}}€</p> \
                        </div> \
                    </div> \
                    <div class=\"row\"> \
                        {{Descripcion}} \
                    </div> \
                </div> \
                <div class=\"col-lg-4\"> \
                    <img class=\"imgCoche d-flex justify-content-end\" src=\"Imagenes/corsaBueno.jpg\"/> \
                </div> \
                <div class=\"row\"> \
                    <button class=\"button\" onclick=\"window.location.href='infocoche.html'\">Mas Info</button> \
                </div> \
            </div>";

    var text = Mustache.render(htmlCode, carData);

    $('#filteredCars').append(text);
}
