const socket = io();
let currentCart = 1;

function emit_data() {
  socket.emit(
    //emit envia datos (en este caso desde el cliente hacia el servidor)
    "primer_conexion", //identificador del mensaje
    {
      //objeto con las propiedades a enviar (en este caso al servidor)
      name: "Ale",
      last_name: "Cassan",
      age: 37,
    }
  );
}
/*
socket.on('connect', () => {
    let selector = document.querySelectorAll('#btn')
    selector.forEach(each => each.addEventListener('click'))
    socket.emit('agregar_a_carrito')
})*/

socket.on("cartUpdated", (cartContent) => {
  console.log("el carrito tiene:", cartContent, "contenidos");

  const contadorSpan = document.getElementById("contador");
  contadorSpan.innerText = cartContent;
});

socket.emit("getCartContent", currentCart);

/*
socket.on('num_products', numContador => {
    console.log("recibido")
    const contadorSpan = document.getElementById('contador');
    contadorSpan.innerText = numContador
}) */
