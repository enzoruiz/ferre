const express = require('express');
const rutas = express.Router();

rutas.get('', function (req, res){
    return res.render('producto/home');
})

rutas.get('/crear', function (req, res){
    return res.render('producto/crear');
})

rutas.get('/editar/:id', function (req, res){
    console.log("EL ID: " + req.params.id);
    return res.render('producto/crear');
})

module.exports = rutas;
