export let campeones = [];
export let version_actual = "";
export let runas = [];

export async function obtener_campeones(){
    try{
        const version = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const dato_version = await version.json();
        version_actual = dato_version[0];

        const respuesta = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version_actual}/data/en_US/champion.json`);
        const dato = await respuesta.json();
        campeones = Object.values(dato.data);

        // Runas acá, cuando version_actual ya tiene valor
        const resp_runas = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version_actual}/data/es_ES/runesReforged.json`);
        runas = await resp_runas.json();

    }catch(error){
        console.log(error);
    }
}