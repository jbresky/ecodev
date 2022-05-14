const db = require('../../database/models')

let totals = {
    list: async (req, res) => {
        try {
        let Product = db.Product.findAll({
            include: ['category']
        })

        let Category = db.Category.findAll();
        let User = db.User.findAll();

        Promise.all([Product, Category, User])
            .then(([products, categories, users]) => {
                
                let productCategory = []
            products.forEach(product => {
                productCategory.push(product.category)
            });
    
            function findProduct(prodInCat, key) {
                let category = [];
                prodInCat.forEach(x => {
    
                    if (category.some(product => { 
                        return product[key] == x[key] 
                    })){
                        category.forEach(k => {
                            if (k[key] === x[key]) {
                                k['cantidad']++
                            }
                        })
                    } 
                    else {
                        let a = {}
                        a[key] = x[key]
                        a['cantidad'] = 1
                        category.push(a);
                    }
                })
                return category
            }

            let resultado = findProduct(productCategory, 'name');

                return res.json({
                    status: 200,
                    data: [
                        {
                            name: 'Productos',
                            total: products.length
                        },
                        {
                            name: 'Categorías',
                            total: categories.length
                        },
                        {
                        name: 'Usuarios',
                        total: users.length
                    }
                    ],
                    productsCategories:  resultado ,
                    status: 200
                })
            })
        } catch(err){
            res.status(err.status || 500).json({...err})
        }
    }
}

module.exports = totals