//Importar o módulo do framework express
var express = require('express');

//Importar o consign
var consign = require('consign');

//Importar o body-parser
var bodyParser = require('body-parser');

//Importar o express-validator
var expressValidator = require('express-validator');

//Iniciar o objeto do express
var app = express();

//Setar as variaveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//Configurar os middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//Efetua o autoload
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;