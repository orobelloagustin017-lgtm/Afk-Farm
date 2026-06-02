import { buscador_jugador } from "../api/perfil_invocador/buscar_jugador.js";


let invocador = "";
export let tag = "";
export let nombre = "";
export let cont = document.createElement("div");
cont.className = "cont_invocador"


export function buscar_jugador() { 
    const app = document.getElementById("app");

    let buscador_container = document.createElement("div");
    app.appendChild(buscador_container);
    app.appendChild(cont);

    buscador_container.className = "buscador_cont";

    let input_buscador = document.createElement("input");
    input_buscador.className = "buscador";
    input_buscador.placeholder = "Player and tag"

    let input_button_buscador = document.createElement("input");
    input_button_buscador.className = "buscar";
    input_button_buscador.type = "button"
    input_button_buscador.value = ".AFK"


    buscador_container.appendChild(input_buscador);
    buscador_container.appendChild(input_button_buscador);


    input_button_buscador.addEventListener("click", () => {
        invocador = input_buscador.value;
        let direccion = invocador.indexOf("#");

        if(direccion !== -1){
            tag = invocador.slice(direccion + 1);
            nombre = invocador.slice(0, direccion);
            buscador_jugador();
        }
    })
}


