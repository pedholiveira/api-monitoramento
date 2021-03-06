'use strict'
var service = require('../services/ConsumoService')

exports.obterConsumos = function (req, res) {
    service.obterConsumos(
        req.params.medidor, 
        req.params.ano,
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

exports.obterConsumosMensal = function (req, res) {
    service.obterConsumosMensal(
        req.params.medidor,
        req.params.mes,
        req.params.ano,
        consumos => res.json(consumos), 
        err => res.send(err)
    )
}

exports.obterAnosConsumo = function(req, res) {
    service.obterAnosConsumo(
        req.params.medidor,
        anos => res.json(anos),
        err => res.send(err)
    )
}