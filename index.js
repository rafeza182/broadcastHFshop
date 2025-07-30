// Archivo de productos para radiopro.shop

const catalogo = [
  {
    categoria: "Micrófonos",
    productos: [
      {
        id: "rode-vxlr",
        nombre: "Adaptador Rode VXLR",
        descripcion: "Adaptador de XLR hembra a miniconector de 3.5mm. Ideal para micrófonos de solapa.",
        precioOriginal: 17.99,
        imagen: "https://m.media-amazon.com/images/I/61LFf5ULAdL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/61LFf5ULAdL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71I5xAOfA9L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61bT9g-XptL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71BjsYHjz9L._AC_SL1500_.jpg"
        ],
        rating: 4.7,
        reviews: 122 * 100
      },
      {
        id: "hyperx-quadcast",
        nombre: "HyperX QuadCast USB",
        descripcion: "Micrófono condensador con soporte antivibración y control de ganancia.",
        precioOriginal: 139.99,
        imagen: "https://m.media-amazon.com/images/I/81A08tT8sIL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/81A08tT8sIL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71kfpXanv7L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81egSctt3tL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71K7HqluWxL._AC_SL1500_.jpg"
        ],
        rating: 4.8,
        reviews: 200 * 100
      }
    ]
  },
  {
    categoria: "Audífonos",
    productos: [
      {
        id: "hyperx-cloud",
        nombre: "HyperX Cloud II",
        descripcion: "Audífonos de juego con sonido envolvente 7.1, micrófono desmontable.",
        precioOriginal: 89.99,
        imagen: "https://m.media-amazon.com/images/I/71YvP1A3HCL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/71YvP1A3HCL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61v1Z9b+qAL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71d8vF5R6fL._AC_SL1500_.jpg"
        ],
        rating: 4.6,
        reviews: 312 * 100
      }
    ]
  },
  {
    categoria: "Interfaces",
    productos: [
      {
        id: "focusrite-scarlett",
        nombre: "Focusrite Scarlett 2i2",
        descripcion: "Interfaz de audio USB de 2 entradas / 2 salidas para grabación profesional.",
        precioOriginal: 179.99,
        imagen: "https://m.media-amazon.com/images/I/61XP9IPrGpL._AC_SL1500_.jpg",
        imagenes: [
          "https://m.media-amazon.com/images/I/61XP9IPrGpL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61gq3a9lAqL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61BBoSKvl6L._AC_SL1500_.jpg"
        ],
        rating: 4.9,
        reviews: 980 * 100
      }
    ]
  }
];

const contenedor = document.getElementById("product-catalog");

catalogo.forEach(categoria => {
  const seccion = document.createElement("section");
  seccion.innerHTML = `<h2 class="category-title" id="${categoria.categoria.toLowerCase()}">${categoria.categoria}</h2>`;
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
    seccion.appendChild(card);
  });
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
  alert(`${nombre} fue agregado al carrito.`);
}