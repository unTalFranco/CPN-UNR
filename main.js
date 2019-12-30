function Materia(ano, id, nombre, correlativas, condicion, estadoCorrelativas) {
    this.ano = ano;
    this.id = id;
    this.nombre = nombre;
    this.correlativas = correlativas;
    this.condicion = condicion;
    this.estadoCorrelativas = estadoCorrelativas;
}

var listaMaterias = [
    new Materia(1, 01, 'Introducción a las Cs. Sociales', 0, false, false),
    new Materia(1, 02, 'Introducción a la Economía', 0, false, false),
    new Materia(1, 03, 'Matemática I', 0, false, false),
    new Materia(1, 04, "Introducción a la Administración", 0, false, false),
    new Materia(1, 05, 'Introducción a la Teoría Contable', 0, false, false),
    new Materia(1, 06, 'Matemática II', [03], false, false),
    new Materia(2, 07, 'Sistemas y Procedimientos Administrativos', [04], false, false),
    new Materia(2, 08, 'Macroeconomía', [01, 02], false, false),
    new Materia(2, 09, 'Introducción al Derecho Privado', [], false, false),
    new Materia(2, 10, 'Matemática Financiera', [06], false, false),
    new Materia(2, 11, 'Contabilidad I', [05], false, false),
    new Materia(2, 12, 'Microeconomía', [01, 02], false, false),
    new Materia(2, 13, 'Derecho Constitucional y Administrativo', [09], false, false),
    new Materia(2, 14, 'Métodos Estadísticos', [06], false, false),
    new Materia(3, 15, 'Contabilidad II', [11], false, false),
    new Materia(3, 16, 'Sistema de Información y Procesamiento de Datos', [07], false, false),
    new Materia(3, 17, 'Finanzas Públicas', [12, 13], false, false),
    new Materia(3, 18, 'Derecho Comercial', [09], false, false),
    new Materia(3, 19, 'Costos', [07, 11, 14], false, false),
    new Materia(3, 20, 'Sociedades y Asociaciones', [18], false, false),
    new Materia(3, 21, 'Derecho Laboral y de la Seguridad Social', [13], false, false),
    new Materia(3, 22, 'Contabilidad III', [15], false, false),
    new Materia(4, 23, 'Impuestos I', [11, 17], false, false),
    new Materia(4, 24, 'Contabilidad IV', [22], false, false),
    new Materia(4, 25, 'Información para la Gestión', [16, 19], false, false),
    new Materia(4, 26, 'Estructura y Política Económica Argentina', [8, 17], false, false),
    new Materia(4, 27, 'Administración y Contabilidad Pública', [7, 11, 17], false, false),
    new Materia(4, 28, 'Práctica Profesional de Aplicación Jurídica', [20, 21, 22], false, false),
    new Materia(4, 29, 'Administración Financiera para Contadores', [7, 10, 14, 24], false, false),
    new Materia(5, 30, 'Impuestos II', [20, 21, 23], false, false),
    new Materia(5, 31, 'Auditoría', [16, 19, 20, 22], false, false),
    new Materia(5, 32, 'Práctica Profesional de Aplicación Administrativo-Contable', [16, 20, 21, 24], false, false),
    new Materia(5, 33, 'Práctica Profesional Optativa', [0], false, false),
    new Materia(5, 34, 'Asignatura Electiva', [0], false, false),
    new Materia(5, 35, 'Concursos', [20, 21, 22, 28], false, false),
]


///-----------------------Manipulacion del DOM----------------------------///
function borrarNodos() {
    var div = document.getElementById('contenedorUl');
    var child = document.getElementById('listaMaterias');
    div.removeChild(child);
}

function pintarMaterias() {
    var div = document.getElementById('contenedorUl');
    var ul = div.insertAdjacentHTML('afterbegin', "<ul id='listaMaterias' class='collapsible popout' data-collapsible='accordion'> </ul>  ")
    $('.collapsible').collapsible();  //Para que funcione el collapsive dinamico de materialize.
    
    
    listaMaterias.forEach(element => {
        pintoMateria(element)//Por cada materia llamo a la funcion que se encargara de insertar un nuevo LI al dom con los datos de la materia.
    });
    //
}

function correlativasEs(materia) {
    //-cuales son las correlativas? Devolver array de corr con id y nombre.
    if (materia.condicion == true) { return '' }
    else {
        if (materia.correlativas == 0) { return `<span class="badge" data-badge-caption="No tiene correlativas"></span>` }
    }
    if (materia.condicion == false && materia.correlativas != 0) {
        var corrSinAprobar = [];
        materia.correlativas.forEach(element => {
            var indiceMateria = listaMaterias.findIndex(x => x.id == element);
            if (listaMaterias[indiceMateria].condicion == false) {
                corrSinAprobar.push(listaMaterias[indiceMateria].nombre);
            }
        });
        if (corrSinAprobar.length > 0) { return `<span class="badge" data-badge-caption="Debe ${corrSinAprobar.length} correlativas"></span></div><div class="collapsible-body"><span>${corrSinAprobar}</span></div></li>` }
        if (corrSinAprobar.length == 0) { return `<span class="purple darken-4 new badge" data-badge-caption="OK"></span></div><div class="collapsible-body"><span>Ya puede preparar para rendir esta materia! :)</span></div></li>` }
    } 
}

function pintoMateria(materia) {
    // correlativas(materia)
    var correlativas = correlativasEs(materia);
    var ul = document.getElementById('listaMaterias');
    // Si esta aprobada o no
    var condicion = 'clear';
    if (materia.condicion) { condicion = 'beenhere' }; // icono de aprobado.    
    var li = ul.insertAdjacentHTML('beforeend', `<li id='li${materia.id}'><div class="collapsible-header"><i class="material-icons">${condicion}</i>${materia.nombre}${correlativas}`)
}

function completarForm() {
    var form = document.getElementById('formModal');
    listaMaterias.forEach(element => {
        var checked = false;
        if (element.condicion) { checked = "checked=true"; }
        var mat = form.insertAdjacentHTML('beforeend', `<p><input type="checkbox" id="${element.id}" class = "matModal" ${checked} /><label for="${element.id}">${element.nombre}</label></p>`)
    });
}

///----------------------------------------------Tomando info del dom----------------------------///


// al apretar boton 'guardar' del modal debo guardar un array con todas las materias aprobadas o no 
var nuevosDatos = []

function captarDatosModal() {
    nuevosDatos = [];
    var modal = Array.from(document.getElementsByClassName('matModal'));
    modal.forEach(element => {
        var materia = {
            idMateria: element.id,
            condicion: element.checked,
        };
        nuevosDatos.push(materia);
    });
}

// actualizar el array original

function actualizarMateriasAprobadas() {
    nuevosDatos.forEach(element => {
        console.log(element.idMateria)
        var indiceMateria = listaMaterias.findIndex(x => x.id == element.idMateria);
        listaMaterias[indiceMateria].condicion = element.condicion;
    });
}

//-------------------------barra progreso---------------------------------//
function contarMateriasAprobadas() {
    var materiasAprobadas = 0;
    listaMaterias.forEach(element => {
        if (element.condicion) {
            materiasAprobadas ++ ;            
        }
    });
    console.log(materiasAprobadas)
    var porcentajeMateriasAprobadas = materiasAprobadas / listaMaterias.length * 100;
    return porcentajeMateriasAprobadas;
}

function pintarBarraProgreso(){
    var progreso = contarMateriasAprobadas();
    var barraProgreso = document.getElementById('progresoCarrera');
    barraProgreso.style.width = `${progreso}%`
}

function activarToast(){
    var porcentaje = contarMateriasAprobadas();
    var porcentajeFixed = porcentaje.toFixed(0);
    
    Materialize.toast(`${porcentajeFixed}% de materias Aprobadas!`, 4000)   
}

///--------------------------Filtrar----------------------------------------///
//Consultar -aprobadas o no -
function consultarMaterias(condicion){ //Se puede filtrar por aprobada o no , lista para rendir. 
    var lista = [];
    var div = document.getElementById('materiasFiltradas');
    var titulo = document.getElementById('tituloModal');
    div.innerHTML = '';
    listaMaterias.forEach(element => {
        if(element.condicion == condicion){
            lista.push(element.nombre)
            div.insertAdjacentHTML('beforeend',`; ${element.nombre}`)
        }
    });
    if(condicion){titulo.innerHTML = ` ${lista.length} materias Aprobadas :`} else{ titulo.innerHTML = ` ${lista.length} materias desaprobadas : `}
   }

///--------------------------Local storage----------------------------------///

function guardarEnLocalStorage(){
    localStorage.setItem('datosMaterias',JSON.stringify(listaMaterias))
}

function cargarLocalStorage(){
    if(localStorage.getItem('datosMaterias')){listaMaterias = JSON.parse(localStorage.getItem('datosMaterias'))}    
}

function guardarDatos() {
    captarDatosModal();
    actualizarMateriasAprobadas();
    guardarEnLocalStorage();
    cargarLocalStorage();
    borrarNodos();
    pintarMaterias();
    pintarBarraProgreso()
    Materialize.showStaggeredList('#contenedorUl')
}
//---------------------------------------------------------//

$(document).ready(function () {
    cargarLocalStorage();
    $('.modal').modal();
    pintarMaterias();
    completarForm()
    pintarBarraProgreso()   
    
});

   
     