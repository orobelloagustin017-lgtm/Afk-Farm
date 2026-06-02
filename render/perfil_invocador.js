import { version_actual } from "../api/campeones.js";
import { campeon_maestria } from "../api/perfil_invocador/campeon_maestria.js";
import { cont } from "./buscador_jugador.js";
import { nombre } from "./buscador_jugador.js";

let perfil_cont = document.createElement("div");
perfil_cont.className = "perfil_cont";

export async function perfil_invocador(respuesta_rank, respuesta_summoner) {
   perfil_cont.innerHTML = "";
   cont.appendChild(perfil_cont);
   const rank = await respuesta_rank.json();
   const summoner = await respuesta_summoner.json();
   const icono_invocador = summoner.profileIconId;

   rank.forEach((e) => {
      console.log(summoner)
      let icono = document.createElement("img");
      perfil_cont.appendChild(icono);
      icono.className = "icono_invocador";
      icono.src = `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/profileicon/${icono_invocador}.png`;

      let tier_cont = document.createElement("div");
      perfil_cont.appendChild(tier_cont);
      tier_cont.className = "tier_cont";

      let invocador = document.createElement("h1");
      tier_cont.appendChild(invocador);
      invocador.className = "invocador";
      invocador.textContent = nombre;

      let nivel = document.createElement("p");
      nivel.textContent = summoner.summonerLevel;
      nivel.className = "nivel";
      perfil_cont.appendChild(nivel)

      let border_icono = document.createElement("div");
      tier_cont.appendChild(border_icono);
      border_icono.className = "borde_icono";
      let tier_img = document.createElement("img");
      tier_cont.appendChild(tier_img);
      tier_img.className = "img_tier"
      tier_img.src =`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${e.tier.toLowerCase()}.png`;

      let rank = document.createElement("p");
      tier_cont.appendChild(rank);
      rank.className = "rank";
      rank.textContent = `${e.tier} ${e.rank}`;

      let leaguePoints = document.createElement("p");
      tier_cont.appendChild(leaguePoints);
      leaguePoints.className = "lp";
      leaguePoints.textContent = `LP ${e.leaguePoints}`;

      let wins_losses = document.createElement("p");
      tier_cont.appendChild(wins_losses);
      wins_losses.classList = "wins_losses";
      wins_losses.textContent = `Wins ${e.wins} Losses ${e.losses}`;
   });
   campeon_maestria();
}
