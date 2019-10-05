const express = require('express')
const path = require('path')
const fs = require('fs')
const createError = require('http-errors')

const { list, signUp, sendReport } = require('./routes')
const { auth, isAdmin, isUser, isAnonymous } = require('./filters')
const { onStart } = require('./hooks')

const port = process.env.PORT || 80

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(auth)

app.get('/list', isAdmin, list)
app.post('/sign-up', isAnonymous, signUp)
app.post('/send-report', isUser, sendReport)

app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
    const { message, status = 500 } = err
    res.status(status).send({
        message
    })
})

app.listen(port, async () => {
    console.log(`Server running on port ${port}`)
    onStart()
})
