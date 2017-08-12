const express = require('express');
const rutas = express.Router()

rutas.get('', function (req, res){
    res.render('producto/home');
})

module.exports = rutas;
