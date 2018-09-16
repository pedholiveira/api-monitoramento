const express = require('express')

module.exports = function(server) {
    const router = express.Router()
    server.use('/api', router)

    const consumoService = require('../itens/consumoService')
    consumoService.register(router, '/consumo')
}