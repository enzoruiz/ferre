const express = require('express');
const rutas = express.Router();
const configFirebase = require('../../configFirebase');

const database = configFirebase.database();

rutas.get('', function (req, res){
    const ref = database.ref('movimientos');

    let listaMovimientos = [];

    ref.once('value', function (snapshots) {
        snapshots.forEach(function(childSnapshot) {
            let dict = {};
            dict['id'] = childSnapshot.key;
            dict['objeto'] = childSnapshot.val();

            listaMovimientos.push(dict);
        });
        return res.render('movimiento/home', { listaMovimientos: listaMovimientos });
    })

});

rutas.get('/crear', function (req, res){
    const ref = database.ref('productos');

    let listaProductos = [];
    ref.once('value')
    .then(function (snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let dict = {};
            dict['id'] = childSnapshot.key;
            dict['objeto'] = childSnapshot.val();
            listaProductos.push(dict);
        });

        return res.render('movimiento/crear-editar', { listaProductos: listaProductos });
    })
    .catch(function (error){
        console.log(error);
    });
});

rutas.post('/crear', function (req, res){
    database.ref().child('productos/'+req.body.producto).once('value')
    .then(function (snapshot){
        nombre_producto = snapshot.val()['nombre'];

        const keyMovimiento = database.ref().child('movimientos').push().key;
        const movimiento = {
            id_producto: req.body.producto,
            nombre_producto: nombre_producto,
            tipo_movimiento: req.body.tipo_movimiento,
            cantidad: req.body.cantidad,
            stock: req.body.stock,
            fecha: req.body.fecha,
            precio_compra: req.body.precio_compra,
            precio_venta: req.body.precio_venta,
        };
        database.ref().child('movimientos').child(keyMovimiento).set(movimiento);

        return res.redirect('/movimiento');
    })
    .catch(function (error){
        console.log(error);
    });
});

module.exports = rutas;
