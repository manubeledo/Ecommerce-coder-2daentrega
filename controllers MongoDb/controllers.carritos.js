const {carritosModel} = require('../config/db')

function createCarrito (carrito){ //carrito debe ser un Array de objetos a guardar en el carrito
           
        carrito.forEach(async (carrito, index)=>{
            try {
               await carritosModel.create(carrito)     
            } catch (error) {
               console.log('error al guardar el item '+ index + error) 
            }
        })
}


async function leerCarrito (){ //aca no me acuerdo como lo hicimos, si traiamos todo el array de la base y despues la mostrabamos...si es asi , esto deberia andar
        try {
            return await carritosModel.find() 
        } catch (error) {
            console.log('error al leer los carritos')
        }

}