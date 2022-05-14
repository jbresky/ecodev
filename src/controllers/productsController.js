
const db = require('../database/models');
const op = db.Sequelize.Op

const productsController = {
    shoppingCart: async (req, res) => {
        /*db.Product.findByPk(req.params.id)
            .then(function(product){
                res.render('/shoppingcart', {product:product})
            })*/


            let user_id = req.session.userLogged.id;
            console.log('USer ID: ' + user_id);
            let cart = await db.Cart.findOne({
                where: {user_id}
            })

            
            if (cart) {
                db.CartProducts.findAll( {where: {cart_id: cart.id}, include: ['product'], raw: true})
                .then (prod => {
                    res.render('products/shoppingcart.ejs', {products:prod})
                })
            } 
           
    },

    addProductToCart: async (req, res) => {
        const productId = req.params.productId;
        const user_id = req.session.userLogged.id;

        

        console.log('produc ID: ' +productId + ' user_id: '+ user_id);

        let producto = await db.Product.findByPk(productId);

        db.Cart.findOne({
            where: {user_id}
        })
        .then (cart => {
            if (cart) {
                db.CartProducts.findOne({
                    where:{cart_id: cart.id}
                })
                .then(cartProd => {

                    if (!cartProd){
                        db.CartProducts.create({cart_id: cart.id, product_id: productId, amount: cart.total, quantity:1})
    
                    } else {
                       db.CartProducts.findOne({where: {product_id: productId}})
                       .then( p => {
    
                           if (p){
                               let quant = p.quantity + 1;
                               console.log('cant: ' + quant);
                               db.CartProducts.update({ quantity: quant }, {where : { product_id:productId }})
                            } else {                   
                                db.CartProducts.create({cart_id: cart.id, product_id: productId, amount: cart.total, quantity:1})
                            }
                            
                        }) 
                        
                    }
                    res.render('/')
                }).catch(error => console.log(error))
               
            } else {
                db.Cart.create({ user_id: user_id})
                .then( c => {
                    db.CartProducts.create({cart_id: c.id, product_id: productId, amount: producto.price , quantity:1})
                })
                
            }
        })


       
        res.redirect('/');
    },

    cartDeleteProduct: (req, res) => {
        let product_id = Number(req.params.productId);

        

        db.CartProducts.destroy(
            { where:{ product_id } }  )
        
        
        res.redirect('/products/cart/');
        
        
        
        
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