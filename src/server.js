const express = require('express')
const path = require('path')
const http = require('http')
const fs = require('fs')
const createError = require('http-errors')

const { main, signUp, sendReport } = require('./routes')
const { auth, isAdmin, isUser, isAnonymous } = require('./filters')
const { onStart } = require('./hooks')

const port = process.env.PORT || 80

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(auth)

app.get('/', isAdmin, main)
app.post('/sign-up', isAnonymous, signUp)
app.post('/send-report', isUser, sendReport)

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

http.createServer(app).listen(port, async (error) => {
    if (error) {
        return console.log('Server did not start', error)
    }
    console.log(`Server running on port ${port}`)
    onStart()
})
