import { puuid } from "./buscar_jugador.js";
import { key } from "./obtener_datos_partida.js";
import { campeones } from "../campeones.js";
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

    const top3 = maestria_campeon.slice(0, 3);

    top3.forEach(e => {

        const campeon = campeones.find(

            c => Number(c.key) === e.championId

        );

        console.log(
            campeon.name,
            e.championPoints
        );

    });

}