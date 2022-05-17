const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({
                order: [
                    ['id', 'DESC']
                ],
                limit: 1
            });
            return res.json({
                total: users.length,
                status: 200,
                data: users
            })
        }  catch(err){
            res.status(err.status || 500).json({...err})
        }
    },
    userId: async (req, res) => {
        try {
            const user = await db.User.findByPk();
            if(user){
                return res.json({
                    status: 220,
                    data: user
                })
            }
        } catch(err){
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
               where:{
                product_id: product.id,
                user_id: req.session.userLogged.id
               }
            }).then(
                fav => {
                if(!fav){
                // if(!fav){
                // ACA ESTA VINCULANDO CUALQUIER PRODUCTO COMO FAVORITO, NO PARA CADA USUARIO
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