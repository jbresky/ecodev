const productsController = {
    carrito: (req, res) => {
        res.render('products/shoppingcart.ejs');
    },
    create: (req, res) => {
        res.render('products/creation.ejs')
    },
    detail: (req, res) => {
        res.render('products/detail.ejs');
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