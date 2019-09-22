const createError = require('http-errors')
const express = require('express')
const path = require('path')
const http = require('http')
const https = require('https')
const fs = require('fs')

const indexRouter = require('./routes/index')

const httpPort = process.env.HTTP_PORT
const httpsPort = process.env.HTTPS_PORT

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use(function (req, res, next) {
    console.log('123')
    next(createError(404))
})

app.use(function (err, req, res) {
    console.log('1234')
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

https.createServer({
    key: fs.readFileSync(path.join(__dirname, './ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './ssl/cert.pem')),
    passphrase: 'wifiscanner'
}, app)
    .listen(httpsPort, (err) => {
        if (err) {
            return console.log('Server did\'t start', err)
        }
        console.log(`Server running on port ${httpsPort}`)
    })

http.createServer(function (req, res) {
    res.writeHead(301, {'Location': `https://${req.headers['host']}${req.url}`});
    res.end();
}).listen(httpPort)
