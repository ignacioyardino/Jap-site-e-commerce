var product = {};
var comentarios = {};
var estrellas = "";
var newComment = "";

//
document.addEventListener("DOMContentLoaded", function (e) {
    dibujoBloquePrincipalHTML();
    //DIBUJO LOS COMENTARIOS
    dibujoComentario();
    //AGREGO LISTENER DE EVENTO CLIC EN EL BOTON DE COMENTARIO
    $("#btn-enviar-comentario").click(function () {
        dibujoComentariosNuevos();
    });
});
///
function dibujoComentariosNuevos() {
    var comentariosAtiguos = document.getElementById("comentarios").innerHTML;
    if ($("input[name='radio-puntuacion']:checked").val()) {
        var score = document.querySelector('input[name="radio-puntuacion"]:checked').value;
        estrellas = dibujoEstrellas(score, estrellas);
        var fecha = new Date().toLocaleDateString()
        var newComment = `
            <div class=" px-3" style="padding-top: 10px;padding-bottom: 10px;margin-bottom:10px; border-width: 0.10px;
            border-style: solid;
            border-color: orange;">
            <h4>`+ localStorage.getItem("USUARIO") + `</h4>
            <p>`+ $('#comentario').val() + `</p>
            <p>`+ estrellas + `</p>
            <small>`+ fecha + `</small>
            </div>`;
        document.getElementById("comentarios").innerHTML = comentariosAtiguos + newComment;
        $('#comentario').val("");
        $("input[type=radio][name=radio-puntuacion]").prop('checked', false);
        estrellas = "";
    }
    else {
        alert("debe seleccionar un puntaje");
    }
}

function dibujoBloquePrincipalHTML() {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data; //EL RESULKTADO DEL JSON LO GUARDO EN UNA VARIABLE DEL PRODUCTO
            //
            //DIBUJO PARTE PRINCIPAL DEL HTML
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let costoProductoHTML = document.getElementById("costoProducto");
            //
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            costoProductoHTML.innerHTML = product.cost;
            //
            dibujoGaleriaImagenes(product.images);
        }
    });
}

function dibujoGaleriaImagenes(productImages) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productImages.length; i++) {
        let imageSrc = productImages[i];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `;
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function dibujoEstrellas(score, estrellas) {
    if (score == "1") {
        estrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
    }
    if (score == "2") {
        estrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
    }
    if (score == "3") {
        estrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
    }
    if (score == "4") {
        estrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`;
    }
    if (score == "5") {
        estrellas = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`;
    }
    return estrellas;
}

function dibujoComentario() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            let htmlContentToAppend = "";
            for (let i = 0; i < comentarios.length; i++) {
                //LLAMO FUNCION PARA DIBUJAR ESRELLAS, RECIBE SCORE Y VARIABLE TEXTO VACIA
                estrellas = dibujoEstrellas(comentarios[i].score, estrellas);
                //
                htmlContentToAppend += `
                <div class=" px-3" style="padding-top: 10px;padding-bottom: 10px;margin-bottom:10px; border-width: 0.10px;
                border-style: solid;
                border-color: orange;">
                    <h4>`+ comentarios[i].user + `</h4>
                    <p>`+ comentarios[i].description + `</p>
                    <p>`+ estrellas + `</p>
                    <small>`+ comentarios[i].dateTime + `</small>
                </div>`;
                estrellas = "";
            }
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;
        }
    })
}