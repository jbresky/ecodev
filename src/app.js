const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();

const mainRoutes = require('./routes/main')
const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products');
const loggedMiddleware = require('./middlewares/loggedMiddleware');
// const cookieMiddleware = require('./middlewares/cookieAuthMiddleware')
const adminOptions = require('./middlewares/adminOptions')
const apiRouter = require('./routes/api/')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({secret: 'Eco-secret!!', resave: false, saveUninitialized: false}))
app.use(cookieParser())
app.use(loggedMiddleware)
app.use(adminOptions)
app.use(methodOverride('_method'))
// app.use(cookieMiddleware)


const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/api', apiRouter)
app.use('/', mainRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)


app.listen(4000, () => {
    console.log('Server running on 4000');
})


app.set('view engine', 'ejs');
app.set('views', 'src/views');

                                                                                                                                                 

// app.use((req, res, next) => {
//     res.status(404).render(path.join(__dirname, './views/not-found'))
// });


