## Proyecto ecommerce (Sex Discos)

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/Principal.png)


###### Página Principal:

La página principal presenta un diseño con un menú de navegación y secciones de productos.

Ofrece una variedad de categorías, como vinilos, CDs, cassettes y camisetas.
Se destaca la disponibilidad de nuevo material con imágenes atractivas y un llamado a la acción para explorar todos los productos.

Los productos se cargan dinámicamente desde un servidor local y se muestran en tarjetas con imágenes, descripciones y precios.
Se implementa un carrito de compras interactivo que muestra la cantidad de productos añadidos.

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/Web.png)

###### Carrito de Compras:

La página del carrito muestra los productos seleccionados con detalles como imágenes, descripciones, precios y cantidades.
Permite la actualización de cantidades y proporciona la opción de eliminar productos del carrito.
Muestra el monto total de la compra y ofrece un botón para realizar la compra.
Al hacer clic en "Comprar Ahora", se muestra una notificación de compra exitosa.

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/carrito.png)

Funcionalidades añadidas:

La aplicación utiliza Toastify y sweetalert2 para notificar al usuario sobre acciones como agregar productos al carrito o al finalizar la compra.
Se utiliza Local Storage para almacenar información sobre productos y el carrito, permitiendo una experiencia de usuario persistente.
Se han implementado funciones para filtrar productos por categoría y para mostrar todos los productos disponibles.
Se ha aplicado un diseño atractivo y responsivo con el uso de la biblioteca Bootstrap(poco uso) y Tailwind CSS.

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/librerias.png)

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/libreria2.png)

###### Servidor Local (server.js):

Se ha creado un servidor local para gestionar la carga de productos en la tienda.
Se han definido clases y funciones para representar y crear productos.
El inventario incluye vinilos, cassettes, CDs y camisetas, cada uno con detalles específicos.

![](https://github.com/goberto88/Proyecto-final-tienda-SexDiscos/blob/main/servidor.png)

En resumen, este proyecto es una tienda en línea que ofrece una experiencia de compra atractiva y fácil de usar para los amantes de la música extrema. La implementación de características como la notificación de productos añadidos y la persistencia de datos mejora la usabilidad general del sitio.
