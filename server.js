const express = require('express');
const hbs = require('express-handlebars');
const rutas_producto = require('./routes/productos/index');
const rutas_movimiento = require('./routes/movimientos/index');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

Handlebars.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2)
                ? options.fn(this)
                : options.inverse(this);
        case '===':
            return (v1 === v2)
                ? options.fn(this)
                : options.inverse(this);
        case '!=':
            return (v1 != v2)
                ? options.fn(this)
                : options.inverse(this);
        case '!==':
            return (v1 !== v2)
                ? options.fn(this)
                : options.inverse(this);
        case '<':
            return (v1 < v2)
                ? options.fn(this)
                : options.inverse(this);
        case '<=':
            return (v1 <= v2)
                ? options.fn(this)
                : options.inverse(this);
        case '>':
            return (v1 > v2)
                ? options.fn(this)
                : options.inverse(this);
        case '>=':
            return (v1 >= v2)
                ? options.fn(this)
                : options.inverse(this);
        case '&&':
            return (v1 && v2)
                ? options.fn(this)
                : options.inverse(this);
        case '||':
            return (v1 || v2)
                ? options.fn(this)
                : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

app.use('*/css', express.static(__dirname + '/public'));
app.engine('.hbs', hbs({extname: '.hbs', defaultLayout: 'base'}));
app.set('view engine', '.hbs');

app.get('/', function(req, res) {
    return res.render('home', {mensaje: 'Hola Mundo!'});
});

app.use('/producto', rutas_producto);
app.use('/movimiento', rutas_movimiento);

app.listen(3000, function() {
    console.log('Servidor escuchando en puerto 3000');
});
