var counter = 1;
var imageLink = "";

var setUp = function() {
    loadJson();
}

var loadJson = function () {
    $.getJSON('../data/cars.json', function(coches) {
        coches.forEach(coche => {
            if (coche.Destacado == 1 ) {
                getImageLink(coche.ID);
                createOutstandingCarCard(coche);
            }
        });
        funcionNueva();
    });
}

function getImageLink(idCar) {
    $.getJSON('../data/carimages.json', function(images) {
        images.forEach(image => {
            if(image.IDCar == idCar) {
                imageLink = image.Link;
            }
        });
    });
}

var createOutstandingCarCard = function(coche) {

    var data = coche;

    var firstHtmlCard = "<div class=\"carousel-item active\"> \
                            <div class=\"col-lg-3 col-12\"> \
                                <div class=\"card-sl\" style=\"margin-right: 10px;\"> \
                                    <div class=\"card-image\"> \
                                        <img src=\"" + imageLink + "\"/> \
                                    </div> \
                                    <div class=\"card-heading\"> \
                                        {{Marca}} \
                                    </div> \
                                    <div class=\"card-subheading\"> \
                                        {{Modelo}} \
                                    </div> \
                                    <div class=\"card-text\"> \
                                        <p style=\"font-size: 1.1em; margin-top: -10px;\">Km: <b>{{Kilometros}} Km</b></p> \
                                        <p style=\"font-size: 1.1em; margin-top: -10px;\">Provincia: <b>{{Localizacion}}</b></p> \
                                        <p style=\"font-size: 1.1em; margin-top: -10px;\">Caja de Cambios: <b>{{CajaDeCambios}}</b></p> \
                                    </div> \
                                    <div class=\"card-price\"> \
                                        {{Precio}}€ \
                                    </div> \
                                    <a href=\"#\" class=\"card-button\"> Purchase</a> \
                                </div> \
                            </div> \
                        </div>";

                        

    var htmlCard = "<div class=\"carousel-item\"> \
                        <div class=\"col-lg-3 col-12\"> \
                            <div class=\"card-sl\" style=\"margin-right: 10px;\"> \
                                <div class=\"card-image\"> \
                                    <img src=" +  imageLink + "/> \
                                </div> \
                                <div class=\"card-heading\"> \
                                    {{Marca}} \
                                </div> \
                                <div class=\"card-subheading\"> \
                                    {{Modelo}} \
                                </div> \
                                <div class=\"card-text\"> \
                                    <p style=\"font-size: 1.1em; margin-top: -10px;\">Km: <b>{{Kilometros}} Km</b></p> \
                                    <p style=\"font-size: 1.1em; margin-top: -10px;\">Provincia: <b>{{Localizacion}}</b></p> \
                                    <p style=\"font-size: 1.1em; margin-top: -10px;\">Caja de Cambios: <b>{{CajaDeCambios}}</b></p> \
                                </div> \
                                <div class=\"card-price\"> \
                                    {{Precio}}€ \
                                </div> \
                                <a href=\"#\" class=\"card-button\"> Purchase</a> \
                            </div> \
                        </div> \
                    </div>";

    var text = "";

    if(counter == 1) {
        text = Mustache.render(firstHtmlCard, data);
        counter--;
    } else {
        text = Mustache.render(htmlCard, data);
    }

    $('#outstandingCarousel').append(text);
}

var funcionNueva = function() {
    let items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
        const minPerSlide = 4;
        let next = el.nextElementSibling;
        for (var i=1; i<minPerSlide; i++) {
            if (!next) {

                next = items[0];
            }
            let cloneChild = next.cloneNode(true);
            el.appendChild(cloneChild.children[0]),
            next = next.nextElementSibling;
        }
    })
}

$(document).ready(function() {
    $.ajaxSetup({
        async: false
    });
    setUp();
    $.ajaxSetup({
        async: true
    });
});

