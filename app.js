(function () {
    const allProducts = document.querySelector('.main');
    const carrito = document.querySelector('.contadorCarrito');
    const precios = document.querySelectorAll('span.precio');
    const flecha = document.querySelector('.flecha');
    let productosCarrito = [];

    allProducts.addEventListener('click', agregarALcarrito);
    flecha.addEventListener('click', backTOP)
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito') || []);
        carrito.textContent = productosCarrito.length;
        getRandomInt();
    });

    function backTOP() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function getRandomInt() {
        precios.forEach(precio => {
            const precio_random = Math.ceil(Math.random() * 10000);
            precio.textContent = `$${precio_random}`
        })
    }

    function agregarALcarrito(e) {
        e.preventDefault();
        const btnCarrito = e.target;
        const producto = e.target.parentElement.parentElement.parentElement;

        if (btnCarrito.textContent === 'Agregar a carrito') {
            btnCarrito.textContent = 'Quitar del Carrito';
            leerDatos(producto);
            mostrarMensaje('Agregado al carrito');
        } else if (btnCarrito.textContent === 'Quitar del Carrito') {
            quitarDelCarrito(producto);
            btnCarrito.textContent = 'Agregar a carrito';
            mostrarMensaje('Eliminado del Carrito');
        }
    };

    function leerDatos(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('h3').getAttribute('data-id'),
            cantidad: 1
        }

        productosCarrito = [...productosCarrito, infoProducto];

        carrito.textContent = productosCarrito.length;

        sincronizarStorage();
    };

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    };

    function quitarDelCarrito(e) {
        const productoID = e.querySelector('h3').getAttribute('data-id');

        // Eliminar del arreglo del carrito
        productosCarrito = productosCarrito.filter(producto => producto.id !== productoID);
        productosCarrito = [...productosCarrito];

        carrito.textContent = productosCarrito.length;
    };

    function mostrarMensaje(mensaje) {
        const alerta = document.querySelector('.cartelAgregado');
        alerta.textContent = mensaje;
        alerta.classList.remove('d-none')

        setTimeout(() => {
            alerta.classList.add('d-none')
        }, 2000);
    };

})();




