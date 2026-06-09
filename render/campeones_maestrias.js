import { campeon_maestria } from "../api/perfil_invocador/campeon_maestria";

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

async function campeones_maestria (){

}
