const notAdmin = (req, res, next) => {
    if(!req.session.userLogged){
        res.redirect('/products')
    }
    next()
}

module.exports = notAdmin