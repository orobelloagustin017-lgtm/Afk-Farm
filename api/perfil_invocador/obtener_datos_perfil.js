import { puuid } from "./buscar_jugador.js";
import { key } from "./obtener_datos_partida.js";
import { perfil_invocador } from "../../render/perfil_invocador.js";
import { obtener_campeones } from "../campeones.js";

export async function obtener_datos_perfil(){

    const respuesta_rank = await fetch(
        `https://la2.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
        {
           headers: {
              "X-Riot-Token": key
           }
        }
     );

     const respuesta_summoner = await fetch(
        `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        {
           headers: {
              "X-Riot-Token": key
           }
        }
     );
   perfil_invocador(respuesta_rank, respuesta_summoner);

}