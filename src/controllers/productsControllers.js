const productsController = {
    shoppingCart: (req, res) => {
        res.render('products/shoppingcart.ejs');
    },
    createForm: (req, res) => {
        res.render('products/creation.ejs')
    },
    list: (req, res) => {
        res.render('products/products.ejs');
    },
    storeProduct: (req, res) => {
    //obtengo los datos del form-create
    },
    detail: (req, res) => {
       
    },
    edit: (req, res) => {

    },
    change: (req, res) => {

    },
    delete: (req, res) => {

    },
}

module.exports = productsController;