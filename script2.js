const html = document.querySelector('html');
const bottonCorto = document.querySelector('.app__card-button--corto');
const bottonEnfoque = document.querySelector('.app__card-button--enfoque');
const bottonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

bottonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto');
});
bottonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque');
});
bottonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo');
});
function cambiarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`);

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong" >sumérgete en lo que importa.</strong>`;
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Que tal un respiro?,<br>
                <strong class="app__title-strong" >¡Haz una pausa!.</strong>`;
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie,<br>
                <strong class="app__title-strong" >Haz una pausa larga.</strong>`;
            break;
        default:
            break;
    }
}