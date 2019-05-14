const express = require('express')
const helmet = require('helmet')

const app = express()

// add some security-related headers to the response
app.use(helmet())

app.get('/', function(req, res){
    res.set('Content-Type', 'text/html')
    res.send('Hello,this is the root of our service!')
})

module.exports = app
