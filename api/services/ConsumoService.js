'use strict'
var mongoose = require('mongoose'),
    Consumo = mongoose.model('Consumo'),
    utilitarioData = require('../utils/UtilitarioData')

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
exports.obterConsumos = function(medidor, ano, callback, error) {
    const primeiroDiaAno = utilitarioData.obterPrimeiroDiaAno(ano)
    const ultimoDiaAno = utilitarioData.obterUltimoDiaAno(ano)
    Consumo.find({ 
                nome: new RegExp(medidor, 'i'),
                data: { $gte: primeiroDiaAno, $lte: ultimoDiaAno }
            })
            .sort('data')
            .exec(function (err, consumos) {
                if (err && error) {
                    error(err)
                }            
                callback(agruparConsumos(consumos, utilitarioData.converterDataParaReferencia))
            })
}

/**
 * Retorna a lista de consumos de um mês específico para um medidor
 */
exports.obterConsumosMensal = function(medidor, mes, ano, callback, error) {
    const primeiroDiaMes = utilitarioData.obterPrimeiroDiaMes(+mes, +ano)
    const ultimoDiaMes = utilitarioData.obterUltimoDiaMes(+mes, +ano)
    console.log(primeiroDiaMes)
    console.log(ultimoDiaMes)
    Consumo.find({ 
                nome: new RegExp(medidor, 'i'),
                data: { $gte: primeiroDiaMes, $lte: ultimoDiaMes }
            })
            .sort('data')
            .exec(function (err, consumos) {
                if (err && error) {
                    error(err)
                }
                callback(agruparConsumos(consumos, utilitarioData.formatarDiaMes))
            })
}

/**
 * Retorna uma lista com os anos que possuem consumo.
 */ 
exports.obterAnosConsumo = function(medidor, callback, error) {
    Consumo.aggregate([
                {
                    $match: {
                        nome: new RegExp(medidor, 'i')
                    }
                },
                {
                    $group: {
                        _id: { $year : "$data" }
                    }
                }
            ])
            .sort({'_id': 'desc'})
            .exec(function (err, anos) {
                if (err && error) {
                    error(err)
                }            
                callback(anos.map(a => a['_id']))
            })
}

/**
 * Agrupa uma lista de consumos mensal.
 * 
 * @param {*} consumos 
 */
const agruparConsumosMensal = function(consumos) {
    return consumos.map(({valor, data}) => ({
        valor: valor,
        data: utilitarioData.formatarDiaMes(data)
    }))
}

/**
 * Agrupa uma lista de consumos por uma data de referência.
 * 
 * @param {*} consumos 
 */
const agruparConsumos = function(consumos, funcaoReferencia) {
    const consumosPorMes = consumos.map(({valor, data}) => ({
        consumo: valor,
        mes: data.getMonth(),
        referencia: funcaoReferencia(data)
    }))
    const consumosAgrupados = consumosPorMes.reduce((acumulador, {consumo, mes, referencia}) => {
        let anterior = 0
        if(acumulador[referencia]) {
            anterior = acumulador[referencia].valor
        }
        return Object.assign(acumulador, {
            [referencia]: {
                valor: anterior + consumo,
                mes: mes
            }
        })
    }, [])
    
    var array = [];
    for(const referencia in consumosAgrupados) {
        array.push({
            valor: consumosAgrupados[referencia].valor,
            mes: consumosAgrupados[referencia].mes,
            dataReferencia: referencia
        })
    }
    return array
}