const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();
            return res.json({
                total: users.length,
                status: 200,
                data: users
            })
        }  catch(err){
            res.status(err.status || 500).json({...err})
        }
        
    },
    addUserFav: async (req, res) => {
        try {
                const product = await db.Product.findByPk(req.params.id);
                if(!product){
                    throw {
                        msg:'product not found',
                        status:404
                    }
                }
            db.Fav.findOne({
                where: {
                    product_id: product.id
                }
            }).then(fav => {
                if(!fav){
                    db.Fav.create({
                        product_id: product.id,
                        user_id: req.session.userLogged.id
                    })
                }
            })
           
        } catch (error) {
            res.status(error.status || 500).json({...error})
        }
    }
}