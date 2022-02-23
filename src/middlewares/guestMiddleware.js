
const guestMiddleware = (req, res, next) => {
    if(req.session.userLogged){
        res.redirect('/users/perfil')
    }
    next();
}


module.exports = guestMiddleware;