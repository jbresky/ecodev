const productsController = {
    carrito: (req, res) => {
        res.render('shoppingcart');
    },
    create: (req, res) => {
        res.render('creation')
    },
    detail: (req, res) => {
        res.render('descrip');
    },
    store: (req, res) => {
    //obtengo los datos del form-create
    },
    detail: (req, res) => {
        // products.find()
    },
    edit: (req, res) => {

    },
    change: (req, res) => {

    },
    delete: (req, res) => {

    },
}

module.exports = productsController;