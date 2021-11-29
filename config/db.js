const db = require('./index')


// CONEXION A MariaDB

const mysql = require('knex')({
    client: 'mysql',
    connection: db,
    pool: {min:0, max:10}
});

// CONEXION A SQLITE

const sqlite = { development: {
    client: 'sqlite3',
    connection: {
      filename: '../DB/ecommerce.sqlite'
    }
  },
  useNullAsDefault: true
};

// CONEXION A Firebase

const admin = require("firebase-admin");

const serviceAccount = require('./firebase config/firebaseconfig.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const dbfirebase = admin.firestore();

// EXPORTANDO LAS BASES DE DATOS

module.exports = { mysql, sqlite, dbfirebase };

// CREACION DE TABLAS

mysql.schema.hasTable("productos").then(function (exists) {
    if (!exists) {
      return mysql.schema.createTable("productos", (table) => {
        table.increments('id_productos').primary();
        table.string("name", 128).notNullable()
        table.string("description", 1000).notNullable()
        table.integer("price", 100).notNullable()
        table.string("thumbnail", 1000).notNullable()
        table.integer("stock", 100).notNullable()
      });
    }
  });

mysql.schema.hasTable("carritos").then(function (exists) {
    if (!exists) {
      return mysql.schema.createTable("carritos", (table) => {
        table.increments(); 
        table.integer("id_carrito", 255).notNullable()
        table.integer("id_producto", 128).notNullable()
        table.integer("cantidad", 128).notNullable()
      });
    }
});

