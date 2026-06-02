import { obtener_campeones, campeones, version_actual } from "../campeones.js";
const app = document.getElementById("app");

export async function render_galeria(){
    app.innerHTML = ""

    let perfil_campeon_elemento = document.createElement("div");
    perfil_campeon_elemento.className = "campeones_cont"
    app.appendChild(perfil_campeon_elemento);

    campeones.forEach(e => {
        let cont_campeon = document.createElement("div");
        perfil_campeon_elemento.appendChild(cont_campeon);

        let img_perfil_campeon  = document.createElement("img")
        img_perfil_campeon.className = 'img_perfil_campeon'
        cont_campeon.appendChild(img_perfil_campeon);
        img_perfil_campeon.src = `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/champion/${e.image.full}`;
        img_perfil_campeon.addEventListener("click", () => {
            render_campeon(e);
        })
    })
}

export function render_campeon (campeon){
    app.innerHTML =  ""

    let boton_volver = document.createElement("button");
    boton_volver.textContent = "Volver";

    app.appendChild(boton_volver);


    let splash_campeon = document.createElement("img");
    splash_campeon.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${campeon.id}_0.jpg`;


    let nombre_campeon = document.createElement("h2");
    nombre_campeon.textContent = campeon.name;

    let titulo_campeon = document.createElement("p");
    titulo_campeon.textContent = campeon.title;

    let resumen_campeon = document.createElement("p");
    resumen_campeon.textContent = campeon.blurb;
    

    app.appendChild(splash_campeon);
    app.appendChild(nombre_campeon);
    app.appendChild(titulo_campeon);
    app.appendChild(resumen_campeon);
 
    
    boton_volver.addEventListener("click", () => {
        render_galeria();
    })
}


