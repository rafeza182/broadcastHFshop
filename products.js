// products.js

const catalogo = [
  {
    categoria: "Micrófonos - Estudio",
    id: "estudio",
    productos: [
      {
        id: "hyperx-quadcast",
        nombre: "HyperX QuadCast USB",
        descripcion: "Micrófono condensador con soporte antivibración.",
        precioOriginal: 139.99,
        imagen: "https://m.media-amazon.com/images/I/81A08tT8sIL._AC_SL1500_.jpg",
        imagenes: [],
        rating: 4.8,
        reviews: 120 * 100
      }
    ]
  },
  {
    categoria: "Micrófonos - Solapa",
    id: "solapa",
    productos: [
      {
        id: "rode-vxlr",
        nombre: "Adaptador Rode VXLR",
        descripcion: "Adaptador XLR a 3.5mm para micrófonos de solapa.",
        precioOriginal: 17.99,
        imagen: "https://m.media-amazon.com/images/I/61LFf5ULAdL._AC_SL1500_.jpg",
        imagenes: [],
        rating: 4.7,
        reviews: 80 * 100
      }
    ]
  },
  {
    categoria: "Audífonos",
    id: "audifonos",
    productos: [
      {
        id: "hyperx-cloud",
        nombre: "HyperX Cloud II",
        descripcion: "Audífonos con sonido 7.1 y micrófono desmontable.",
        precioOriginal: 89.99,
        imagen: "https://m.media-amazon.com/images/I/71YvP1A3HCL._AC_SL1500_.jpg",
        imagenes: [],
        rating: 4.6,
        reviews: 300 * 100
      }
    ]
  },
  {
    categoria: "Interfaces",
    id: "interfaces",
    productos: [
      {
        id: "focusrite-scarlett",
        nombre: "Focusrite Scarlett 2i2",
        descripcion: "Interfaz de audio profesional USB 2x2.",
        precioOriginal: 179.99,
        imagen: "https://m.media-amazon.com/images/I/61XP9IPrGpL._AC_SL1500_.jpg",
        imagenes: [],
        rating: 4.9,
        reviews: 950 * 100
      }
    ]
  },
  {
    categoria: "Accesorios",
    id: "accesorios",
    productos: [
      {
        id: "ancable-adaptador",
        nombre: "Ancable Adaptador Mini Jack",
        descripcion: "Convertidor para cámaras y grabadoras.",
        precioOriginal: 10.99,
        imagen: "https://m.media-amazon.com/images/I/61rK3FbU1gL._AC_SL1500_.jpg",
        imagenes: [],
        rating: 4.5,
        reviews: 90 * 100
      }
    ]
  }
];

function crearCatalogo() {
  const contenedor = document.getElementById("product-catalog");
  contenedor.innerHTML = "";

  catalogo.forEach(categoria => {
    const seccion = document.createElement("section");
    seccion.className = "catalog-section";
    seccion.id = categoria.id;

    const titulo = document.createElement("h2");
    titulo.innerText = categoria.categoria;
    seccion.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid3";

    categoria.productos.forEach(producto => {
      const precio = producto.precioOriginal < 50
        ? producto.precioOriginal * 2.5
        : producto.precioOriginal <= 100
          ? producto.precioOriginal * 2
          : producto.precioOriginal * 1.4;

      const estrellas = "★".repeat(Math.floor(producto.rating)) + "☆".repeat(5 - Math.floor(producto.rating));

      const card = document.createElement("article");
      card.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p class="stars">${estrellas} (${producto.reviews})</p>
        <p class="price">$${precio.toFixed(2)}</p>
        <button onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${precio.toFixed(2)})">Agregar al carrito</button>
      `;

      grid.appendChild(card);
    });

    seccion.appendChild(grid);
    contenedor.appendChild(seccion);
  });
}

function agregarAlCarrito(id, nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "{}");
  if (!carrito[id]) {
    carrito[id] = { nombre, cantidad: 1, precio };
  } else {
    carrito[id].cantidad++;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "{}");
  let total = 0;
  for (let key in carrito) {
    total += carrito[key].cantidad;
  }
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  crearCatalogo();
  actualizarContador();
});
