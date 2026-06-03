import { puuid } from "../api/perfil_invocador/buscar_jugador.js";
import { version_actual, campeones } from "../api/campeones.js";
import { cont } from "./buscador_jugador.js";

// ─── Constantes fuera de los loops para no recrearlas en cada iteración ───────

const SPELLS = {
    1:  "SummonerBoost",
    3:  "SummonerExhaust",
    4:  "SummonerFlash",
    6:  "SummonerHaste",
    7:  "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    13: "SummonerMana",
    14: "SummonerDot",
    21: "SummonerBarrier",
    32: "SummonerSnowball",
};

const QUEUE_NAMES = {
    420:  "Ranked Solo/Duo",
    440:  "Flex",
    450:  "Aram",
    400:  "Normal Draft",
    430:  "Normal Blind",
    1700: "Arena",
    900:  "Urf",
    1020: "One for All",
    1400: "Ultimate Spellbooks",
};

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

// ─── Carga de runas (una sola vez al importar el módulo) ──────────────────────

const runas = await fetch("/Afk-Farm/JSON/runesReforged.json").then(r => r.json());

// ─── Función principal ────────────────────────────────────────────────────────

export async function historial_partidas(partidas) {
    const cont_historial = crearElemento("div", "cont_historial");
    cont.appendChild(cont_historial);

    for (const partida of partidas) {
        const jugador = partida.info.participants.find(p => p.puuid === puuid);
        if (!jugador) continue;

        const cont_partida = construir_partida(jugador, partida.info);
        cont_historial.appendChild(cont_partida);
    }
}

// ─── Construye el bloque visual de una partida ────────────────────────────────

function construir_partida(e, info) {
    const cont_partida = crearElemento("div", "cont_partida");

    // Campeon
    const campeon_data = campeones.find(c => c.id === e.championName);
    if (campeon_data) {
        const img = crearImg(
            `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/champion/${campeon_data.image.full}`,
            "img_partida_campeon"
        );
        cont_partida.appendChild(img);
    }

    // Runas + hechizos
    cont_partida.appendChild(construir_runas_y_hechizos(e));

    // Info (campeón, duración, KDA, win/loss)
    cont_partida.appendChild(construir_info(e, info));

    // Modo de juego
    const queue_mode = crearElemento("p", "queue_mode", QUEUE_NAMES[info.queueId] ?? "Desconocido");
    cont_partida.appendChild(queue_mode);

    // Línea y CS
    cont_partida.appendChild(crearElemento("p", "linea_jugador", e.individualPosition));
    cont_partida.appendChild(crearElemento("p", "minions_asesinados", `CS: ${e.totalMinionsKilled}`));

    // Color de fondo según resultado
    aplicar_estilo_resultado(cont_partida, e.win);

    return cont_partida;
}

// ─── Runas y hechizos ─────────────────────────────────────────────────────────

function construir_runas_y_hechizos(e) {
    const runas_cont = crearElemento("div", "runas_cont");

    // Runa principal
    const runaPrincipalId = e.perks.styles[0].selections[0].perk;
    const runa = buscar_runa(runaPrincipalId);
    if (runa) {
        runas_cont.appendChild(crearImg(
            `https://ddragon.leagueoflegends.com/cdn/img/${runa.icon}`,
            "runas_primarias_img"
        ));
    }

    // Hechizos
    const summoner_cont = crearElemento("div", "summoner_img_cont");
    summoner_cont.appendChild(crearImg(url_spell(e.summoner1Id), "summoner"));
    summoner_cont.appendChild(crearImg(url_spell(e.summoner2Id), "summoner"));
    runas_cont.appendChild(summoner_cont);

    return runas_cont;
}

function url_spell(id) {
    return `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/spell/${SPELLS[id]}.png`;
}

// ─── Info de la partida ───────────────────────────────────────────────────────

function construir_info(e, info) {
    const contenedor = crearElemento("div", "info");

    // Nombre del campeón
    contenedor.appendChild(crearElemento("h3", "campeon_partida", e.championName));

    // Duración
    const totalMin = info.gameDuration / 60;
    const minutos  = Math.trunc(totalMin);
    const segundos = String(Math.round((totalMin - minutos) * 60)).padStart(2, "0");
    contenedor.appendChild(crearElemento("p", "minutos_partida", `${minutos}:${segundos}`));

    // KDA
    contenedor.appendChild(crearElemento("p", "kda", `${e.kills}/${e.deaths}/${e.assists}`));

    // Win / Loss
    const estado = crearElemento("p", "estado_partida", e.win ? "WIN" : "LOSS");
    estado.style.color = e.win ? "#22C55E" : "#EF4444";
    contenedor.appendChild(estado);

    return contenedor;
}

// ─── Estilo de fondo según resultado ─────────────────────────────────────────

function aplicar_estilo_resultado(el, win) {
    if (win) {
        el.style.backgroundColor = "rgba(0, 255, 34, 0.164)";
        el.style.borderLeft       = "10px solid rgba(0, 255, 34, 0.36)";
    } else {
        el.style.backgroundColor = "rgba(255, 0, 0, 0.164)";
        el.style.borderLeft       = "10px solid rgba(255, 0, 0, 0.36)";
    }
}

// ─── Buscar runa por ID ───────────────────────────────────────────────────────

function buscar_runa(id) {
    for (const categoria of runas) {
        for (const slot of categoria.slots) {
            const runa = slot.runes.find(r => r.id === id);
            if (runa) return runa;
        }
    }
    return null;
}