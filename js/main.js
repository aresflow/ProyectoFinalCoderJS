//Arrays
const librosC = [];

//Variables
let newAutor;
let newPrecio;
let newNombre;
let newPortada;
let newId;
let hayStock;
// let idElementoAgregado = [];
let idElementoAgregado =  JSON.parse(localStorage.getItem('idElemento')) || [];
let id = [];

//Clases
class Libros {
    constructor (id, nombre, autor, portada, precio) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.portada = portada;
        this.precio = precio;
        this.disponible = true;
    }

    disp () {
        this.disponible = false;
    }

    info () {
        return 'El libro ' + this.nombre + ' fue escrito por ' + this.autor + ' y tiene un valor de $' + this.precio;
    }

    newLibro () {
        return 'el libro ' + this.nombre + 'el cual fue escrito por ' + this.autor + 'y tiene un ';
    }
}


//Carga de datos manual
librosC.push(new Libros(1, "The Hunger Games", "Suzanne Collins", "./images/thgportada.jpg", 1500));
librosC.push(new Libros(2, "Catching Fire", "Suzanne Collins", "./images/catchingfireportada.jpg", 1600));
librosC.push(new Libros(3, "Mockingjay", "Suzanne Collins", "./images/mockingjayportada.jpg", 2000));
librosC.push(new Libros(4, "The Maze Runner", "James Dashner", "./images/tmzportada.jpg", 1300));
librosC.push(new Libros(5, "The Scorch Trials", "James Dashner", "./images/tstportada.jpg", 1500));
librosC.push(new Libros(6, "The Death Cure", "James Dashner", "./images/lcmportada.jpg", 1700));
librosC.push(new Libros(7, "IT", "Stephen King", "./images/itportada.jpg", 2300));
librosC.push(new Libros(8, "Carrie", "Stephen King", "./images/carrieportada.jpg", 900));
librosC.push(new Libros(9, "Cementerio de animales", "Stephen King", "./images/cementerioportada.jpg", 2000));
librosC.push(new Libros(10, "Ready player one", "Ernest Cline", "./images/rpoportada.jpg", 1650));


//Funcionalidad
sinStock();  //Declaro algunos libros sin stock
infoLibro();
addCarritoTrue();
nuevoPedido();


//Funciones

//Funcion para ver si esta disponible el libro y de ser asi agregarlo al carrito
function estaDisponible (opc) {
    for (let i = 0; i < librosC.length ; i++) { 
        if (librosC[i].id == opc && librosC[i].disponible == true){
            console.log("Hay stock");
        }
        else if (librosC[i].id == opc && librosC[i].disponible == false) {
            console.log("No hay stock")
        }
        else {
            console.log("No se encontraron coincidencias");
        }
    }
}

//Funcion que despliega info sobre el libro seleccionado, en un futuro se mostraria cargado en el html, no por un alert
function infoLibro () {
    let i = 0;
    let band = 0;
    do {
        if (window.location.href.indexOf("id"+i) > -1) {
            libroDisponible(i);

            let contenedor = document.createElement("div");

            contenedor.innerHTML = `<div class="info-book">
                                    <h3> Libro:</h3> <p> ${librosC[i-1].nombre} </p>
                                    <h3> Autor:</h3> <p> ${librosC[i-1].autor} </p>
                                    <h3> Precio:</h3> <p> ${librosC[i-1].precio} </p>
                                    </div>`
            document.body.appendChild(contenedor);
            band = 1;

            addCarrito(i);
        }
        else {
            i++;
        }
    } while ((i < librosC.length) && (band == 0));
}

//Verifica que haya stock del libro seleccionado
function libroDisponible (i) {
        if(librosC[i].disponible == true){
            hayStock = 1;
            let contenedor = document.createElement("div");

            contenedor.innerHTML = `<div class="stock">
                                    <h3> Hay stock del libro seleccionado </h3>
                                    <button id="submit-book" class="submit-bookk">Agregar al carrito</button>
                                    </div>`
            document.body.appendChild(contenedor);
        }
        else {
            let contenedor = document.createElement("div");

            contenedor.innerHTML = `<div class="stock">
                                    <h3> Actualmente no se encuentra disponible el libro seleccionado </h3>
                                    </div>`
            document.body.appendChild(contenedor);
        }
}

function sinStock () {                          //En un futuro, mediante un parametro, me servira para marcar
    for (let i =1; i < librosC.length; i++){    //de manera mas rapida, que libros no tienen mas stock
        if(librosC[i].id == 7) {               
            librosC[i+1].disp();              
        }
    }
    librosC[1].disp();
    librosC[2].disp();  
}

//Guardo en localStorage el ID del elemento seleccionado para agregar al carrito
function addCarrito (e) {
    if (hayStock == 1) {
        let carrito = document.getElementById("submit-book");

        carrito.onclick = function () {
            console.log("se agrega elemento al carrito id: " + e);
            idElementoAgregado.push(e);
            console.log(idElementoAgregado);
            localStorage.setItem('idElemento', JSON.stringify(idElementoAgregado));

            let avisoCarrito = document.createElement("div");

            avisoCarrito.innerHTML = `<div class="info-book-agregado">
                                      <h5> Se añadió al carrito </h5>
                                      </div>`
            document.body.appendChild(avisoCarrito);
        }
    }
}

function addCarritoTrue () {
    if (window.location.pathname == "/carrito.html"){
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            id = localStorage.getItem(clave);

            var obj = JSON.parse(id);
            
            for (let x = 0; x < obj.length; x++) { 
                let cont = obj[x];
                let contenedor = document.createElement("div");
            contenedor.innerHTML = `<div class="info-book-carrito">
                                    <h3> Libro:</h3> <p> ${librosC[cont-1].nombre} </p>
                                    <h3> Autor:</h3> <p> ${librosC[cont-1].autor} </p>
                                    <h3> Precio:</h3> <p> ${librosC[cont-1].precio} </p>
                                    </div>`
        
            document.body.appendChild(contenedor);
            }

            let conti = document.createElement("div");
            conti.innerHTML = `<div class="button-carrito">
                                <button onclick="vacioCarrito()">
                                Vaciar carrito
                                </button>
                                </div>`
            document.body.appendChild(conti);
        }
    }
}

//Vacio carrito
function vacioCarrito () {
    localStorage.clear();
    location.reload();
}

//Nuevo pedido de libro por el usuario
function nuevoPedido () {
    if (window.location.pathname == "/contacto.html"){
        let formPedido = document.getElementById("formulario");
        formPedido.addEventListener("submit", validarForm);

        function validarForm (e) {
            e.preventDefault();
            let formulario = e.target;

            //Muestro en pantalla los datos ingresados por el user
            let contenedor = document.createElement("div");

            contenedor.innerHTML = `<div class="new-order">
                                    <h4> Felicidades, usted ingreso </h4>
                                    <p> Libro: ${formulario.children[0].value} </p>
                                    <p> Autor/a: ${formulario.children[1].value} </p>
                                    <p> Contacto: ${formulario.children[2].value} </p>
                                    <p> Nos comunicaremos a la brevedad con usted </p>
                                    </div>`
        
            document.body.appendChild(contenedor);
        }
    }
}



//Menu hamburguesa
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible");

    if (navMenu.classList.contains("nav-menu_visible")) {
        navToggle.setAttribute("aria-label", "Cerrar menu");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menu");
    }
});