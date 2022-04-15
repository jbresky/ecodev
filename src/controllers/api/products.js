const db = require('../../database/models');
const Op = db.sequelize.Op;

module.exports = {
    list: async (req, res) => {
        try {
            const products = await db.Product.findAll();
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