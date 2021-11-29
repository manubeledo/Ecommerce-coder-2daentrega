let { dbfirebase : db } = require('../config/db')



const write = async (req, res) => {

    try{
    console.log("DESDE LA FUNCION WRITE")
    const productCollection = db.collection('productos');
    
    const ID = productCollection.doc()
    ID.set({
        name: 'name',
        description: 'description',
        price: 'price',
        thumbnail: 'thumbnail',
        stock: 'stock'
    });
    }
    catch(err){
        console.log("ESTE ES EL ERROR", err)
    }
}

module.exports = {
    write
}