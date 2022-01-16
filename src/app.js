const express = require('express');
const path = require('path');
const app = express();


const mainRoutes = require('./routes/main')
const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products');
const { urlencoded } = require('express');

app.use('/', mainRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)


app.listen(4000, () => {
    console.log('Server running on 4000');
})

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    res.status(404).render('not-found')
})