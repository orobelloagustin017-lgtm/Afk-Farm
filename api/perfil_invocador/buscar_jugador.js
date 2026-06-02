import { obtener_datos_perfil } from "./obtener_datos_perfil.js";
import { obtener_datos_partida } from "./obtener_datos_partida.js";
import { nombre, tag } from "../../render/buscador_jugador.js";
import { key } from "./obtener_datos_partida.js";

export let puuid = "";
export let matches = [];
const app = document.getElementById("app");

let icono_invocador = 0;

export async function buscador_jugador(){
    const respuesta = await fetch(
        `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nombre}/${tag}`,
        {
           headers: {
              "X-Riot-Token": key
           }
        }
     );
     
    const cuenta = await respuesta.json();

    puuid = cuenta.puuid
     
     const partida = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,

        {
            headers: {
                "X-Riot-Token" : key
                }
            }
        );

    const dato = await partida.json();

    matches = dato;

   await obtener_datos_perfil();
   await obtener_datos_partida();



}