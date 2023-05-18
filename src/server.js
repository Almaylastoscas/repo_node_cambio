import server from "./app.js"
import { Server } from "socket.io"
import fs from 'fs'
import CartManager from "./managers/cart.js"


const PORT = process.env.PORT || 3000 // lo cambie pq mi puerto 8080 esta siempre ocupado despues rechaza este cambio
const ready = ()=> console.log('server ready on port '+PORT)

let http_server = server.listen(PORT,ready)
let socket_server = new Server(http_server)





let numUsers = 0;



socket_server.on("connection", socket => {
    socket.on("getCartContent", (cartId) => {

        console.log("el servidor recibio una solicitud de carrito:", cartId)
        try {
            const cart = CartManager.read_cart(cartId)
    
            let i = 0
    
            cart.products.forEach(e => {
                i += e.x
            })
    
            socket.emit("cartUpdated", i)
        } catch (err) {
            console.log(err)
        }
    }) 
})

socket_server.on('connection', (socket) => {
/*
    socket.on('agregar_a_carrito', () => {
        const carts = JSON.parse(fs.readFileSync('./src/data/carts.json'))
                const numContador = carts.reduce((total, currentCart) => total + currentCart.products.length,0)
                console.log(numContador)
                socket.emit('num_products', numContador)
    });
*/
// Chatroom

    let addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('new message', (data) => {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
        
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', (username) => {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            // // echo globally that this client has left
            // socket.broadcast.emit('user left', {
            //     username: socket.username,
            //     numUsers: numUsers
            // });
        }
    });
});
