const lista = document.getElementById('lista');
const mensajeResultados = document.getElementById('mensaje-resultados');

function solicitarDatos() {
    lista.innerHTML = ""; 
    mensajeResultados.textContent = ""; 

    let dbn_text = document.getElementById("dbn").value;
    let base_url = "https://www.datos.gov.co/resource/gt2j-8ykr.json";
    let final_url = "";

    if (dbn_text !== "") {
        final_url = base_url + "?departamento=" + dbn_text;
    } else {
        final_url = base_url;
    }

    var request = new XMLHttpRequest();
    request.open("GET", final_url);
    request.send();
    request.responseType = "json";

    request.onload = () => {
        if (request.readyState === 4 && request.status === 200) {
            const datos = request.response;
            let resultadosMostrados = 0;

            for (i in datos) {
                if (resultadosMostrados < 10) {
                    var item_dom = document.createElement('li');
                    var texto = "- Departamento: " + datos[i].departamento + " - Edad: " + datos[i].edad + "- Sexo: " + datos[i].sexo + " - Departamento_Nom: " + datos[i].departamento_nom;
                    item_dom.appendChild(document.createTextNode(texto));
                    lista.appendChild(item_dom);
                    resultadosMostrados++;
                } else {
                    break;
                }
            }

            if (resultadosMostrados === 0) {
                mensajeResultados.textContent = "No se encontraron resultados para la búsqueda.";
            }
        } else {
            console.log(`Error: ${request.status}`);
        }
    };
}
