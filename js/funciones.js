const productos = [
    {id:1, nombre:"Duplica tus Gigas", imagen:"https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/multioferta/iconos/duplica_gigas.svg", descripcion:"Por solo $1000 más te duplicamos tus gigas", precio:1000, categoria:"Packs de Gigas"},
    {id:2, nombre:"3GB + 1GB para redes ¡Gratis!", imagen:"https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/prepago/icono-sonrisa.svg", descripcion:"Disfruta de Instagram, Facebook, Youtube, TikTok, a donde vayas con esta super promo. Comprando 3GB de Internet te regalamos 1GB para redes sociales.", precio:2000, categoria:"Compra de Gigas"},
    {id:3, nombre:"10GB + WhatsApp ¡Gratis!", imagen:"https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/prepago/icono-llamada-wpp.svg", descripcion:"No te quedes sin responderle a tus amigos con esa super promo. Comprando 10GB de Internet vas a poder utilizar WhatsApp gratis.", precio:5000, categoria:"Compra de Gigas"},
    {id:4, nombre:"15GB + 1GB para redes ¡Gratis!", imagen:"https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/ofertas/wifi-pass-conex-total-ofertas.svg", descripcion:"Disfruta de Instagram, Facebook, Youtube, TikTok, a donde vayas con esta super promo. Comprando 15GB de Internet te regalamos 1GB para redes sociales.", precio:6500, categoria:"Compra de Gigas"},
    {id:5, nombre:"La promo más elegida de la semana", imagen:"https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/ofertas/ahorra-conex-total-ofertas.svg", descripcion:"Te ofrecemos una promo IM-PER-DI-BLE. 8GB x 7 días a:", precio:3000, categoria:"Packs de Gigas"},
    ];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS = () => {
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length;
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}

const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    notificacion("Carrito Eliminado!");
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id === id);

    return producto;
}

const agregarProductoCarrito = () => {
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS();
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "https://www.personal.com.ar/content/dam/teco-cms-ecosystem/personal/ofertas/tienda-conex-total-ofertas.svg",
        imageWidth: 160,
        imageAlt: "Bolsa de Compras",
        showCancelButton: true,
        confirmButtonColor: "#0099ff",
        cancelButtonColor: "#b90000",
        confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
            }
        });
}

const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}

guardarProductosLS(productos);