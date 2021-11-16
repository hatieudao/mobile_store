const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path');

// Public route
const homeRouter = require('./routes/public/home.route');
const registerRouter = require('./routes/public/register.route');
const shoppageRouter = require('./routes/public/shop-page.route');
const contactRouter = require('./routes/public/contact.route');
const loginRouter = require('./routes/public/login.route');
const sigleproductRouter = require('./routes/public/single-product.route');
// User route
const cartRouter = require('./routes/user/cart.route');
const checkoutRouter = require('./routes/user/checkout.route');
const myAccountRouter = require('./routes/user/myAccount.route');
const wishlistRouter = require('./routes/user/wishlist.route');
// Admin route

const adminRouter = require('./routes/admin');

app.set("views", "./views")
app.set('view engine', 'hbs')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/shop-page', shoppageRouter);
app.use('/single-product', sigleproductRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/contact', contactRouter);

app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/myaccount', myAccountRouter);
app.use('/wishlist', wishlistRouter);

app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
