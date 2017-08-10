const express = require('express')

const app = express()

app.get('/', function (req, res){
    return res.status(200).send('<h1>Ola k ase</h1>')
})

app.listen(3000, function (){
    console.log('Servidor escuchando en puerto 3000')
})
