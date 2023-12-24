//Buscar productos del carrito desde el LS

let productosEnCarrito = JSON.parse(localStorage.getItem('carrito'));
console.log(productosEnCarrito);


//Elementos del DOM
const tituloVacio = document.querySelector('#titulo-vacio');
const contenedorCarrito = document.querySelector('#contenedor-carrito');
const totalCarrito = document.querySelector('#total-carrito');
let btnEliminar = document.querySelectorAll(".carrito-borrar");
const montoTotal = document.querySelector('#monto-total');
const comprar = document.querySelector('#comprar');

//Mostrar elementos en el carrito

function mostrarCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        tituloVacio.classList.add('activado');
        contenedorCarrito.classList.remove('activado');
        totalCarrito.classList.remove('activado');

        contenedorCarrito.innerHTML = "";
        productosEnCarrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto','w-10/12', 'flex','flex-col','justify-between','bg-gradient-to-b','from-stone-100','to-neutral-30','text-texto-principal','p-4','mx-4','my-4');

            div.innerHTML = `
            <div class="flex flex-col md:flex-row items-center">
              <div class="w-full md:w-2/12 mb-4 md:mb-0 md:mr-4">
                <img class="carrito-img object-contain max-w-full md:max-w-24" src="${producto.imagen}" alt="${producto.descripcion}">
              </div>
          
              <div class="w-full md:w-4/12 mb-4 md:mb-0">
                <small class="carrito-desc">${producto.descripcion}</small>
                <h3>${producto.banda}</h3>
              </div>
          
              <div class="flex flex-col md:flex-row w-full md:w-6/12 items-center justify-between">
                <div class="text-right w-full md:w-4/12 mb-4 md:mb-0 carrito-precio">
                  <h6 class="mr-2 md:mr-5">$${producto.precio}</h6>
                </div>
          
                <div class="w-full md:w-3/12 mb-4 md:mb-0 carrito-cantidad">
                  <input type="text" class="w-10 form-control input-sm" value="${producto.cantidad}">
                </div>
          
                <button class="w-full md:w-auto mb-4 md:mb-0 carrito-borrar text-red-700 hover:translate-y-1 hover:scale-110" id="${producto.id}">
                  <i class="bi bi-trash3"></i>
                </button>
              </div>
            </div>
            <hr class="mt-4">
          `;
            
            contenedorCarrito.append(div);
            
        });
        
    } else {
        tituloVacio.classList.remove('activado');
        contenedorCarrito.innerHTML = "";
        contenedorCarrito.classList.add('activado');
        totalCarrito.classList.add('activado');
    }

    btnLimpiar();
    actualizar()
   
}
// Con esto eliminamos los productos añadidos al carrto, utilizando la papelera. 

function btnLimpiar() {
    btnEliminar = document.querySelectorAll(".carrito-borrar");

    btnEliminar.forEach(boton => {
        boton.addEventListener("click", eliminar);
    });
}


// Función para eliminar un producto del carrito (aplicamos Toastify)
function eliminar(e) {
    Toastify({
        text: "Producto Eliminado",
        duration: 4000,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #d6ce28, #e7bc0a)",
        },
        offset: {
            x: '0.5rem',
        },
        color: {
            text: '#fff',
        },
        onClick: function () {} // Callback after click
    }).showToast();
    const idBtn = e.currentTarget.id;
    const indice = productosEnCarrito.findIndex(producto => producto.id === idBtn);
    if (indice !== -1) {
        if (productosEnCarrito[indice].cantidad > 1) {
            productosEnCarrito[indice].cantidad -= 1;
        } else {
            productosEnCarrito.splice(indice, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
        mostrarCarrito();
    }
}

mostrarCarrito();

// Función para actualizar el monto total del carrito

function actualizar(){
    const totales = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    montoTotal.innerText = `$${totales}`;
}

//Función para vaciar el carrito a la hora de comprar(aplicamos swal)

function borrarCarrito() {
  productosEnCarrito = [];
  localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
  mostrarCarrito();
}

comprar.addEventListener('click', () => {
    Swal.fire({
        title: "FELICIDADES",
        text: "¡Tu compra ha sido exitosa!",
        imageUrl: "./LogoSexDiscos/sexDisco-logo.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonColor: "#c50b1b",

      });
      borrarCarrito();
})


