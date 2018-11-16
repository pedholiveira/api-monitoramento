var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Consumo = require('./api/models/ConsumoModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://api:api123@ds223542.mlab.com:23542/monitoramento');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/ConsumoRoutes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('API RESTFull rodando na porta: ' + port);