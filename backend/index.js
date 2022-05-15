// Declaracion de paquetes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// Inicializacion de express
const app = express()

// Evitar el error de CORS
app.use(cors())

// Configuracion del body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Middleware
app.get('/', (req, res) => {
    res.json({
        error: null,
        msg: "Todo funciona correctamente"
    })
})

// Importacion de rutas


// Inicializacion del servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port)
})