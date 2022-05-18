const adminOptions = (req, res, next) => {
    res.locals.isAdmin = false;
    if(req.session.userLogged && req.session.userLogged.id == 7){
            res.locals.isAdmin = true
        }
        next();
}

module.exports = adminOptions