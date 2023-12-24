//Tienda sex discos (Prueba y Cuarta Entrega)


//Cargamos cada producto al html modificando el DOM, recorriendo el listado de productos y anexando cada uno.

//manejar la carga de datos del servidor y el listado de productos

let serverDataLoaded = false;
const listadoArticulos = [];

// Elementos del DOM a manipular

const btnMenu = document.querySelector("#btn-menu");
const menu = document.querySelector("#secc-menu");
const categoria = document.querySelectorAll(".categoria");
let btnAgregar= document.querySelectorAll(".btn-agregar");
const numerito = document.querySelector("#numerito")
const todos = document.querySelector("#todos")

// Evento para mostrar/ocultar el menú responsive

btnMenu.addEventListener("click", () => {

    menu.classList.toggle("hidden");
})


// Mostrar productos
function cargarArticulos(articulos) {
    const producto = document.querySelector("#producto");
    producto.innerHTML = "";

    articulos.forEach(articulo => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `<div class="card bg-gradient-to-b from-yellow-200 to-neutral-30">
             <div class="img-card"><img src="${articulo.imagen}" alt="${articulo.banda}"></div>
             <div class="desc">${articulo.descripcion}</div>
             <div class="banda">${articulo.banda}</div>
             <div class="caja">
                 <div class="precio">$${articulo.precio}</div>
                 <button class="btn btn-agregar" id="${articulo.id}">Añadir al carrito</button>
             </div>
         </div>`;
        producto.append(div);
    });

    actualizarBtn()
}

//Cargamos los productos desde el servidor local haciendo nuestra peticion.

function cargarProductosDesdeServidor() {
    if (!serverDataLoaded) {
        fetch('http://localhost:3000/data')
            .then(response => response.json())
            .then(data => {
                listadoArticulos.length = 0;
                listadoArticulos.push(...data);
                serverDataLoaded = true;

                cargarArticulos(listadoArticulos);
                cargarArticulosLS(); 
            })
            .catch(error => console.error('Error al obtener datos:', error));
    }
}


cargarProductosDesdeServidor();


//Funciones para cargar y guardar productos en el LS

function cargarArticulosLS() {
    if (!serverDataLoaded) {
        const mantenerArticulos = JSON.parse(localStorage.getItem("listadoArticulos"));
        mantenerArticulos ? (listadoArticulos.length = 0, listadoArticulos.push(...mantenerArticulos), cargarArticulos(listadoArticulos)) : null;
    }
}

function guardarArticulosLS() {
    localStorage.setItem("listadoArticulos", JSON.stringify(listadoArticulos));
}

// Obtenemos la categoría actual almacenada en el LS

function obtenerCategoriaActual() {
    return localStorage.getItem("categoriaActual") || "todos";
}

// Guardamos la categoría actual en el LS

function guardarCategoriaActual(categoria) {
    localStorage.setItem("categoriaActual", categoria);
}

// Cargar productos al inicio

cargarArticulosLS();
cargarArticulos(listadoArticulos);

// Obtenemos la categoría actual y cargamos los productos correspondientes a esa categoría

const categoriaActual = obtenerCategoriaActual();
const productosFiltrados = (categoriaActual === "todos")? listadoArticulos: listadoArticulos.filter(articulo => articulo.categoria === categoriaActual);

cargarArticulos(productosFiltrados);

//Boton ver ahora, mostrara todos los productos de la web

todos.addEventListener("click", ()=>{
    cargarArticulos(listadoArticulos);
})

//// Función para filtrar productos por categoría

function filtrarCategoria(event) {
    const seleccionar = listadoArticulos.filter(listado => listado.categoria === event.currentTarget.id);
    cargarArticulos(seleccionar);
    guardarCategoriaActual(event.currentTarget.id);
}

//Evento para los elementos de categoría

categoria.forEach(selCategoria => {
    selCategoria.addEventListener("click", (event) => {
        filtrarCategoria(event);
    });
});

//Guarda los cambios en LS antes de hacer refresh 

window.addEventListener("beforeunload", () => {
    guardarArticulosLS();
});


function actualizarBtn(){
    btnAgregar= document.querySelectorAll(".btn-agregar")
    
    btnAgregar.forEach(boton=>{
        boton.addEventListener("click", añadir);

    });
}

let  añadirAlCarrito;

let productosEnCarrito = JSON.parse(localStorage.getItem('carrito'))

productosEnCarrito
  ? (añadirAlCarrito = productosEnCarrito, actualizarCantidad()): (añadirAlCarrito = []);

  //Añadir productos al carrito(Agregamos Toastify)
function añadir(event){
    
    Toastify({
        text: "Producto añadido",
        duration: 4000,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #d6ce28, #e7bc0a)",
        },
        offset:{
            x: '0.5rem',
        },
        color:{
            text: '#fff',
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idProducto = event.currentTarget.id
    const productoAgregado = listadoArticulos.find(articulo => articulo.id === idProducto)
    const index = añadirAlCarrito.findIndex(producto => producto.id === idProducto);
    index !== -1 ? añadirAlCarrito[index].cantidad++ : (productoAgregado.cantidad = 1, añadirAlCarrito.push(productoAgregado));
    actualizarCantidad();
    
    localStorage.setItem("carrito", JSON.stringify(añadirAlCarrito))
}


// Función para actualizar la cantidad de productos en el numerito del carrito
function actualizarCantidad(){
    let nuevoNumerito = añadirAlCarrito.reduce((contador, producto)=> contador + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}



