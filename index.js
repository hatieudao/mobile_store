const createError = require('http-errors')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Database
const db = require('./config/database')
db.authenticate()
  .then(() => console.log("DB connected..........."))
  .catch(err => console.log("Error......." + err))


// Public route
const homeRouter = require('./routes/public/home.route')
const registerRouter = require('./routes/public/register.route')
const shopPageRouter = require('./routes/public/shopPage.route')
const contactRouter = require('./routes/public/contact.route')
const loginRouter = require('./routes/public/login.route')
const sigleproductRouter = require('./routes/public/singleProduct.route')
// User route
const cartRouter = require('./routes/user/cart.route')
const checkoutRouter = require('./routes/user/checkout.route')
const myAccountRouter = require('./routes/user/myAccount.route')
const wishListRouter = require('./routes/user/wishList.route')
// Admin route

const adminRouter = require('./routes/admin')

app.set("views", "./views")
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', homeRouter)
app.use('/shop-page', shopPageRouter)
app.use('/single-product', sigleproductRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/contact', contactRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.use('/myaccount', myAccountRouter)
app.use('/wishlist', wishListRouter)

app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use('*', (req, res) => res.render('404', { layout: '404' }))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
