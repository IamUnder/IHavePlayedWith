// Declaracion de paquetes
const router = require('express').Router()

// Declaracion de controllador
const user = require('../controllers/user.controler')

// Rutas
router.post('/', user.user)


// Exportacion de rutas
module.exports = router