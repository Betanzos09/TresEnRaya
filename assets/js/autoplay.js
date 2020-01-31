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
            if (valor == -1) celda.innerHTML = "<div class='un0'></div>";
            siguienteTurno();
        }
        esGanador();
    }
}

///////////////////////////GESTION TURNOS//////////////////////////////
function siguienteTurno(){
    if (turnoSiguiente == 1) turnoSiguiente = -1;
    else turnoSiguiente = 1;
}

function turnoMaquina(){
    setInterval(function(){
        while(turnoSiguiente == -1 && ganador == 0 && !tableroLleno()){
            //posicion = posicionRandom();/**Crea posiciones aleatorias */
            posicion = algoritmoMinMax();/**Llama al algoritmo MinMax */
            fila = posicion[0];
            columna = posicion[1];
            valor = -1;
            pinta(fila, columna, valor);
        }
    },1000);
}

///////////////////////////MAQUINA//////////////////////////////
function posicionRandom(){
    var posicion = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
    return posicion
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
        if (ganador ==1){
            ganadorJugador();
            profundidad =8;
        } 
        if (ganador ==-1) ganadorMaquina();
    } 

    else if(tableroLleno()){
        tablas();
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
        puntuacion.innerHTML = "<h2 class='zoom'>"+puntosJugador+" puntos</h2>"
    }

    if (ganador == -1){
        puntuacion = document.getElementById("puntosMaquina");
        puntosMaquina= puntosMaquina+1;
        puntuacion.innerHTML = "<h2 class='zoom'>"+puntosMaquina+" puntos</h2>"
    }
    
    
}


/////////////////////////NUEVA PARTIDA/////////////////////////////
function nuevaPartida(){
    if (!tableroLleno() && ganador == 0){
        noFinalizada();
    }

    else{
        ganador = 0;
        turnoSiguiente = 1;
        inicializaTablero();
        ocultaMensaje();
    }
}

/////////////////////////MENSAJE/////////////////////////////
function muestraMensaje(contenidoMensaje){
    mensaje = document.getElementById("mensaje");
    mensaje.style.display = "block";
    mensaje.innerHTML = contenidoMensaje;
}

function ocultaMensaje(){
    mensaje = document.getElementById("mensaje");
    mensaje.style.display = "none";
    mensaje.innerHTML = "";
}

function nunca(){
    contenidoMensaje= "<h1>Tampoco te canses demasiado</h1><h2>...</h2>";
    muestraMensaje(contenidoMensaje);
}

function vale(){
    profundidad = 3;
    contenidoMensaje = "<h1>Eres patético</h1><h2>...</h2>";
    muestraMensaje(contenidoMensaje);
}

function noFinalizada(){
    contenidoMensaje = "<h1>Debes de terminar lo que empiezas</h1><div onclick='ocultaMensaje()' class='botonOrange'><h3>OK</h3></div>";
    muestraMensaje(contenidoMensaje);
}

function ganadorJugador(){
    contenidoMensaje = "<h1>Felicidades Jugador</h1><h2>Eres más listo de lo que pareces...</h2><h2>Ahora verás</h2>"
    muestraMensaje(contenidoMensaje);
}


function ganadorMaquina(){
    contenidoMensaje = "<h1>Postrate ante mi!</h1><div onclick='nunca()' class='botonRed'><h3>Nunca!</h3></div><div onclick='vale()' class='botonGreen'><h3>Vale!</h3></div>"
    muestraMensaje(contenidoMensaje);
}

function tablas(){
    contenidoMensaje = "<h1>Tablas</h1><h2>Pulsa en Nueva Partida para continuar</h2>"; 
    muestraMensaje(contenidoMensaje);
}

/////////////////////////AUTOPLAY/////////////////////////////

function autoplay(){
    ganador = 0;
    
    turnoSiguiente = 1;

    puntosMaquina=0;
    puntosJugador=0;

    crearTablero();
    inicializaTablero();
    turnoMaquina();
    //algoritmoMinMax();
}

autoplay();
