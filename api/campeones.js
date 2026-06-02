export let campeones = [];
export let version_actual = "";


export async function obtener_campeones(){

    try{
        // version actualizada

        const version = await fetch ("https://ddragon.leagueoflegends.com/api/versions.json");
        const dato_version = await version.json()
        version_actual = dato_version[0];

        console.log(dato_version)


        //consumo el api de los campeones

        const respuesta = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version_actual}/data/en_US/champion.json`);
        const dato = await respuesta.json();
        campeones = Object.values(dato.data);
        
        console.log(campeones)

    }catch (error){
        console.log(error);
    }

};