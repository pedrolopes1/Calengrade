require('dotenv').config()

const express = require('express')

const cors = require('cors')

const morgan = require('morgan')

const path = require('path')

const routes = require('./routes')

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use(routes);

if (process.env.NODE_ENV === 'production') {
    console.log(path.resolve(__dirname, '..', '..', 'frontend', 'build'))
    app.use(express.static(path.resolve(__dirname, '..', '..', 'frontend', 'build')))

    app.get('*', (req, res) => {
        console.log(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
        res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
    }) 
}

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server ready on PORT: ${process.env.PORT || 3333}`)
});