const users = require('../controllers/usersControllers');

function cookieMiddleware(req, res, next){
    // hay una cookie pero no está logueado (porque la session se pierde cuando se cierra el navegador, entonces mantiene la cookie por 2 horas)
    if(req.cookies.recordame =! undefined && req.session.userLogged == undefined){
        for(i = 0; i < users.length; i++){
            if(users[i].email == req.cookies.recordame){
                    var usuarioALoguearse = users[i];
                   break;
            }
    }
    req.session.userLogged = usuarioALoguearse;
}
    next();
}

module.exports = cookieMiddleware;