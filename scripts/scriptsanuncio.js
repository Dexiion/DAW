var imageLink = "";
var counter = 1;
idCar = 3;




function getImageLink(idCar) {
    $.getJSON('../data/carimages.json', function(images) {
        images.forEach(image => {
            if(image.IDCar == idCar) {
                imageLink = image.Link;
            }
        });
    });
}


var createAdCard = function(anuncio){
    var data = anuncio;

    var firstHtmlCard = "<div class=\"carousel-item active\"> \
                            <div class=\"col-12\"> \
                                <div class=\"card-sl\" style=\"margin-right: 10px;\"> \
                                    <div class=\"card-image\"> \
                                        <img src=\"" + imageLink + "\"/> \
                                    </div> \
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



