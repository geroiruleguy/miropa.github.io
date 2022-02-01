//CARGAMOS PRODUCTOS AL ARRAY VACÍO CON JSON LOCAL DE PRODUCTOS

let productos = [];
$.ajax({
  url: "./data/data.json",
  dataType: "json",
  success: (respuesta) => {
    cargarProductos(respuesta);
  },
});

const cargarProductos = (respuesta) => {
  productos = respuesta;

  const contenedor = document.getElementById("container");
  

 //CREAMOS CARDS PARA CADA PRODUCTO 
productos.forEach((producto, indice)=>{
  let card = document.createElement("div");
  card.classList.add("card", "col-sm-12", "col-lg-3");
  card.innerHTML = `<img src="${producto.imagen}" class="product-img card-img-top" alt="imagen-producto">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <a href="#" class="addToCart-btn btn" onClick = "abrirCarrito(${indice})"
    >Agregar al carrito</a>
  </div>`;
  contenedor.appendChild(card);
});
};


//AGREGAR PRODUCTOS AL CARRITO
const cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
  actualizarCarrito();
}

const abrirCarrito = (indiceProducto) => {
  const indiceCarrito = cart.findIndex((elemento) => {
    return elemento.id === productos[indiceProducto].id;
  });
  if (indiceCarrito === -1) {
    const agregarProducto = productos[indiceProducto];
    agregarProducto.cantidad = 1;
    cart.push(agregarProducto);
    actualizarCarrito();
  } else {
    cart[indiceCarrito].cantidad += 1;
    actualizarCarrito();
  }
};

let carrito = document.getElementById("carrito");

//DIBUJAMOS EL CARRITO (ACTUALIZADO)
const actualizarCarrito = () => {
  let total = 0;
  carrito.className = "carrito";
  carrito.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((producto, indice) => {
      total = total + producto.precio * producto.cantidad;
      const cartContainer = document.createElement("div");
      cartContainer.className = "productoEnCart";
      cartContainer.innerHTML = `
        <img class="cart-img" src="${producto.imagen}"/>
        <div class="product-details">
          ${producto.nombre}
        </div>
        <div class="product-details" > 
        Cantidad: ${producto.cantidad}
        </div>
        <div class="product-details"> 
        Precio: $ ${producto.precio}
        </div>
        <div class="product-details"> 
        Subtotal: $ ${producto.precio * producto.cantidad}
        </div>
        <button class="btn delete-btn"  id="remove-product" onClick="eliminarProducto(${indice})">Eliminar producto</button>
         `;
         carrito.appendChild(cartContainer);
    });

    const totalCartContainer = document.createElement("div");
    totalCartContainer.className = "totalCart";
    totalCartContainer.innerHTML = `
    <div class= "total"> 
    TOTAL $ ${total}
    </div>
    <button class= "btn comprar-btn" id="finalizar" onClick="comprar()">
    COMPRAR 
     </button>
     `;
    carrito.appendChild(totalCartContainer);
    } else {
     carrito.classList.remove("cart");
    }
};

const eliminarProducto = (indice) => {
  cart.splice(indice, 1);
  actualizarCarrito();
};

const comprar = () => {
  const total = document.getElementsByClassName("total")[0].innerHTML;
  carrito.innerHTML = "";
  const compraHecha = `<div class="compraHecha"><p class="p-compra"> EL TOTAL DE TU COMPRA ES:  ${total}. PARA FINALIZAR COMPLETE EL SIGUIENTE FORMULARIO CON SUS DATOS.  </p></div>
  <div class="p-compra">
  <p class="p-compra"> Complete el formulario con sus datos para coordinar la entrega</p>
  <button class= "btn form-btn" id="formulario" onClick="formulario()"> FORMULARIO </button>
  </div>`;
  carrito.innerHTML = compraHecha;
}

const formulario = () => {
  carrito.innerHTML = "";
  const formulario = `
  <div class= "form-div">
  <h2 class= "form-title"> DATOS DE ENVÍO </h2>
  <div class="form">
   <div class="row">
     <div class="form_item">
       <label class= "form-txt">Nombre</label>
       <input type="text" id="nombre" placeholder="Nombre"  />
     </div>
     <div class="form_item">
       <label class= "form-txt">E-mail</label>
       <input type="text" id="mail" placeholder="E-mail" />
     </div>
     <div class="form_item">
       <label class= "form-txt">Telefono</label>
       <input type="text" id="telefono" placeholder="Telefono"  />
     </div>
     <div class="form_item">
       <label class= "form-txt">Domicilio</label>
       <input type="text" id="domicilio" placeholder="Domicilio" />
     </div>
     <div class="confirmar-btn">
       <button type="button" class="btn envio-btn" onClick="compraConfirmada()">Confirmar</button>
     </div>
   </div>
 </div>
 </div>`;
  carrito.innerHTML = formulario;
};

const compraConfirmada = () => {
  const nombreCliente = document.getElementById("nombre").value;
  const domicilioCliente = document.getElementById("domicilio").value;
  debugger;
  carrito.innerHTML = "";
  let mensaje = `<div class="mensaje-confirmacion">¡Su compra fue realizada con éxito! En los próximos días recibiras tu paquete en ${domicilioCliente}. </div>`;
  carrito.innerHTML = mensaje;
};













  

    


 
