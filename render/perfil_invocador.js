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

     
      //Perfil
         let perfil = document.createElement("div");
         perfil_cont.appendChild(perfil);
         perfil.className = "perfil";

         //Perfil Header
            let perfil_header = document.createElement("div");
            perfil_cont.appendChild(perfil_header);
            perfil_header.className = "perfil_header";

            //Perfil Icono
               let perfil_icono = document.createElement("div");
               perfil_header.appendChild(perfil_icono);
               perfil_icono.className = "perfil_icono";

               let icono_img = document.createElement("img");
               perfil_icono.appendChild(icono_img);
               icono_img.className = "icono_invocador";
               icono_img.src = `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/profileicon/${icono_invocador}.png`;

               let borde = document.createElement("div");
               perfil_icono.appendChild(borde);
               borde.className = "borde";

               let nivel = document.createElement("span");
               borde.appendChild(nivel);
               nivel.textContent = summoner.summonerLevel;
               nivel.className = "nivel";

            //Perfil Icono

            //Perfil Info
               let perfil_info = document.createElement("div");
               perfil_header.appendChild(perfil_info);
               perfil_info.className = "perfil_info";

               let invocador = document.createElement("h1");
               perfil_info.appendChild(invocador);
               invocador.className = "invocador";
               invocador.textContent = nombre;

               let wins_losses = document.createElement("p");
               perfil_info.appendChild(wins_losses);
               wins_losses.classList = "wins_losses";
               wins_losses.textContent = `Wins ${e.wins} Losses ${e.losses}`;
            //Perfil Info

            //Perfil Rango
               let perfil_rango = document.createElement("div");
               perfil_header.appendChild(perfil_rango);
               perfil_rango.className = "perfil_rango";

               let tier_img_cont = document.createElement("div");
               perfil_rango.appendChild(tier_img_cont);
               tier_img_cont.className = "tier_img_cont";

               let tier_img = document.createElement("img");
               tier_img_cont.appendChild(tier_img);
               tier_img.className = "img_tier"
               tier_img.src =`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${e.tier.toLowerCase()}.png`;

               let rank = document.createElement("span");
               perfil_rango.appendChild(rank);
               rank.className = "rank";
               rank.textContent = `${e.tier} ${e.rank}`;

               let leaguePoints = document.createElement("span");
               perfil_rango.appendChild(leaguePoints);
               leaguePoints.className = "lp";
               leaguePoints.textContent = `LP ${e.leaguePoints}`;
            //Perfil Rango

         //Perfil Header
      //Perfil
   });
   campeon_maestria();
}
