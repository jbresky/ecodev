const db = require('../../database/models');

module.exports = {

    addUserFav: async (req, res) => {
        try {
            if(req.session.userLogged){
                const product = await db.Product.findByPk(req.params.id);
                if(!product){
                    throw {
                        msg:'product not found',
                        status:404
                    }
                }
            db.Fav.create({
                product_id: product.id,
                user_id: req.session.userLogged.id
            })
            // return res.json({
            //     ...req.session.userLogged
            // })
        }
        } catch (error) {
            res.status(error.status || 500).json({...error})
        }
    }
}