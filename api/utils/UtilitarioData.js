'use strict'

exports.obterPrimeiroDiaAno = function() {
    return new Date(new Date().getFullYear(), 0, 1);
}

exports.obterUltimoDiaAno = function() {
    return new Date(new Date().getFullYear(), 11, 31);
}