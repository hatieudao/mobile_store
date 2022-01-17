const createError = require('http-errors')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const session = require("express-session")
const passport = require('./auth/passport')
const pagiHelper = require('express-handlebars-paginate');
const expressHandlebarsSections = require('express-handlebars-sections');

let hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
hbs.registerHelper('createPagination', pagiHelper.createPagination);
hbs.registerHelper('section', expressHandlebarsSections());
hbs.registerHelper('ifCond', function (v1, operator, v2, options) {

  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});


hbs.registerHelper('for', function(from, to, incr, block) {
  var accum = '';
  for(var i = from; i < to; i += incr)
    accum += block.fn(i);
  return accum;
});

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Database
const db = require('./config/database')
db.authenticate()
  .then(() => console.log("DB connected...........\n"))
  .catch(err => console.log("Error......." + err))

//////////////////////

//passport

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

///////////////////////
app.use(function (req, res, next) {
  res.locals.currentAdminUser = req.user;
  next();
});


// Public route
const homeRouter = require('./routes/public/home.route');
//const registerRouter = require('./routes/public/register.route');
const productRouter = require('./routes/public/product.route');
const contactRouter = require('./routes/public/contact.route');
const authRouter = require('./routes/public/auth.route');
// User route
const cartRouter = require('./routes/public/cart.route')
const checkoutRouter = require('./routes/user/checkout.route')
const myAccountRouter = require('./routes/user/myAccount.route')
const wishListRouter = require('./routes/user/wishlist.route')
// Admin route

const productApi = require('./api/public/product.api')
const apiProductRouter = require('./api/public/product.route.api')


app.set("views", "./views")
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', homeRouter);
app.use('/product', productRouter);
app.use('/', authRouter);
//app.use('/register', registerRouter);
app.use('/contact', contactRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/myaccount', myAccountRouter);
app.use('/wishlist', wishListRouter);
app.use('/api/product', productApi);
app.use('/api/commentProduct', apiProductRouter);

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
