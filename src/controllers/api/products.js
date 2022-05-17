const db = require('../../database/models');
const Op = db.sequelize.Op;

const url = 'http://localhost:4000/img/products/'

module.exports = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                include: ['category']
            });
            
            products.forEach(product => {
                product.image = url + product.image
            });

            return res.json({
                total: products.length,
                status: 200,
                data: products
            })
        } catch(err) {
            res.status(500).json({...err})
        } 
    },
}