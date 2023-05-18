import { Router } from "express"
import auth_router from "./auth.js"
import ProductManager from "../../managers/product.js"
import { ProductsArrayConvert } from "../../devUtils.js"

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {         
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',

                    
                    title: 'index',
                    script: '/public/conection.js'
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)

router.get("/products/:pid", async (req, res, next) => {

    try {
        return res.render("view_product", {
            script2: '/public/uniqueProduct.js',
            topTitle: "prueba",
            conection: '/public/conection.js'
        })
    } catch(error) {

    }
})

router.get(
    '/products',
    async(req,res,next) => {
        try {

            const prods = ProductManager.read_products()
            const prodsClone = JSON.parse(JSON.stringify(prods)) // esto lo hago porque nose si el product manager regresa el objeto original 
            const products = ProductsArrayConvert(prodsClone)
            // al final si cambia el array original y tuve que clonar


            return res.render('products', {
                products: products,
                title: 'Products Page',
                topTitle: `Products: ${products.length}`,
                script: '/public/products.js',
                conection: '/public/conection.js',
                cart: 'numProducts'
            })

        } catch (error) {
            console.log(error)
            next()
        }
    }
)

router.get(
    '/new_product',
    async(req,res,next) => {
        try {
            return res.render(
                'new_product',
                {   title: 'new_product',
                    title: 'Product',
                    conection: '/public/conection.js'}
            )
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/carts',
    async(req,res,next) => {
        try {
            
            return res.render('carts', {
                name: 'Nico',
                last_name: 'Lopez',
                photo: 'https://www.w3schools.com/howto/img_avatar.png',
                script: "public/cart.js",
                conection: '/public/conection.js'
            })
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/chat',
    async(req,res,next) => {
        try {
            return res.render('chat', {
                title: 'Chat bot',
                conection: '/public/conection.js',
                script2: "public/chatbot.js"
            })
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/form',
    async(req,res,next) => {
        try {
            return res.render(
                'form',
                { title: 'Form',
                conection: '/public/conection.js' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/register',
    async(req,res,next) => {
        try {
            return res.render(
                'register',
                { title: 'Register', 
                conection: '/public/conection.js'}
            )
        } catch (error) {
            next()
        }
    }
)

router.use('/auth',auth_router)


export default router
