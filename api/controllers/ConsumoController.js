'use strict';
var mongoose = require('mongoose'),
    Consumo = mongoose.model('Consumo');

var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

exports.obterConsumos = function (req, res) {
    let medidor = req.params.medidor;
    console.log(medidor);
    Consumo.find({ nome: new RegExp(medidor, 'i')}, function (err, consumos) {
        if (err) {
            res.send(err);
        }            
        res.json(consumos);
    });
};

exports.obterMedidores = function (req, res) {
    Consumo.find().distinct('nome', function (err, nomes) {
        if (err) {
            res.send(err);
        }
        res.json(nomes);
    });
}

var agruparConsumos = function(consumos) {
    let consumosPorMes = {};
    consumos.map(c => {
        let mes = meses[c.data.getMonth()] + ', ' + c.data.getFullYear();
        if(consumosPorMes[mes] === undefined) {
            consumosPorMes[mes] = [];
        }
        consumosPorMes[mes].push(c);
    });
    for (let mes of Object.keys(consumosPorMes)) {
        console.log(consumosPorMes[mes]);
        consumosPorMes[mes].reduce((a, b) => a.valor + b.valor, 0);
    }
    console.log(consumosPorMes);
}