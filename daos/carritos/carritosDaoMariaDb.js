let { mysql: db } = require('../config/db')


const write = async (req, res) => {
    try {
        let carritos = req.body
        console.log(carritos)
        Object.values(carritos).forEach(async (carrito) => {
            await db('carritos').insert(carrito)
        })
        res.redirect('./index')
        }
    
    catch(err){
        console.log(err);
    }
}

module.exports = {
    write
}