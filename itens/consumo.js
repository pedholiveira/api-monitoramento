const restful = require('node-restful')
const mongoose = restful.mongoose

const consumoSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    data: {type: Date, require: true},
    valor: {type: Number, min: 0, require: true}
})

module.exports = restful.model('consumo', consumoSchema)