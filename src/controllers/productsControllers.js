const productsController = {
    carrito: (req, res) => {
        res.render('shoppingcart');
    },
    create: (req, res) => {
        res.render('creation')
    },
    descrip: (req, res) => {
        res.render('descrip');
    },
    store: (req, res) => {
    //obtengo los datos del form-create
    },
}

module.exports = productsController;