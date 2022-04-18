const path = require('path')
const fs = require('fs');
let db = require('../database/models');
let productJson = fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8');

const productsController = {
    shoppingCart: (req, res) => {
        /*db.Product.findByPk(req.params.id)
            .then(function(product){
                res.render('/shoppingcart', {product:product})
            })*/
        res.render('products/shoppingcart.ejs');
    },
    products: (req, res) => {     
        /*let products = JSON.parse(productJson);  
        res.render('products/products.ejs', {products})*/
    
        db.Product.findAll()
        .then(products => {
            return res.render('products', {products:products})
        })
        .catch(function(error) {
            console.log('error')
        })
    
} ,

    createForm: (req, res) => {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            description: req.body.description
        })
        /*res.render('products/creation.ejs')*/
    },

    detail: (req, res) => {
        

        /*let product = JSON.parse(productJson)
        db.Product.findbyPk(req.params.id)
        .then(function(product) {
            res.render('detail-prod', {product:searchProduct})
        })*/
        let product = JSON.parse(productJson);
        let searchProduct = product.find(result => result.id == req.params.id)
        res.render('products/detail-prod.ejs', {searchProduct});
    },
   
    edit: (req, res) => {
       let giveAProduct = db.Product.findbyPk(req.params.id)
            .then(function(product) {
                return res.render('edit-prod', {products:products})
            })
    },
    saveEdit: (req,res) => {
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            description: req.body.description
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect('/detail-prod/' + req.params.id)
    }, 
    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/products');
    },
}

module.exports = productsController;