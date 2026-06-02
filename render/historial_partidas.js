import { puuid } from "../api/perfil_invocador/buscar_jugador.js";
import { version_actual } from "../api/campeones.js";
import { campeones } from "../api/campeones.js";
import { cont } from "./buscador_jugador.js";

const app = document.getElementById("app");
let cont_historial = document.createElement("div");

export async function historial_partidas (partidas){

    cont.appendChild(cont_historial);
    cont_historial.className = "cont_historial"


    partidas.forEach(dato => {

        for (const e of dato.info.participants){

            if(e.puuid === puuid){

                let cont_partida = document.createElement("div");
                cont_historial.appendChild(cont_partida);
                cont_partida.className = "cont_partida";

                let img_campeon = document.createElement("img");
                img_campeon.className = "img_partida_campeon";
                campeones.forEach(c => {
                    if(e.championName === c.id){
                        console.log(e.championName)
                        img_campeon.src = `https://ddragon.leagueoflegends.com/cdn/${version_actual}/img/champion/${c.image.full}`;
                        cont_partida.appendChild(img_campeon);

                    }
                })

                let info = document.createElement("div");
                cont_partida.appendChild(info);
                info.className = "info";

                //nombre del campeon utilizado en esa partida
                let campeon = document.createElement("h3");
                campeon.className = "campeon_partida";
                campeon.textContent = e.championName;
                info.appendChild(campeon);

                //tiempo de la partida
                let minutos_partida = document.createElement("p");
                minutos_partida.className = "minutos_partida";
                let calculo_tiempo_partida = dato.info.gameDuration / 60; //calculamos los minutos

                let minutos = Math.trunc(calculo_tiempo_partida); 
                //Separamos minutos y segundos
                let segundos = Math.round((calculo_tiempo_partida - minutos) * 60);

                //formateamos segundos para que tengan un 0 a la izquierda si es necesario
                let segundos_formateados = String(segundos).padStart(2, '0'); 
                minutos_partida.textContent = `${minutos}:${segundos_formateados}`;
                info.appendChild(minutos_partida)


                //imprimo el kda de la partida
                let kda = document.createElement("p");
                kda.className = "kda";
                kda.textContent = `${e.kills + '/' + e.deaths + '/' + e.assists}`;
                info.appendChild(kda);
                
                //imprimo si fue una partida ganada/win o perdida/loss
                let estado_partida = document.createElement("p");
                estado_partida.className = "estado_partida";
                info.appendChild(estado_partida);

                //condicional por que en el api devuelve como tipo booleano el win
                //asi que si es true es ganada/win con un cambio de color en el texto a verde
                //y si es perdida/loss con un cambio a rojo
                if(e.win === true){
                    estado_partida.textContent = "Win";
                    estado_partida.style.color = "#22C55E";
                }else{
                    estado_partida.textContent = "Loss";
                    estado_partida.style.color = "#EF4444";
                }
                let queue_mode = document.createElement("p");
                cont_partida.appendChild(queue_mode);
                switch (dato.info.queueId) {
                    case 420:
                        queue_mode.textContent = "Ranked Solo/Duo"
                        break;
                    case 440:
                        queue_mode.textContent = "Flex"
                        break;
                    case 450:
                        queue_mode.textContent = "Aram"
                        break;
                    case 400:
                        queue_mode.textContent = "Normal Draft"
                        break;
                    case 430:
                        queue_mode.textContent = "Normal Blind"
                        break;
                    case 1700:
                        queue_mode.textContent = "Arena"
                        break;
                    case 900:
                        queue_mode.textContent = "Urf"
                        break;
                    case 1020:
                        queue_mode.textContent = "One for all"
                        break;
                    case 1400:
                        queue_mode.textContent = "Ultimate Spellbooks"
                        break;
                    default:
                        break;
                }
                
                let linea_jugador = document.createElement("p");
                linea_jugador.className = "linea_jugador"
                linea_jugador.textContent = e.individualPosition;
                cont_partida.appendChild(linea_jugador);

                let minions_asesinados = document.createElement("p");
                minions_asesinados.className = "minions_asesinados"
                minions_asesinados.textContent = `CS: ${e.totalMinionsKilled}`
                cont_partida.appendChild(minions_asesinados)

                console.log(e.puuid)

            }

        }

    });
}