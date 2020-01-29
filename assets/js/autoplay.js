var tablero = new Array(3);
var ganador;

var puntosMaquina;
var puntosJugador;

var turnoSiguiente;


/////////////////////////TABLERO/////////////////////////////
function crearTablero(){
    for (let index = 0; index < tablero.length; index++) {
        tablero[index] = new  Array(3);
    }
}

function inicializaTablero(){
    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length; columna++) {
            tablero[fila][columna]=0;
            celda = document.getElementById("c"+fila+columna);
            celda.style.background = "";
            celda.innerHTML = ""
        }
    }
}

function muestraTablero(){
    tablero.forEach(fila => {
        fila.forEach(celda => {
            //alert(celda);
        });
    });
}

function tableroLleno(){
    encontrado = true;
    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length; columna++) {
            if(tablero[fila][columna]==0){
                encontrado = false;
                break;
            }
        }
    }
    return encontrado;
}

///////////////////////////PINTA//////////////////////////////
function compruebaCelda(fila, columna){
    if (tablero[fila][columna] == 0)
        return true
    else false
}

function pinta(fila, columna, valor){
    if(ganador == 0 && turnoSiguiente == valor){
        if (compruebaCelda(fila, columna)){
            tablero[fila][columna] = valor;
            celda = document.getElementById("c"+fila+columna);
            celda.style.background = "";
            if (valor == 1) celda.innerHTML = "<div class='unaX'></div>";
            if (valor == 2) celda.innerHTML = "<div class='un0'></div>";
            siguienteTurno();
        }
        esGanador();
    }

    if(turnoSiguiente == 2) turnoMaquina();
}

///////////////////////////GESTION TURNOS//////////////////////////////
function siguienteTurno(){
    if (turnoSiguiente == 1) turnoSiguiente = 2;
    else turnoSiguiente = 1;
}

function turnoMaquina(){

    /** Elige una casilla */

    /** Intenta pintar */

    /** Si el turno pasa al Jugador esta función finaliza */

}

/////////////////////////GANADOR/////////////////////////////
function esGanador(){
    //comprueba filas
    for (let fila = 0; fila < tablero.length; fila++) {
        ganador = compruebaFilas(fila)
        if(ganador != 0){
            break;
        }
    }

    //comprueba columnas
    if(ganador==0){
        for (let columna = 0; columna < tablero[0].length; columna++) {
            ganador = compruebaColumnas(columna)
            if(ganador != 0){
                break;
            }
        }
    }

    if(ganador==0){
        ganador = compruebaDiagonal()
    }

    if(ganador!=0){
        actualizaPuntuacion();
        //alert("El jugador "+ ganador + " es el ganador");
    } 
    
}

function compruebaFilas(fila){
    if(tablero[fila][0] == tablero[fila][1] && tablero[fila][0] == tablero[fila][2] && tablero[fila][1] == tablero[fila][2] && tablero[fila][0]!=0){
        return tablero[fila][0];
    }
    else
        return 0
}

function compruebaColumnas(columna){
    if(tablero[0][columna] == tablero[1][columna] && tablero[0][columna] == tablero[2][columna] && tablero[1][columna] == tablero[2][columna] && tablero[0][columna]!=0){
        return tablero[0][columna];
    }
    else
        return 0
}

function compruebaDiagonal(){
    if(tablero[0][0] == tablero[1][1] && tablero[0][0] == tablero[2][2] && tablero[1][1] == tablero[2][2] && tablero[0][0]!=0){
        return tablero[0][0];
    }

    else if (tablero[0][2] == tablero[1][1] && tablero[0][2] == tablero[2][0] && tablero[1][1] == tablero[2][0] && tablero[0][2]!=0) {
        return tablero[0][2];
    } 
    else
        return 0
}

function actualizaPuntuacion(){
    if (ganador == 1){
        puntuacion = document.getElementById("puntosJugador");
        puntosJugador = puntosJugador+1;
        puntuacion.innerHTML = "<h2>"+puntosJugador+" puntos</h2>"
    }

    if (ganador == 2){
        puntuacion = document.getElementById("puntosMaquina");
        puntosMaquina= puntosMaquina+1;
        puntuacion.innerHTML = "<h2>"+puntosMaquina+" puntos</h2>"
    }
    
    
}


/////////////////////////Nueva Partida/////////////////////////////
function nuevaPartida(){
    if (!tableroLleno() && ganador == 0){
        //alert("La partida no ha finalizado");
    }

    else{
        //alert("Va a comenzar una nueva partida. Los puntos se mantienen");
        ganador = 0;
        inicializaTablero();
    }
}


/////////////////////////AUTOPLAY/////////////////////////////

function autoplay(){
    ganador = 0;
    
    turnoSiguiente = 1;

    puntosMaquina=0;
    puntosJugador=0;
    crearTablero();
    inicializaTablero();
}

autoplay();
