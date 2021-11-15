const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path');

const indexRouter = require('./routes/home.route');
const usersRouter = require('./routes/users.route');
const shoppageRouter = require('./routes/shop-page.route');
const sigleproductRouter = require('./routes/single-product.route');
const cartRouter = require('./routes/cart.route');
const checkoutRouter = require('./routes/checkout.route');
const contactRouter = require('./routes/contact.route');
const loginRouter = require('./routes/login.route');
const registerRouter = require('./routes/register.route');

app.set("views", "./views")
app.set('view engine', 'hbs')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop-page', shoppageRouter);
app.use('/single-product', sigleproductRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
