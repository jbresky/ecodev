
const db = require('../database/models');
const op = db.Sequelize.Op

const productsController = {
    // shoppingCart: async (req, res) => {
    //     try {
    //     // let user_id = req.session.userLogged.id;
    //     let cart = await db.Cart.findOne({
    //             where: {
    //                 user_id: req.session.userLogged.id
    //             }
    //         })
    //         if(cart) {
    //             db.CartProducts.findAll({
    //                 where: {
    //                     cart_id: cart.id
    //                 },
    //                 include: ['product'], 
    //                 raw: true
    //             })
    //             .then (products => {
    //                 res.render('products/shoppingcart.ejs', {products})
    //             })
    //         } 
    //     } catch(err){
    //         console.log(err);
    //     }
    // },

    // addProductToCart: async (req, res) => {
    //     const productId = req.params.productId;
    //     const user_id = req.session.userLogged.id;

    //     let producto = await db.Product.findByPk(productId);
    //     // busco si el usuario tiene carrito
    //     db.Cart.findOne({
    //         where: {user_id}
    //     })
    //     .then (cart => {
    //         // si hay carrito, busco si hay productos en el carrito, es decir, si existe carts_has_products
    //         if (cart) {
    //             db.CartProducts.findOne({
    //                 where: {
    //                     cart_id: cart.id
    //                 }
    //             })
    //             .then(cartProd => {
    //                 // si NO existe (no hay productos), los CREAMOS
    //                 if (!cartProd){
    //                     db.CartProducts.create({
    //                         cart_id: cart.id,
    //                         product_id: productId,
    //                         // amount: cart.total,
    //                         quantity: 1
    //                     })//probando
    //                     // .then(cart => {
    //                     //     db.Cart.update({
    //                     //         total: cart.length
    //                     //     },{
    //                     //         where:{
    //                     //             user_id
    //                     //         }
    //                     //     })
    //                     // })
    //                     //probando
    //                 } else {
    //                     // si hay productos, buscamos si ya tiene el producto en cuestión..
    //                    db.CartProducts.findOne({
    //                        where: {
    //                            product_id: productId
    //                         }
    //                     })
    //                    .then( productAlreadyInCart => {
    
    //                        if (productAlreadyInCart){
    //                            // si existe el producto, le agregamos uno (y ACTUALIZAMOS el carrito)
    //                            let quant = productAlreadyInCart.quantity + 1;
    //                         //    console.log('cant: ' + quant);
    //                            db.CartProducts.update({
    //                                quantity: quant 
    //                             }, { where : { 
    //                                 product_id: productId 
    //                             }
    //                             })
    //                             // pero si no tiene el producto, lo CREAMOS
    //                         } else {                   
    //                             db.CartProducts.create({
    //                                 cart_id: cart.id, 
    //                                 product_id: productId, 
    //                                 // amount: cart.total, 
    //                                 quantity: 1
    //                             })
    //                         }
    //                     }) 
                        
    //                 }
    //                 res.render('/')
    //             }).catch(error => console.log(error))
               
    //         } else {
    //             // si el usuario NO tiene carrito, lo creamos..
    //             db.Cart.create({
    //                  user_id: user_id
    //                 })
    //             .then( newCart => {
    //                 db.CartProducts.create({
    //                     cart_id: newCart.id,
    //                     product_id: productId, 
    //                     amount: producto.price, 
    //                     quantity: 1
    //                 })
    //             })
                
    //         }
    //     })
    // //     res.redirect('/');
    // },

    // cartDeleteProduct: (req, res) => {
    //     let product_id = Number(req.params.productId);
    //     db.CartProducts.destroy({
    //         where: {
    //             product_id
    //         }
    //     })
    //     res.redirect('/products/cart/');
    // },

    products: (req, res) => {     
        db.Product.findAll()
        .then(products => {            
             res.render('products/products.ejs', {products})
        })
        .catch(function(error) {
            console.log('error')
        })
},
    create: (req, res) => {
        db.Product.findAll({
            include: ['category']
        })
            .then(product => {
                res.render('products/create.ejs', {product})
            })
            .catch(err => console.log(err))
    },
    new: (req, res) => {
        db.Product.create({
           ...req.body,
           image: req.file.filename
        })
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
        db.Product.findByPk(req.params.id, {
            include: ['category']
        })
        .then(product => {
            res.render('products/edit.ejs', {product})
        })
        .catch(err => console.log(err))
    },

    processEdit: (req,res) => {
        db.Product.update({
           ...req.body,
           image: req.file.filename           
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect('products/detail/:id')
    }, 
    delete: (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                res.render('products/delete.ejs', {product})
            })
            .catch(err => console.log(err))
    },
    processDelete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/');
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