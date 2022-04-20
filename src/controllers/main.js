
const db = require('../database/models');

let mainController = {
    index: (req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render('home', {products})
            })
    }
}

module.exports = mainController;