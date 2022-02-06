
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const usersController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    },
    administracion: (req, res) => {
        res.render('my-products')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            for(i = 0; i < users.length; i++){
                if(req.body.email == users[i].email && bcrypt.compareSync(req.body.password, users[i].password)){
                let usuarioALoguearse = users[i];
                req.session.usuarioLogueado = usuarioALoguearse;
                res.redirect('users/perfil')
            }
        }

        if(usuarioALoguearse == undefined){
            res.render('login', {errors: [
                {msg: 'Credenciales inválidas'}
            ]})
        }

        } else {
            res.render('login', {errors: errors.errors})
        }
    
        },
    perfil: (req, res) => {
        res.render('perfil', {
            // user: req.sesion.usuarioLogueado
        })
    },
    processRegister: (req, res) => {
        
    }
}

module.exports = usersController;