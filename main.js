import { buscar_jugador } from "./render/buscador_jugador.js"; 
import { campeon_maestria } from "./api/perfil_invocador/campeon_maestria.js";
import { obtener_datos_perfil } from "./api/perfil_invocador/obtener_datos_perfil.js";
import { perfil_invocador } from "./render/perfil_invocador.js";
import { obtener_campeones } from "./api/campeones.js";
import { render_galeria } from "./api/galeria/galeria_api.js";
import { buscador_jugador } from "./api/perfil_invocador/buscar_jugador.js";


const app = document.getElementById("app");
//buscar_jugador();
async function iniciar_app(){

    let botones = document.querySelectorAll(".botones_menu");
    let boton_volver = document.querySelector(".volver");


    botones.forEach(e => {
        console.log(e.textContent)

        switch (e.textContent) {
            case "Buscar Jugador":
                e.addEventListener("click", () => {
                    app.innerHTML = ""
                    boton_volver.style.display = "block";
                    buscar_jugador();
                })
                break;
            case "Campeones":
                e.addEventListener("click", () => {
                    app.innerHTML = "";
                    boton_volver.style.display = "block";
                    render_galeria();
                })
            default:
                break;
        }

    })
    boton_volver.addEventListener("click", () => {
        app.innerHTML = "";
        render_galeria();
        boton_volver.style.display = "none"
    })

    await obtener_campeones();

    render_galeria();

}

iniciar_app();