const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try{
        const categories = db.Category.findAll();

        return res.json({
            total: categories.length,
            status: 200,
            data: categories
        })
    } catch(err){
        res.status(err.status || 500).json({...err})
    }
    }
}