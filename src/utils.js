import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//console.log(__dirname)

export { __filename, __dirname }
//__dirname es la ruta principal "base"
//hasta que hosteemos nuestro servidor la semana que viene
//__dirname es localhost8080