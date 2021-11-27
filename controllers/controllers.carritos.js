let { mysql: db } = require('../config/db')


const write = async (req, res) => {
    try {
        console.log(req)
        let carritos = req.body
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