const db = require('../../database/models');
const Op = db.sequelize.Op;

// const url = 'http://localhost:4000/img/products/'


module.exports = {
    shoppingCart: async (req, res) => {
        try {
            // let user_id = req.session.userLogged.id;
            let cart = await db.Cart.findOne({
                where: {
                    user_id: req.session.userLogged.id
                }
            })
            
            if (cart) {
                db.CartProducts.findAll({
                    where: {
                        cart_id: cart.id
                    },
                    include: ['product'],
                    raw: true
                })
                    .then(products => {
                        res.render('products/shoppingcart.ejs', { products })
                        // console.log(products);
                    })
            } else {
            res.render('products/shoppingcart.ejs', { products: cart })
        }
        } catch (err) {
            console.log(err);
        }
    },
    // list: async (req, res) => {
    //     try {
    //         const products = await db.Product.findAll({
    //             include: ['category']
    //         });

    //         products.forEach(product => {
    //             product.image = url + product.image
    //         });

    //         return res.json({
    //             total: products.length,
    //             status: 200,
    //             data: products
    //         })
    //     } catch(err) {
    //         res.status(500).json({...err})
    //     } 
    // },
    cart: async (req, res) => {
        try {
            const productId = req.params.id;
            const user_id = req.session.userLogged.id;

            let producto = await db.Product.findByPk(productId);
            if (!producto) {
                throw {
                    msg: 'product not found',
                    status: 404
                }
            }
            // busco si el usuario tiene carrito
            db.Cart.findOne({
                where: { user_id }
            })
                .then(cart => {
                    // si hay carrito, busco si hay productos en el carrito, es decir, si existe carts_has_products
                    if (cart) {
                        db.CartProducts.findOne({
                            where: {
                                cart_id: cart.id
                            }
                        })
                            .then(cartProd => {
                                // si NO existe (no hay productos), los CREAMOS
                                if (!cartProd) {
                                    db.CartProducts.create({
                                        cart_id: cart.id,
                                        product_id: productId,
                                        // amount: cart.total,
                                        quantity: 1
                                    })
                                    res.render('products/shoppingcart.ejs')
                                } else {
                                    // si hay productos, buscamos si ya tiene el producto en cuesti??n..
                                    db.CartProducts.findOne({
                                        where: {
                                            product_id: productId
                                        }
                                    })
                                        .then(productAlreadyInCart => {

                                            if (productAlreadyInCart) {
                                                // si existe el producto, le agregamos uno (y ACTUALIZAMOS el carrito)
                                                let quant = productAlreadyInCart.quantity + 1;
                                                //    console.log('cant: ' + quant);
                                                db.CartProducts.update({
                                                    quantity: quant
                                                }, {
                                                    where: {
                                                        product_id: productId
                                                    }
                                                })
                                                res.render('products/shoppingcart.ejs')
                                                // pero si no tiene el producto, lo CREAMOS
                                            } else {
                                                db.CartProducts.create({
                                                    cart_id: cart.id,
                                                    product_id: productId,
                                                    // amount: cart.total, 
                                                    quantity: 1
                                                })
                                            }
                                            // res.render('products/shoppingcart.ejs')
                                        })


                                }

                                // res.render('/')
                            })
                    } else {
                        // si el usuario NO tiene carrito, lo creamos..
                        db.Cart.create({
                            user_id: user_id
                        })
                            .then(newCart => {
                                db.CartProducts.create({
                                    cart_id: newCart.id,
                                    product_id: productId,
                                    amount: producto.price,
                                    quantity: 1
                                })
                            })
                        res.render('products/shoppingcart.ejs')
                    }
                })
            // res.redirect('/');
        } catch (error) {
            console.log(error)
        }
    },
    cartDelete: async (req, res) => {
        try {
            let productId = Number(req.params.productId);
            await db.CartProducts.destroy({
                where: {
                    product_id: productId
                }
            })
                .then(deleted => {
                    res.redirect('/');
                })
        } catch (err) {
            console.log(err);
        }
    }
}