const html = document.querySelector('html');
const bottonCorto = document.querySelector('.app__card-button--corto');
const bottonEnfoque = document.querySelector('.app__card-button--enfoque');
const bottonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const bottonIniciarPausar = document.querySelector('#start-pause');
const TextoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const musicaPause = new Audio('./sonidos/pause.mp3');
const musicaInicio = new Audio('./sonidos/play.wav');
const musicaFinal = new Audio('./sonidos/beep.mp3');

let tiempoTranscurridoEnSengundos = 1500;
let intervalo = null;


inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }
    else {
        musica.pause();
    }
});

bottonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto');
    tiempoTranscurridoEnSengundos = 300;
    bottonCorto.classList.add('active');
});
bottonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque');
    tiempoTranscurridoEnSengundos = 1500;
    bottonEnfoque.classList.add('active');
});
bottonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo');
    tiempoTranscurridoEnSengundos = 900;
    bottonLargo.classList.add('active');
});
function cambiarContexto(contexto) {
    mostrarTiempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`);
    botones.forEach((contexto) => {
        contexto.classList.remove('active');
    });
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




const cuentaRegresiva = () => {
    if (tiempoTranscurridoEnSengundos <= 0) {
        musicaFinal.play();
        reiniciar();
        return;
    }
    TextoIniciarPausar.textContent = 'Pausar';
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
    tiempoTranscurridoEnSengundos -= 1;
    mostrarTiempo();
    console.log("temporizadir: " + tiempoTranscurridoEnSengundos);
};

bottonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    console.log(intervalo);
    if (intervalo) {
        musicaPause.play();
        reiniciar();
        return;
    }
    musicaInicio.play();
    intervalo = setInterval(cuentaRegresiva, 1000);
}
function reiniciar() {
    clearInterval(intervalo);
    TextoIniciarPausar.textContent = 'Comenzar'
    intervalo = null;
}

function mostrarTiempo() {
    const tiempo = new Date(tiempoTranscurridoEnSengundos * 1000);
    const tiempoFormateado = tiempo.toLocaleDateString('es-col', { minute: '2-digit', second: '2-digit' });
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo();