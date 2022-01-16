const productsController = {
    carrito: (req, res) => {
        res.render('shoppingcart');
    },
    create: (req, res) => {
        res.render('creation')
    },
    store: (req, res) => {
    //obtengo los datos del form-create
    },
}

module.exports = productsController;