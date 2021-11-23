var counter = 1;
var imageLinks = [];
var otherCarsCounter = 0;

var setUp = function() {
    checkIfUserIsLogged();
    loadJson();
}

var loadJson = function () {
    $.getJSON('../data/cars.json', function(coches) {
        var outstandingCars = coches.filter(coche => coche.Destacado == 1);
        var otherCars = coches.filter(coche => coche.Destacado != 1);
        outstandingCars.forEach(coche => {
            getImageLink(coche.ID);
            createOutstandingCarCard(coche);
        });

        for (let i = 0; i < 6; i++) {
            var randomOtherCar = randomNoRepeats(otherCars);
            getImageLink(randomOtherCar.ID);
            createOtherCarCard(randomOtherCar);
        }

        funcionNueva();
    });
}

function randomNoRepeats(array) {
    var copy = array.slice(0);
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  }

function getImageLink(idCar) {
    $.getJSON('../data/carimages.json', function(images) {
        imageLinks = images.filter(image => image.IDCar == idCar);
    });
}

var createOutstandingCarCard = function(coche) {

    var data = coche;
    var imageLink = "";
    if (imageLinks[0]) {
        imageLink = imageLinks[0].Link
    } else {
        imageLink = "Imagenes/defaultCar.png"
    }

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
                                    <a href=\"infocoche.html?carid={{ID}}\" class=\"card-button\"> Mas Info</a> \
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
                                <a href=\"infocoche.html?carid={{ID}}\" class=\"card-button\"> Mas Info</a> \
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

var createOtherCarCard = function(coche) {

    var data = coche;
    var imageLink = "";
    if (imageLinks[0]) {
        imageLink = imageLinks[0].Link
    } else {
        imageLink = "Imagenes/defaultCar.png"
    }
    var htmlCard = "<div class=\"col-lg-4 mt-4\"> \
                        <div class=\"card-sl mb-3 mb-lg-0\"> \
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
                            </div> \
                            <div class=\"card-price\"> \
                                {{Precio}}€ \
                            </div> \
                            <a href=\"infocoche.html?carid={{ID}}\" class=\"card-button\"> Mas Info</a> \
                        </div> \
                    </div>";

    var text = "";

    text = Mustache.render(htmlCard, data);

    $('#otherCars').append(text);

    otherCarsCounter++;
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

var submitFilterForm = function() {
    document.getElementById("filterForm").submit();
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

