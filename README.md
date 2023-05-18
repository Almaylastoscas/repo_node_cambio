# Backend-39770 - Entrega N°5

## Trabajo colaborativo 📋

### Alejandro Cassan

## COMO LEVANTAR EL SERVIDOR 💻

Una ves realizado el git pull o git clone.

Seguir los sugientes comandos para correr el servidor

```
npm install

npm run dev

```

### UNA VEZ EJECUTADOS ESTOS COMANDOS CORRER EL SERVIDOR EN [localhost:3000](localhost:3000)

## Contenido ⌨️

Se creo un sitio con Nodejs, Express, Handlebars y Websocket.

```
GET /

• Se creo una pagina de inicio que contiene un Navbar con los vinculos hacia los siguientes links:
                » Prodcuts
                » New Product
                » Chat
                » Carts

```

## GET/ New Product ⚙️

```
GET /new_product

• Se establecio desde el endpoint /new_product un formulario para agregar productos nuevos.
                    // Una vez cargado en la base se redirecciona al endpoint /products para visualizar todos los productos disponibles.

```

## GET/ chatbot 🦾

```
GET /chat

• Se configuro por medio de socket un webchat para interactuar en vivo.
                    //Se abre una formulario con un input el cual tiene que ser completado con el nombre de usuario y una vez completado se abre el chat.

```

## GET/ Products 📱

```
GET /products

• Se configuro el endpoint /products para mostrar todos los prodcutos en stock en nuestra base de datos.
• Se puede ingresar al siguiente punto haciendo click en el producto deseado.

```

## GET/ products/:pid 📲

```
GET /products/:pid

 • Aqui podras ver todos los detalles del prodcuto. El objeto completo.
                        "Title"
                        "Description"
                        "Price"
                        "Thumbnail"
                        "Stock"

 • Aqui tambien se programo boton de agregar al carrito y ademas un update y un delete para subir y bajar la cantidad de prodcutos que el usuario quiera agregar al cart.

```

## GET /carts 🛒

```
GET /carts

 • Este endpoint contiene todos los productos que contenga el primer carrito.
 • Tambien se pueden modificar las unidades y si la unidad es igual a 0 desaparece del cart. Asi como tambien devuelve las unidades del prodcuto al stock de la base de products.

```
