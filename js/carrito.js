(function () {

    const carrito = document.querySelector('.contadorCarrito');
    const contenedor_carrito = document.querySelector('#contenedor_carrito');
    const precio_total = document.querySelector('#total');
    const btnComprar = document.querySelector('#comprar');
    const compraRealizada = document.querySelector('#alertCompraExistosa')
    const compraRechazada = document.querySelector('#alertCompraRechazada')
    const mainCarrito = document.querySelector('.main_carrito');

    let productosCarrito = [];


    document.addEventListener('DOMContentLoaded', () => {
        revisar_carrito();
        contenedor_carrito.addEventListener('click', eliminarProducto);
        calcularTotal();
    });

    btnComprar.addEventListener('click', realizarCompra)

    function revisar_carrito() {
        if (localStorage.getItem('carrito') == undefined) {
            mensajeVacio();
        } else {
            mostrar_carrito()
        }
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains('eliminar_del_carrito')) {
            const producto = e.target.parentElement.parentElement.parentElement;
            const productoID = producto.querySelector('h3').getAttribute('data-id');
            producto.classList.add('scale-out-center')

            setTimeout(() => {
                productosCarrito = productosCarrito.filter(producto => producto.id !== productoID);
                productosCarrito = [...productosCarrito];
                carrito.textContent = productosCarrito.length;
                sincronizarStorage();
                limpiarHTML();
                mostrar_carrito();
                calcularTotal();
            }, 500);
            // Eliminar del arreglo del carrito

        }
    };

    function mostrar_carrito() {
        productosCarrito = JSON.parse(localStorage.getItem('carrito') || []);
        carrito.textContent = productosCarrito.length;
        if (productosCarrito.length == 0) {
            mensajeVacio();
        } else {
            productosCarrito.forEach(producto => {
                const { imagen, precio, id, titulo } = producto;
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                <img src="${imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title titulo text-dark fw-bold fs-1" data-id="${id}">${titulo}</h3>
                    <p class="card-text descripcionProducto">Lorem ipsum dolor, sit </p>
                    <div class="d-flex gap-2">
                    <button class="btn btn-primary eliminar_del_carrito">Quitar del carrito</button>
                    <span class="text-dark precio text-center fs-2 my-auto">${precio}</span>
                    </div>
                </div>
                `
                contenedor_carrito.appendChild(card);
            });
        }
    };

    function calcularTotal() {
        let total = 0;
        productosCarrito = JSON.parse(localStorage.getItem('carrito') || []);
        productosCarrito.forEach(producto => {
            const precio = Number(producto.precio.slice(1));
            total += precio;
        })
        precio_total.textContent = `$${total}`
    };

    function mensajeVacio() {
        const mensajeVacio = document.createElement('h2');
        mensajeVacio.textContent = 'Aun no tienes articulos en el carrito';
        contenedor_carrito.appendChild(mensajeVacio);
    };

    function realizarCompra(e){
        e.preventDefault();
        if(localStorage.getItem('carrito').length == 2){
            mainCarrito.classList.add('opacity-50')
            compraRechazada.classList.remove('visually-hidden')
            setTimeout(() => {
                compraRechazada.classList.add('scale-in-center')
            }, 500);
        } else{
            mainCarrito.classList.add('opacity-50')
            compraRealizada.classList.remove('visually-hidden')
        }
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    };

    function limpiarHTML() {
        while (contenedor_carrito.firstChild) {
            contenedor_carrito.removeChild(contenedor_carrito.firstChild);
        }
    };

})();