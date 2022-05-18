const isAdmin = (req, res, next) => {
    if(req.session.userLogged && req.session.userLogged.id != 7){
        res.redirect('/products')
    }
    next();
}

module.exports = isAdmin