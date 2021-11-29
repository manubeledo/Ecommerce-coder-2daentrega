let { dbfirebase : db } = require('../config/db')


const write = async (req, res) => {

    try{
    console.log("DESDE LA FUNCION WRITE")
    const productCollection = db.collection('productos');
    
    const ID = productCollection.doc()
    ID.set({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock
        });
    res.send("Producto almacenado con exito!")
    }
    catch(err){
        console.log("ESTE ES EL ERROR", err)
    }
}

// NO ESTA CHECKEADO ESTO
const read = async (req, res) => {

    try{
        const result = []
        const snapshot = await this.coleccion.get();
        snapshot.forEach(doc => {
            result.push({ id: doc.id, ...doc.data() })
            })
        return result
    }
    catch(err){
        console.log("ESTE ES EL ERROR", err)
    }
}

module.exports = {
    write,
    read
}