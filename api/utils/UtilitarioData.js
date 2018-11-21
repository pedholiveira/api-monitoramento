'use strict'

var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

/**
 * Retorna o primeiro dia do ano atual.
 */
exports.obterPrimeiroDiaAno = function(ano) {
    return new Date(ano, 0, 1);
}

/**
 * Retorna o ultimo dia do ano atual.
 */
exports.obterUltimoDiaAno = function(ano) {
    return new Date(ano, 11, 31);
}

/**
 * Retorna o primeiro dia de um mês específico.
 */
exports.obterPrimeiroDiaMes = function(mes, ano) {
    return new Date(ano, mes, 1);
}

/**
 * Retorna o último dia de um mês específico.
 */
exports.obterUltimoDiaMes = function(mes, ano) {
    return new Date(ano, mes + 1, 0);
}

/**
 * Formata uma data para "dia/mes".
 */
exports.formatarDiaMes = function(data) {
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    if (dia.length < 2) dia = '0' + dia;
    if (mes.length < 2) mes = '0' + mes;

    return `${dia}/${mes}`
}

/**
 * Converte uma data de consumo para o formato do mês de referência.
 * 
 * @param {*} data 
 */
exports.converterDataParaReferencia = function(data) {
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
    return `${mes}, ${ano}`
}