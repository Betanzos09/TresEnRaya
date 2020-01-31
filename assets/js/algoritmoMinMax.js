var profundidad = 3;//nivel de exploración de los nodos


//let operadores
    //contiene los tableros con los posibles estados futuros

//Condicion Terminal:
    //llamar a la función esGanador() cuando sea necesario comprobar
    //si hay un ganador

//Funcion utilidad
    //si existe un ganador para un tablero en concreto se guarda en
    //un array que corresponde a los posibles tableros futuros

//Implementación


//////////////////////FUNCIONES PRINCIPALES//////////////////////////////


function algoritmoMinMax(){
    let posicion = [0,0]; //posición que intentará pintar la máquina
    let profundidadActual = 0; //para la exploración de nodos
    let tableroActual = copiaTablero(tablero);//copia del tablero actual
    let utilidadArray = []; //contiene la utilida de cada tableto
    posicion = funcionMax(tableroActual,profundidadActual,utilidadArray);
    return posicion;
}

function funcionMax(tableroActual,profundidadActual,utilidadArray){
    let utilidadLocal = getUtilidadTablero(tableroActual);
    if(utilidadLocal == -1 || utilidadLocal == 1){
        utilidadArray.push(utilidadLocal);
    }
        

    else if(posibleTableroLleno(tableroActual)||profundidadActual>=profundidad){
        utilidadArray.push(0);
    }
    
    else{
        let posicionesPosibles = getPosicionesPosibles(tableroActual);
        let tablerosPosibles = getPosiblesTableros(tableroActual,posicionesPosibles,-1);
        let utilidadesPosibles = []

        for (let index = 0; index < tablerosPosibles.length; index++) {
            let utilidadesLocales = [];
            profundidadActual = profundidadActual +1;
            funcionMin(tablerosPosibles[index],profundidadActual,utilidadesLocales);
            profundidadActual = profundidadActual -1;
            let utilidadLocalFinal = utilidadesLocales[0];
            for (let index = 0; index < utilidadesLocales.length; index++) {
                if(utilidadesLocales[index]>=utilidadLocalFinal)
                    utilidadLocalFinal = utilidadesLocales[index];
                if(utilidadesLocales[index] == 1)
                    break;
            }

            utilidadesPosibles.push(utilidadLocalFinal)
        }


        let utilidadFinal = utilidadesPosibles[0];

        let posicionFinal = posicionesPosibles[0];

        for (let index = 0; index < utilidadesPosibles.length; index++) {
            if(utilidadesPosibles[index]<utilidadFinal){
                utilidadFinal = utilidadesPosibles[index];
                posicionFinal = posicionesPosibles[index];
            }
                
                
        }
        utilidadArray.push(utilidadFinal);
        return posicionFinal;
    }
}

function funcionMin(tableroActual,profundidadActual,utilidadArray){
    let utilidadLocal = getUtilidadTablero(tableroActual);

    if(utilidadLocal == -1 || utilidadLocal == 1){
        utilidadArray.push(utilidadLocal);
    }
        

    else if(posibleTableroLleno(tableroActual)||profundidadActual>=profundidad){
        utilidadArray.push(0);
    }
        
    
    else{
        let posicionesPosibles = getPosicionesPosibles(tableroActual);
        let tablerosPosibles = getPosiblesTableros(tableroActual,posicionesPosibles,1);
        let utilidadesPosibles = []

        for (let index = 0; index < tablerosPosibles.length; index++) {
            let utilidadesLocales = [];
            profundidadActual = profundidadActual +1;
            funcionMax(tablerosPosibles[index],profundidadActual,utilidadesLocales);
            profundidadActual = profundidadActual -1;
            let utilidadLocalFinal = utilidadesLocales[0];

            for (let index = 0; index < utilidadesLocales.length; index++) {
                if(utilidadesLocales[index]>=utilidadLocalFinal)
                    utilidadLocalFinal = utilidadesLocales[index];
                if(utilidadesLocales[index] == 1)
                    break;
            }

            utilidadesPosibles.push(utilidadLocalFinal)
        }


        let utilidadFinal = utilidadesPosibles[0];

        let posicionFinal = posicionesPosibles[0];

        for (let index = 0; index < utilidadesPosibles.length; index++) {
            if(utilidadesPosibles[index]>=utilidadFinal)
                utilidadFinal = utilidadesPosibles[index];
                posicionFinal = posicionesPosibles[index];
                
        }
        utilidadArray.push(utilidadFinal);
        return posicionFinal;
    }
}


//////////////////////FUNCIONES AUXILIARES//////////////////////////////

/**
 * Devuelve el conjunto de posiciones posibles
 * */
function getPosicionesPosibles(tableroActual){
    posicionesPosibles = [];
    for (let fila = 0; fila < tableroActual.length; fila++) {
        for (let columna = 0; columna < tableroActual[fila].length; columna++) {
            if(tableroActual[fila][columna]==0){
                let posicionActual = [fila,columna]
                posicionesPosibles.push(posicionActual)
            }
        }
    }
    return posicionesPosibles;
}

/**
 * Devuelve los posibles tableros 
 * */
function getPosiblesTableros(tableroActual,posicionesPosibles,valor){
    let posiblesTableros = [];


    for (let index = 0; index < posicionesPosibles.length; index++) {
        let nuevoTablero = copiaTablero(tableroActual);
        fila = posicionesPosibles[index][0];
        columna = posicionesPosibles[index][1];
        nuevoTablero[fila][columna] = valor; //adjudicamos el nuevo valor al tablero
        posiblesTableros.push(nuevoTablero);
    }

    return posiblesTableros;
}

/**
 * Muestra el conjunto de posiciones posibles 
 * */
function showPosicionesPosibles(posicionesPosibles){
    alert(posicionesPosibles);
}

/**
 * Crea una copia exacta del tablero que le pasan por parámetro 
 * */
function copiaTablero(tableroCopia){
    let nuevoTablero = new Array(3);

    for (let index = 0; index < tablero.length; index++) {
        nuevoTablero[index] = new  Array(3);
    }

    for (let fila = 0; fila < tableroCopia.length; fila++) {
        for (let columna = 0; columna < tableroCopia[fila].length; columna++) {
            nuevoTablero[fila][columna]= tableroCopia[fila][columna];
        }
    }

    return nuevoTablero;
}

/**
 * Comprueba la utilidad del tablero 
 * */
function getUtilidadTablero(tableroPosible){
    let posible_ganador = 0;
    for (let fila = 0; fila < tableroPosible.length; fila++) {
        posible_ganador = compruebaPosiblesFilas(fila,tableroPosible)
        if(posible_ganador != 0){
            break;
        }
    }

    //comprueba columnas
    if(posible_ganador==0){
        for (let columna = 0; columna < tableroPosible[0].length; columna++) {
            posible_ganador = compruebaPosiblesColumnas(columna,tableroPosible)
            if(posible_ganador != 0){
                break;
            }
        }
    }

    //comprueba diagonal
    if(posible_ganador==0){
        posible_ganador = compruebaPosiblesDiagonal(tableroPosible)
    }

    return posible_ganador;

}

function compruebaPosiblesFilas(fila,tableroPosible){
    if(tableroPosible[fila][0] == tableroPosible[fila][1] && tableroPosible[fila][0] == tableroPosible[fila][2] && tableroPosible[fila][1] == tableroPosible[fila][2] && tableroPosible[fila][0]!=0){
        return tableroPosible[fila][0];
    }
    else
        return 0
}

function compruebaPosiblesColumnas(columna,tableroPosible){
    if(tableroPosible[0][columna] == tableroPosible[1][columna] && tableroPosible[0][columna] == tableroPosible[2][columna] && tableroPosible[1][columna] == tableroPosible[2][columna] && tableroPosible[0][columna]!=0){
        return tableroPosible[0][columna];
    }
    else
        return 0
}

function compruebaPosiblesDiagonal(tableroPosible){
    if(tableroPosible[0][0] == tableroPosible[1][1] && tableroPosible[0][0] == tableroPosible[2][2] && tableroPosible[1][1] == tableroPosible[2][2] && tableroPosible[0][0]!=0){
        return tableroPosible[0][0];
    }

    else if (tableroPosible[0][2] == tableroPosible[1][1] && tableroPosible[0][2] == tableroPosible[2][0] && tableroPosible[1][1] == tableroPosible[2][0] && tableroPosible[0][2]!=0) {
        return tableroPosible[0][2];
    } 
    else
        return 0
}

function posibleTableroLleno(tableroActual){
    encontrado = true;
    for (let fila = 0; fila < tableroActual.length; fila++) {
        for (let columna = 0; columna < tableroActual[fila].length; columna++) {
            if(tableroActual[fila][columna]==0){
                encontrado = false;
                break;
            }
        }
    }
    return encontrado;
}