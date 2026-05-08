
// 1. Configuración de variables
const apiURL = "https://fakestoreapi.com/products";
const contenedor = document.getElementById("contenedor-productos");
const inputBusqueda = document.getElementById("inputBusqueda");
const cargando = document.getElementById("cargando");
const errorMsg = document.getElementById("error");

let listaProductos = [];

// 2. Función para obtener los productos
async function obtenerDatos() {
    try {
        cargando.classList.remove("oculto");
        errorMsg.classList.add("oculto");

        const respuesta = await fetch(apiURL);
        if (!respuesta.ok) throw new Error("Error en el servidor");

        listaProductos = await respuesta.json();
        dibujarTarjetas(listaProductos);

    } catch (error) {
        console.error("Error:", error);
        errorMsg.classList.remove("oculto");
    } finally {
        cargando.classList.add("oculto");
    }
}

// 3. Función para mostrar las tarjetas
function dibujarTarjetas(datos) {
    contenedor.innerHTML = "";

    datos.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title.substring(0, 35)}...</h3>
            <p class="precio">$${item.price}</p>
        `;

        tarjeta.addEventListener("click", () => mostrarDetalle(item));
        contenedor.appendChild(tarjeta);
    });
}

// 4.  buscador
inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = listaProductos.filter(p =>
        p.title.toLowerCase().includes(texto)
    );
    dibujarTarjetas(filtrados);
});

// 5. Función para el Modal (Detalle)
function mostrarDetalle(p) {
    const modal = document.getElementById("modal-detalle");
    const info = document.getElementById("detalle-info");

    info.innerHTML = `
        <img src="${p.image}" style="width: 150px; margin-bottom: 15px;">
        <h2>${p.title}</h2>
        <p style="font-size: 0.9rem; color: #555;">${p.description}</p>
        <p class="precio">Precio: $${p.price}</p>
    `;
    modal.classList.remove("oculto");
}

// 6. Cerrar el modal
document.getElementById("cerrar-modal").onclick = () => {
    document.getElementById("modal-detalle").classList.add("oculto");
};

// Iniciar la aplicación
obtenerDatos();