const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const homeRoute = require('./routes/home.route')

app.set("views", "./views")
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))

app.use(homeRoute)

app.get('/', homeRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
