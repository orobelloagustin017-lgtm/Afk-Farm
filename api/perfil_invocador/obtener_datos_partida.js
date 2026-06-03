import { nombre, tag } from "../../render/buscador_jugador.js";
import { matches } from "./buscar_jugador.js";
import { puuid } from "./buscar_jugador.js";
import { version_actual } from "../campeones.js";
import { historial_partidas } from "../../render/historial_partidas.js";


const app = document.getElementById("app");
export let campeones = [];
export let key = 'RGAPI-9fc3a416-6997-4c5b-af03-4b4ab84f1c4b';


/* 

-queueId para identificar que tipo de partida son

420 = Ranked Solo/Duo
440 = Ranked Flex
450 = ARAM
400 = Normal Draft
430 = Normal Blind

*/

export async function obtener_datos_partida(){
        
    const promesas = matches.map(matchId =>

        fetch(
            `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
            {
                headers : {
                    "X-Riot-Token" : key
                }
            }
        ).then(res => res.json())

    );

    let partidas = await Promise.all(promesas);

    historial_partidas(partidas);
}
/*

*/
