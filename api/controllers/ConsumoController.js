'use strict'
var service = require('../services/ConsumoService')

exports.obterConsumos = function (req, res) {
    service.obterConsumos(
        req.params.medidor, 
        consumos => res.json(consumos), 
        err => res.send(err)
    )
}

exports.obterMedidores = function (req, res) {
    service.obterMedidores(
        medidores => res.json(medidores), 
        err => res.send(err)
    )
}