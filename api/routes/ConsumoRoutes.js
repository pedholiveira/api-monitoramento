'use strict';
module.exports = function (app) {
    var consumo = require('../controllers/ConsumoController');

    app.route('/consumos/:medidor')
        .post(consumo.obterConsumos);

    app.route('/medidores')
        .get(consumo.obterMedidores);
};
