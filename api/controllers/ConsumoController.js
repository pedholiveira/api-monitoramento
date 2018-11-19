'use strict'
var mongoose = require('mongoose'),
    Consumo = mongoose.model('Consumo')

var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

exports.obterConsumos = function (req, res) {
    const medidor = req.params.medidor
    console.log(medidor)
    Consumo.find({ nome: new RegExp(medidor, 'i')})
            .sort('data')
            .exec(function (err, consumos) {
                if (err) {
                    res.send(err)
                }            
                res.json(agruparConsumos(consumos))
            })
}

exports.obterMedidores = function (req, res) {
    Consumo.find().distinct('nome', function (err, nomes) {
        if (err) {
            res.send(err)
        }
        res.json(nomes)
    })
}

const agruparConsumos = function(consumos) {
    const consumosPorMes = consumos.map(({valor, data}) => ({
        consumo: valor,
        referencia: converterDataParaReferencia(data)
    }))
    console.log(consumosPorMes)
    const consumosAgrupados = consumosPorMes.reduce((acumulador, {consumo, referencia}) => {
        const anterior = acumulador[referencia] || 0
        return Object.assign(acumulador, {
            [referencia]: anterior + consumo
        })
    }, [])
    
    console.log(consumosAgrupados)
    var array = [];
    for(const mes in consumosAgrupados) {
        array.push({
            valor: consumosAgrupados[mes],
            data: mes
        })
    }
    console.log(array)
    return array
}

const converterDataParaReferencia = function(data) {
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
    return `${mes}, ${ano}`
}