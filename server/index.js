const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const createError = require('http-errors')

const { signIn, usersGet, usersCreate, reportsGet, reportsCreate, load } = require('./routes')
const { https, auth, isAdmin, isEngineer, isUser, isAnonymous } = require('./filters')
const { onStart } = require('./hooks')

const isDevelopment = process.env.NODE_ENV === 'development'
const port = process.env.PORT

const app = express()

if (isDevelopment) {
    app.use(cors({
        origin: 'http://localhost',
        exposedHeaders: ['X-Total-Count']
    }))
}
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(https)
app.use(express.static(path.join(__dirname, '../client/build')))

app.use(auth)

app.post('/sign-in', isAnonymous, signIn)

app.get('/users', isAdmin, usersGet)
app.post('/users', isAdmin, usersCreate)
app.get('/reports', isEngineer, reportsGet)
app.get('/reports/:id', isEngineer, reportsGet)
app.post('/reports', isUser, reportsCreate)
app.get('/load', isUser, load)

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
