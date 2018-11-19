'use strict'
var mongoose = require('mongoose'),
    Consumo = mongoose.model('Consumo')

var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

/**
 * Retorna a lista de medidores existentes na base de consumo.
 */
exports.obterMedidores = function(callback, error) {
    Consumo.find().distinct('nome', function (err, nomes) {
        if (err && error) {
            error(err)
        }
        callback(nomes)
    })
}

/**
 * Retorna a lista de consumos de um medidor específico.
 */
exports.obterConsumos = function(medidor, callback, error) {
    Consumo.find({ nome: new RegExp(medidor, 'i')})
            .sort('data')
            .exec(function (err, consumos) {
                if (err && error) {
                    error(err)
                }            
                callback(agruparConsumos(consumos))
            })
}

/**
 * Agrupa uma lista de consumos pelo mês de referência.
 * 
 * @param {*} consumos 
 */
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

/**
 * Converte uma data de consumo para o formato do mês de referência.
 * 
 * @param {*} data 
 */
const converterDataParaReferencia = function(data) {
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
    return `${mes}, ${ano}`
}