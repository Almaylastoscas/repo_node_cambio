import { Router } from "express"
import uploader from '../../middlewares/multer.js'
import manager from "../../managers/User.js"

const router = Router()

router.post('/signup',uploader.single('url_photo'), async(req,res,next)=> {
    console.log('hola');
    try {
        if (!req.file) {
            return res.send('no se pudo cargar la imagen')
        }
        console.log(req.file)
        const { name,last_name,age } = req.body
        let user = { name,last_name,age }   //construyo el usuario
        user.url_photo = req.file.path      //agrego la ruta de la foto
        await manager.add_user(user)        //creo un usuario
        return res.json({                   //envio la respuesta
            status: 201,
            message: 'user created'
        })
    } catch(error) {
        next(error)
    }
})

export default router