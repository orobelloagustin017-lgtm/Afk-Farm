import { version_actual } from "../api/campeones.js";
import { campeon_maestria } from "../api/perfil_invocador/campeon_maestria.js";
import { cont, nombre } from "./buscador_jugador.js";

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

// ─── Contenedor del perfil (se reutiliza entre búsquedas) ────────────────────

const perfil_cont = crearElemento("div", "perfil_cont");

// ─── Función principal ────────────────────────────────────────────────────────

export async function perfil_invocador(respuesta_rank, respuesta_summoner) {
    perfil_cont.innerHTML = "";
    cont.appendChild(perfil_cont);

    const rank     = await respuesta_rank.json();
    const summoner = await respuesta_summoner.json();

    rank.forEach(e => {
        const perfil_header = construir_header(summoner, e);
        perfil_cont.appendChild(perfil_header);
    });

    campeon_maestria();
}

// ─── Header del perfil ────────────────────────────────────────────────────────

function construir_header(summoner, e) {
    const perfil_header = crearElemento("div", "perfil_header");

    perfil_header.appendChild(construir_icono(summoner));
    perfil_header.appendChild(construir_info(e));
    perfil_header.appendChild(construir_rango(e));

    return perfil_header;
}

// ─── Icono del invocador ──────────────────────────────────────────────────────

function construir_icono(summoner) {
    const perfil_icono = crearElemento("div", "perfil_icono");

    const icono_img = crearImg(
        `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/profileicon/${summoner.profileIconId}.png`,
        "icono_invocador"
    );
    perfil_icono.appendChild(icono_img);

    const borde = crearElemento("div", "borde");
    const nivel = crearElemento("span", "nivel", summoner.summonerLevel);
    borde.appendChild(nivel);
    perfil_icono.appendChild(borde);

    return perfil_icono;
}

// ─── Info del invocador ───────────────────────────────────────────────────────

function construir_info(e) {
    const perfil_info = crearElemento("div", "perfil_info");

    perfil_info.appendChild(crearElemento("h1", "invocador", nombre));
    perfil_info.appendChild(crearElemento("p", "wins_losses", `Wins ${e.wins} Losses ${e.losses}`));

    return perfil_info;
}

// ─── Rango del invocador ──────────────────────────────────────────────────────

function construir_rango(e) {
    const perfil_rango = crearElemento("div", "perfil_rango");

    const tier_img_cont = crearElemento("div", "tier_img_cont");
    const tier_img = crearImg(
        `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${e.tier.toLowerCase()}.png`,
        "img_tier"
    );
    tier_img_cont.appendChild(tier_img);
    perfil_rango.appendChild(tier_img_cont);

    perfil_rango.appendChild(crearElemento("span", "rank", `${e.tier} ${e.rank}`));
    perfil_rango.appendChild(crearElemento("span", "lp", `LP ${e.leaguePoints}`));

    return perfil_rango;
}