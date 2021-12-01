const db = require('./index')
let mongoose = require('mongoose')



// CONEXION A MariaDB

// const mysql = require('knex')({
//     client: 'mysql',
//     connection: db,
//     pool: {min:0, max:10}
// });

// CONEXION A SQLITE

// const sqlite = { development: {
//     client: 'sqlite3',
//     connection: {
//       filename: '../DB/ecommerce.sqlite'
//     }
//   },
//   useNullAsDefault: true
// };

// CONEXION A Firebase

// const admin = require("firebase-admin");

// const serviceAccount = require('./firebase config/firebaseconfig.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// })

// const dbfirebase = admin.firestore();

// CONEXION A MONGO

const MONGO_DB = process.env.MONGO_DB_URI;
const DB_NAME = process.env.DB_NAME; // mismo nombre para todas las bases de datos
const CONNECT = `${MONGO_DB}/${DB_NAME}`

let connection = null;

(async ()=>{
    try {
        console.log(`Conexion de mongo creada en ${CONNECT}`)
        connection = await mongoose.connect(`${CONNECT}`) // ver si va esta "/" barra en el medio, sino se agrega an el .env
    } catch (error) {
        console.log('error al conectarse a Mongo')
        
    }
})()

// module.exports = {}

// EXPORTANDO LAS BASES DE DATOS


// CREACION DE TABLAS MYSQL

// mysql.schema.hasTable("productos").then(function (exists) {
//     if (!exists) {
//       return mysql.schema.createTable("productos", (table) => {
//         table.increments('id_productos').primary();
//         table.string("name", 128).notNullable()
//         table.string("description", 1000).notNullable()
//         table.integer("price", 100).notNullable()
//         table.string("thumbnail", 1000).notNullable()
//         table.integer("stock", 100).notNullable()
//       });
//     }
//   });

// mysql.schema.hasTable("carritos").then(function (exists) {
//     if (!exists) {
//       return mysql.schema.createTable("carritos", (table) => {
//         table.increments(); 
//         table.integer("id_carrito", 255).notNullable()
//         table.integer("id_producto", 128).notNullable()
//         table.integer("cantidad", 128).notNullable()
//       });
//     }
// });

// CREACION DE TABLAS POR MONGO

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productosSchema = new Schema({ /// hay que verificar los campos de la base que no me acuerdo cuales son

    id_producto:         Number(), // esta forma de hacerlo lo saque de la documentacion , hay que ver que hace.
    name:      String(),
    description:  Number(),
    price:String(),
    thumbnail: String(),
    stock:      Number()
})

const carritosSchema = new Schema({ // aca vamos a hacer una sola tabla con todos los datos asi no tenemos que vincularlas

    id: Number(), // si mal no recuerdo esta era el timestamp de carrito
    productos_carrito:[
                    {id_producto: Number(),
                    title: String() ,
                    cantidad:Number(),    
                    }
    ]
})

const productosModel = mongoose.model('productos', productosSchema)
const carritosModel = mongoose.model('carritos', carritosSchema)


module.exports = { 
  // mysql, 
  // sqlite 
  // dbfirebase,
  // connection,
  productosModel, 
  carritosModel, 
  mongoose 
};
