const express = require('express');
const rutas = express.Router()

rutas.get('', function (req, res){
    res.render('movimiento/home');
})

module.exports = rutas;
