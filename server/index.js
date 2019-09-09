require('dotenv').config()

const express = require('express')
const cors = require('cors')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    }
}))

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('db connected')
})

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.get('/api/posts', ctrl.getPosts)

app.listen(SERVER_PORT, () => {
    console.log('server running')
})