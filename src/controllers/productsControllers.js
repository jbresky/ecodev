const path = require('path')
const fs = require('fs');
let db = require('../database/models');
// let productJson = fs.readFileSync(path.join(__dirname, '../data', 'products.json'), 'utf-8');

const productsController = {
    shoppingCart: (req, res) => {
        // db.Product.findByPk(req.params.id)
        //     .then(product => {
        //         res.render('products/shoppingcart.ejs', {product})
        //     })
        /*res.render('products/shoppingcart.ejs');*/
    },

    createForm: (req, res) => {
        res.render('products/creation.ejs')
    },
    storeProduct: (req, res) => {
        //     db.Product.create({
        //         name: req.body.name,
        //         price: req.body.price,
        //         category: req.body.category,
        //         description: req.body.description,
        //         image: req.body.image,
        // })
    },

    detail: (req, res) => {
        // db.Product.findbyPk(req.params.id)
        // .then(product => {
        //     res.render('products/detail-prod.ejs', {product})
        // })
        /*let product = JSON.parse(productJson);
        let searchProduct = product.find(result => result.id == req.params.id)
        res.render('products/detail-prod.ejs', {searchProduct});*/
    },
    products: (req, res) => {        
        db.Product.findAll()
            .then(products => {
                return res.render('products/products.ejs', {products})
            })
            .catch(err => {
                console.log(err)
            })
        // let products = JSON.parse(productJson);
        // res.render('products/Products', {products})
    } ,
    
    edit: (req, res) => {
    //    let giveAProduct = db.Product.findbyPk(req.params.id)
    //         .then(function(product) {
    //             return res.render('edit-prod', {products:products})
    //         })
    },
    saveEdit: (req,res) => {
        // db.Product.update({
        //     name: req.body.name,
        //     price: req.body.price,
        //     image: req.body.image,
        //     category: req.body.category,
        //     description: req.body.description
        // },{
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // res.redirect('/detail-prod/' + req.params.id)
    }, 
    delete: (req, res) => {
    //     db.Product.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     res.redirect('/products');
    // },
    }
}

module.exports = productsController;