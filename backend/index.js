// Declaracion de paquetes
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// Inicializacion de express
const app = express()

// Evitar el error de CORS
app.use(cors())

// Configuracion del body-parser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// Middleware
app.get('/', (req, res) => {
    console.log(req.body);
    res.json({
        error: null,
        msg: "Todo funciona correctamente"
    })
})

// Importacion de rutas
const userRoutes = require('./routes/user')

app.use('/user/', userRoutes)

// Inicializacion del servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port)
})