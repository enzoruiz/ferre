const express = require('express');
const hbs = require('express-handlebars');
const rutas_producto = require('./routes/productos/index');
const rutas_movimiento = require('./routes/movimientos/index');

const app = express();

app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'base',
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res){
    return res.render('home', { mensaje: 'Hola Mundo!' })
});

app.use('/producto', rutas_producto);
app.use('/movimiento', rutas_movimiento);

app.listen(3000, function (){
    console.log('Servidor escuchando en puerto 3000');
});
