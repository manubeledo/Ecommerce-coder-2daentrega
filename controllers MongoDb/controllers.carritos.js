const { carritosModel : db } = require('../config/db')


    const write = async (req, res) => {
        carrito.forEach(async (carrito, index)=>{
            try {
               await db.create(carrito)
               res.send("Carrito creado con exito!")     
                } 
            catch (err) {
               console.log('error al guardar el item ', err) 
                }
        })
}

    const read = async (req, res) => {
        try {
            let carritos = await db.find()
            res.json(carritos) 
            } 
        catch (err) {
            console.log('error al leer los carritos', err)
        }
    }

module.exports = {
    write,
    read
}