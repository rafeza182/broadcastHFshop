// products.js

const catalogo = [
  {
    categoria: "Micrófonos - Estudio / Podcast",
    id: "estudio",
    productos: [
      {
        id: "hyperx-quadcast",
        nombre: "HyperX QuadCast USB",
        descripcion: "Micrófono condensador con soporte antivibración y control de ganancia.",
        precioOriginal: 139.99,
        imagen: "https://m.media-amazon.com/images/I/81A08tT8sIL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/81A08tT8sIL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71kfpXanv7L._AC_SL1500_.jpg"
        ],
        rating: 4.8,
        reviews: 132 * 100
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
        descripcion: "Adaptador de XLR hembra a miniconector de 3.5mm. Ideal para micrófonos de solapa.",
        precioOriginal: 17.99,
        imagen: "https://m.media-amazon.com/images/I/61LFf5ULAdL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/61LFf5ULAdL._AC_SL1500_.jpg"
        ],
        rating: 4.7,
        reviews: 122 * 100
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
        descripcion: "Audífonos de juego con sonido envolvente 7.1, micrófono desmontable.",
        precioOriginal: 89.99,
        imagen: "https://m.media-amazon.com/images/I/71YvP1A3HCL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/71YvP1A3HCL._AC_SL1500_.jpg"
        ],
        rating: 4.6,
        reviews: 312 * 100
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
        descripcion: "Interfaz de audio USB de 2 entradas / 2 salidas para grabación profesional.",
        precioOriginal: 179.99,
        imagen: "https://m.media-amazon.com/images/I/61XP9IPrGpL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/61XP9IPrGpL._AC_SL1500_.jpg"
        ],
        rating: 4.9,
        reviews: 980 * 100
      }
    ]
  },
  {
    categoria: "Accesorios",
    id: "accesorios",
    productos: [
      {
        id: "ancable-mini-jack",
        nombre: "Ancable Adaptador Mini Jack",
        descripcion: "Adaptador de micrófono de 3.5mm a XLR para cámaras y grabadoras.",
        precioOriginal: 10.99,
        imagen: "https://m.media-amazon.com/images/I/61rK3FbU1gL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/61rK3FbU1gL._AC_SL1500_.jpg"
        ],
        rating: 4.4,
        reviews: 80 * 100
      }
    ]
  }
];

const contenedor = document.getElementById("product-catalog");

catalogo.forEach(categoria => {
  const seccion = document.createElement("section");
  seccion.innerHTML = `<h2 class="category-title" id="${categoria.id}">${categoria.categoria}</h2>`;
  const grid = document.createElement("div");
  grid.className = "grid3";
  categoria.productos.forEach(producto => {
    let precioFinal = producto.precioOriginal < 50 ? producto.precioOriginal * 2.5 : producto.precioOriginal <= 100 ? producto.precioOriginal * 2 : producto.precioOriginal * 1.4;
    const estrellas = "★".repeat(Math.floor(producto.rating)) + "☆".repeat(5 - Math.floor(producto.rating));
    const card = document.createElement("article");
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <figure>
        <img src="${producto.imagen}" alt="${producto.nombre}" />
        <figcaption>
          <div class="gallery">
            ${producto.imagenes.map(img => `<img src="${img}" alt="">`).join('')}
          </div>
        </figcaption>
      </figure>
      <p class="stars">${estrellas} (${producto.reviews})</p>
      <p class="price">$${precioFinal.toFixed(2)}</p>
      <button onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${precioFinal})">Agregar al carrito</button>
    `;
    grid.appendChild(card);
  });
  seccion.appendChild(grid);
  contenedor.appendChild(seccion);
});

function agregarAlCarrito(id, nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito') || '{}');
  if (!carrito[id]) {
    carrito[id] = { nombre, cantidad: 1, precio };
  } else {
    carrito[id].cantidad++;
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  let carrito = JSON.parse(localStorage.getItem('carrito') || '{}');
  let totalItems = Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("cart-count").textContent = totalItems;
}

// Iniciar contador al cargar
actualizarContador();