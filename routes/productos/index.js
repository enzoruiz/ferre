const express = require('express');
const rutas = express.Router();
const configFirebase = require('../../configFirebase');

const database = configFirebase.database();

rutas.get('', function (req, res){
    const ref = database.ref('productos');
    let listaProductos = [];
    ref.on('value',function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let dict = {};
            dict['id'] = childSnapshot.key;
            dict['objeto'] = childSnapshot.val();
            listaProductos.push(dict);
        });
    })
    return res.render('producto/home', { listaProductos: listaProductos });
});

rutas.get('/crear', function (req, res){
    return res.render('producto/crear-editar');
});

rutas.post('/crear', function (req, res){
    const keyProducto = database.ref().child('productos').push().key;
    const producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
    };
    database.ref().child('productos').child(keyProducto).set(producto);
    return res.redirect('/producto');
});

rutas.get('/editar/:id', function (req, res){
    const id = req.params.id;
    let producto = {};
    database.ref().child('productos/'+id).once('value', function (snapshot){
        snapshot.forEach(function (child){
            producto[child.key] = child.val();
        });
        return res.render('producto/crear-editar', { id: id, producto: producto });
    });
});

rutas.post('/editar/:id', function (req, res){
    const nuevoProducto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
    };
    database.ref().child('productos/'+req.params.id).set(nuevoProducto);
    return res.redirect('/producto');
});

module.exports = rutas;
