const {productosModel} = require('../config/db')

async function createProducto (producto){
    try {
        await productosModel.create(producto);
    } catch (error) {
        console.log('error en la creacion de producto' + error)
    }
}
async function readProducto (){
    try {
        return await productosModel.find()
    } catch (error) {
        console.log('error en la lectura de producto' + error)
    }
}
async function deleteProducto (id){
    try {
        await productosModel.detele(id)
        return ('eliminado OK')
        
    } catch (error) {
        console.log('error eliminando producto' + error)

    }
}