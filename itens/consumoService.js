const Consumo = require('./consumo')

Consumo.methods(['get', 'post', 'put', 'delete'])
Consumo.updateOptions({new: true, runValidators: true})

module.exports = Consumo