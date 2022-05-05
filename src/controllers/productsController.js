
const db = require('../database/models');
const op = db.Sequelize.Op

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
            return res.render('products/products.ejs', {products})
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
        db.Product.findByPk(req.params.id, {
            include: ['category']
        })
        .then(product => {
            res.render('products/detail.ejs', {product})
        })
        .catch(err => console.log(err))
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
    //     db.Product.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //     res.redirect('/products');
    // },
    },
    search: (req, res) => {

        

        let search_criteria = req.query.product;
        res.locals.product_to_search = search_criteria
        db.Product.findAll({
            where: [
                {name: {[op.like] : '%' + search_criteria + '%'}}
            ]
        })
        .then(products => {
            res.render('products/products.ejs', {products, product_to_search: res.locals.product_to_search })
        })
    },
    personalCare: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 1
            }
        })
        .then(products => {
            res.render('products/products.ejs', {products})
        })
        .catch(err => console.log(err))
    },
    healthBeauty: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 2
            }
        })
        .then(products => {
            res.render('products/products.ejs', {products})
        })
        .catch(err => console.log(err))
    },
    naturalMedicine: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 3
            }
        })
        .then(products => {
            res.render('products/products.ejs', {products})
        })
        .catch(err => console.log(err))
    },
    ecoProducts: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 4
            }
        })
        .then(products => {
            res.render('products/products.ejs', {products})
        })
        .catch(err => console.log(err))
    },
    deco: (req, res) => {
        db.Product.findAll({
            where: {
                category_id: 5
            }
        })
        .then(products => {
            res.render('products/products.ejs', {products})
        })
        .catch(err => console.log(err))
    }
}

module.exports = productsController;