'use strict'
var mongoose = require('mongoose'),
    Consumo = mongoose.model('Consumo'),
    utilitarioData = require('../utils/UtilitarioData')

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
    const primeiroDiaAno = utilitarioData.obterPrimeiroDiaAno()
    const ultimoDiaAno = utilitarioData.obterUltimoDiaAno()
    Consumo.find({ 
                nome: new RegExp(medidor, 'i'),
                data: { $gte: primeiroDiaAno, $lte: ultimoDiaAno }
            })
            .sort('data')
            .exec(function (err, consumos) {
                if (err && error) {
                    error(err)
                }            
                callback(agruparConsumos(consumos))
            })
}

/**
 * Retorna a lista de consumos de um mês específico para um medidor
 */
exports.obterConsumosMensal = function(medidor, mes, ano, callback, error) {
    const primeiroDiaMes = utilitarioData.obterPrimeiroDiaMes(+mes, +ano)
    const ultimoDiaMes = utilitarioData.obterUltimoDiaMes(+mes, +ano)
    Consumo.find({ 
                nome: new RegExp(medidor, 'i'),
                data: { $gte: primeiroDiaMes, $lte: ultimoDiaMes }
            })
            .sort('data')
            .exec(function (err, consumos) {
                if (err && error) {
                    error(err)
                }            
                callback(consumos)
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
 * Agrupa uma lista de consumos pelo mês de referência.
 * 
 * @param {*} consumos 
 */
const agruparConsumos = function(consumos) {
    const consumosPorMes = consumos.map(({valor, data}) => ({
        consumo: valor,
        mes: data.getMonth(),
        referencia: converterDataParaReferencia(data)
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