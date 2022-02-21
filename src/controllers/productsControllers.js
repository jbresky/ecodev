const path = require('path')
const fs = require('fs');

let productJson = fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8');



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
    products: (req, res) => {        
        //Convert product Json in a 
        let products = JSON.parse(productJson);
        
        res.render('products/Products', {products})
    },
    storeProduct: (req, res) => {
    //obtengo los datos del form-create
    },
    detail: (req, res) => {
       
    },
    edit: (req, res) => {
        res.render('products/edit-prod')
    },
    change: (req, res) => {

    },
    delete: (req, res) => {

    },
}

module.exports = productsController;