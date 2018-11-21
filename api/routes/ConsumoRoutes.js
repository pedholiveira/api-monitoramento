'use strict'
module.exports = function (app) {
    var consumo = require('../controllers/ConsumoController')

    app.route('/consumos/:medidor')
        .post(consumo.obterConsumos)

    app.route('/consumosMensal/:medidor/:mes/:ano')
        .post(consumo.obterConsumosMensal)

    app.route('/medidores')
        .get(consumo.obterMedidores)

    app.route('/anosDisponiveis/:medidor')
        .get(consumo.obterAnosConsumo)
}
