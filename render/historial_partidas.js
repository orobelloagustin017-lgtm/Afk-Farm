import { puuid } from "../api/perfil_invocador/buscar_jugador.js";
import { version_actual, campeones, runas } from "../api/campeones.js";
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

// ─── Función principal ────────────────────────────────────────────────────────

export async function historial_partidas(partidas) {
    const cont_historial = crearElemento("div", "cont_historial");
    const cont_stats_wrapper = crearElemento("div", "cont_stats_wrapper");
    
    cont.appendChild(cont_historial);
    cont.appendChild(cont_stats_wrapper);

    for (const partida of partidas) {
        const jugador = partida.info.participants.find(p => p.puuid === puuid);
        if (!jugador) continue;

        const stats_partida = construir_stats(jugador, partida.info);
        const cont_partida = construir_partida(jugador, partida.info, stats_partida);

        cont_historial.appendChild(cont_partida);
        cont_stats_wrapper.appendChild(stats_partida);
    }
}
// ─── Construye el bloque visual de stats de una partida ────────────────────────────────

function construir_stats(campeon, partida_info) {

    const cont_stats = crearElemento("div", "cont_stats");
    const cont = crearElemento("div", "stats_header", "Stats detalladas");
    cont_stats.appendChild(cont);
    const stats = [
        `Daño a campeones: ${campeon.totalDamageDealtToChampions}`,
        `Daño recibido: ${campeon.totalDamageTaken}`,
        `Oro ganado: ${campeon.goldEarned}`,
        `Visión: ${campeon.visionScore}`,
        `Wards colocados: ${campeon.wardsPlaced}`,
        `Wards destruidos: ${campeon.wardsKilled}`,
    ];

    stats.forEach(stat => {
        const p = crearElemento("p", "stat", stat);
        cont.appendChild(p);

    }); 
    construir_grafico(cont_stats, campeon);

    return cont_stats; // ← esto faltaba

}

function construir_grafico(cont_stats, e) {
    const canvas = document.createElement("canvas");
    canvas.className = "stats_grafico";
    cont_stats.appendChild(canvas);

    const maxDaño = 35000;    // jugador que farmea bien
    const maxOro = 15000;     // partida larga ~35min
    const maxVision = 60;     // support activo
    const maxWards = 25;    // Valor arbitrario para normalizar los wards

    new Chart(canvas, {
    type: "radar",
    data: {
        labels: ["Daño", "Daño recibido", "Oro", "Wards puestas", "Wards eliminadas"],
        datasets: [{
            label: e.championName,
            data: [
                (e.totalDamageDealtToChampions / maxDaño) * 100,
                (e.totalDamageTaken / maxDaño) * 100,
                (e.goldEarned / maxOro) * 100,
                (e.wardsPlaced / maxWards) * 100,
                (e.wardsKilled / maxWards) * 100,
            ],
        }]
    },
    options: {
        scales: {
            r: {
                ticks: {
                    display: false
                }
            }
        }
    }
});
}


// ─── Construye el bloque visual de una partida ────────────────────────────────

function construir_partida(e, info, stats_partida) {
    const cont_partida = crearElemento("div", "cont_partida");

    // Campeon
    const campeon_data = campeones.find(c => c.id === e.championName);

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

    const items = [e.item0, e.item1, e.item2, e.item3, e.item4, e.item5, e.item6, e.item7];
    const items_cont = crearElemento("div", "items_cont");
    items.forEach(itemId => {
        if (itemId) {
            const img = crearImg(
                `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/item/${itemId}.png`,
                "item_img"
            );
            items_cont.appendChild(img);
        }
    })
    cont_partida.appendChild(items_cont);

    const abrir_stats = crearElemento("button", "abrir_stats", "Ver stats");
    cont_partida.appendChild(abrir_stats);

    abrir_stats.addEventListener("click", () => {
        const stats = document.querySelectorAll(".cont_stats");
        stats.forEach(s => s.classList.remove("visible"));
        stats_partida.classList.add("visible");
    });
    // Color de fondo según resultado
    aplicar_estilo_resultado(cont_partida, e.win, campeon_data);

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

function aplicar_estilo_resultado(el, win, campeon_data) {
    console.log(campeon_data)
    if (win) {
        el.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${campeon_data.id}_0.jpg)`;        
        el.style.borderLeft       = "10px solid rgba(0, 255, 34, 0.36)";
    } else {
        el.style.backgroundImage = `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${campeon_data.id}_0.jpg)`,
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