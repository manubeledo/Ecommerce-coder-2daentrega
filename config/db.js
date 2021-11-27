const db = require('./index')

const mysql = require('knex')({
    client: 'mysql',
    connection: db,
    pool: {min:0, max:10}
});

const sqlite = { development: {
    client: 'sqlite3',
    connection: {
      filename: '../DB/ecommerce.sqlite'
    }
  },
  useNullAsDefault: true
};

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

module.exports = { mysql, sqlite };