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
                
                return res.json({
                    status: 200,
                    data: [
                        {
                            name: 'products',
                            total: products.length
                        },
                        {
                            name: 'categories',
                            total: categories.length
                        },
                        {
                        name: 'users',
                        total: users.length
                    }
                    ]
                })
            })
        } catch(err){
            res.status(err.status || 500).json({...err})
        }
    }
}

module.exports = totals