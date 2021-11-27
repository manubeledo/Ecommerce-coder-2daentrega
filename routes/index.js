const fs = require("fs");
const { Router } = require("express");
const Contenedor = require('../public/components/contenedor')
let passport = require('passport');
const router = Router();

function serverRouter(app){
    app.use("/api", router);

    // Cargo los productos por la URL /api/productos desde el HTML y los guarda en productos.txt //
    router.post('/productos', (req, res) => {
        (async () => {
            try {
                if (fs.existsSync('./public/database/productos.json')){
                    new Contenedor(`${req.body.name}`, `${req.body.description}`, `${req.body.price}`, `${req.body.thumbnail}`, `${req.body.stock}`);
                    let productos = JSON.parse(await fs.promises.readFile('./public/database/productos.json', 'utf-8'))
                    let datos = req.body
                    productos[productos.length] = { ...datos }
                    let data = JSON.stringify(productos)
                    fs.writeFile('./public/database/productos.json', data, function (err) {
                        if (err) throw err;
                        console.log('Nuevo producto almacenado!');
                      });
                } else {
                    new Contenedor(`${req.body.name}`, `${req.body.description}`, `${req.body.price}`, `${req.body.thumbnail}`, `${req.body.stock}`);
                    let data = JSON.stringify(Contenedor.productos);
                    await fs.promises.writeFile('./public/database/productos.json', data);
                }
                res.redirect('./index')
            }
            catch(err){
                console.log(err);
            }
        })();
    });

    // Me trae todos los productos por GET en un JSON //
    router.get('/productos', (req, res) => {
        (async () => {
            try { 
                let data = JSON.parse(await fs.promises.readFile('./public/database/productos.txt'));
                res.json(data);
            }
            catch(err) {
                console.log(err);
                }
        })();
    });

    // Me trae todos los productos por id por GET en un JSON //
    router.get('/productos/:id', (req, res) => {
        async function getById() {
            try {
                let id = req.params.id;
                let datos = JSON.parse(await fs.promises.readFile('./public/database/productos.txt'));
                let responseFilter = datos.filter(elemento => elemento.id==id);
                if (responseFilter.length != 0){
                res.json(responseFilter);
                } else {
                    let object = {
                        error: -2,
                        descripcion: `ruta '/${req.params.id}' por metodo ${req.method} no implementada`
                    }
                    res.send(object)
                }
            }
        catch (err) {
                    console.log(err);
                }
            }
        getById()
    })

    router.get('/loadproduct', (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('login');
    }, (req, res) => {res.render('loadproduct');
    });

    // Carga la ruta carrito (SOLO PARA ADMIN) // 
    router.get('/carrito', (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.redirect('login');
    }, (req, res) => {res.render('carrito');
    })
    // Carga la ruta index //
    router.get('/index', (req, res) => {
        res.render('index');
    });

    // Carga la ruta login //
    router.get('/login', (req, res) => {
        res.render('login');
    });

    // Recibe credenciales e inicia sesion //
    router.post('/login', passport.authenticate('local',{
        successRedirect: "/api/loadproduct",
        failureRedirect: "login"
    }));
    
    // Cargo los productos por la URL /api/productos desde el HTML y los guarda en DB (productos.txt) //
    router.post('/carrito', (req, res) => {
        (async () => {
            try {
                let data = JSON.stringify(req.body);
                await fs.promises.writeFile('./public/database/carritos.json', data);
                res.redirect('./index')
            }
            catch(err){
                console.log(err);
            }
        })();
    });

    router.post('/buycarritos', (req, res) => {
        (async () => {
            try {
                if (fs.existsSync('./public/buycarritos.json')) {
                    let data = JSON.stringify(req.body);
                    console.log("DATA", data)
                    await fs.promises.writeFile('./public/database/buycarritos.json', data);
                    res.redirect('./index')
                } else {
                    let data = JSON.stringify(req.body);
                    await fs.promises.writeFile('./public/database/buycarritos.json', data);
                    res.redirect('./index')
                }
            }
            catch(err){
                console.log(err);
            }
        })();
    })

    router.get('/:id/productos', (req, res) => {
    });

    // Envia error si la ruta es inexistente //
    router.get('/:params', (req, res) => {
        let object = {
            error: -2,
            descripcion: `ruta '/${req.params.params}' por metodo ${req.method} no implementada`
        }
        res.send(object)
    });

}
module.exports = serverRouter;