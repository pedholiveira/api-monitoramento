'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var ConsumoSchema = new Schema({
    nome: { type: String, require: true, trim: true },
    data: { type: Date, require: true },
    valor: { type: Number, min: 0, require: true }
})

module.exports = mongoose.model('Consumo', ConsumoSchema)