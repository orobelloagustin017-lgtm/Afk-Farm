import { puuid } from "./buscar_jugador.js";
import { key } from "./obtener_datos_partida.js";
import { campeones } from "../campeones.js";
import { cont } from "../../render/buscador_jugador.js";
import { version_actual } from "../campeones.js";
export async function campeon_maestria(){

    const maestria = await fetch (
        `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
        {
            headers: {
                "X-Riot-Token": key 
            }
        }
    );

    let maestria_campeon = await maestria.json();


    const campeones_principales = crearElemento("div", "cont_principales", "");
    cont.appendChild(campeones_principales);

    const top3 = maestria_campeon.slice(0, 3);
    
    top3.forEach((e, i) => {

        const campeon = campeones.find(

            c => Number(c.key) === e.championId

        );

        campeones_maestria (campeon, e.championPoints, campeones_principales, i);
        
        console.log(
            campeon.name,
            e.championPoints
        );

    });

}
// ─── Helper: crea un elemento con clase y texto opcional ──────────────────────

function crearElemento(tag, className, textContent = "") {
    const el = document.createElement(tag);
    el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
}

// ─── Helper: crea una imagen con src y clase ──────────────────────────────────

function crearImg(src, className) {
    const img = document.createElement("img");
    img.src = src;
    img.className = className;
    return img;
}

async function campeones_maestria (campeon, puntos, cont_principales, index){

    const cont_campeon = crearElemento("div", "cont_campeon_maestria", "");
    cont_principales.appendChild(cont_campeon);
    cont_campeon.classList.add(`top-${index + 1}`)

    const imagen_campeon = crearImg(`https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/champion/${campeon.image.full}`, "img_maestria")
    cont_campeon.appendChild(imagen_campeon);

    const nombre_campeon = crearElemento("p", "nombre_campeon", campeon.name);
    cont_campeon.appendChild(nombre_campeon);

    const puntos_maestria = crearElemento("p", "puntos_maestria", puntos);
    cont_campeon.appendChild(puntos_maestria)

    const borde_maestria = crearElemento("div", "borde_maestria", "");
    cont_campeon.appendChild(borde_maestria);

    const detector_mayor = document.querySelectorAll(".puntos_maestria");


}
