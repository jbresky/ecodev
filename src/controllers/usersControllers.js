
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs');
    },
    register: (req,res) => {
        res.render('users/register.ejs');
    },
    administracion: (req, res) => {
        res.render('my-products')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
         for(i = 0; i < users.length; i++){
            if(users[i].email == req.body.email){
                if(bcrypt.compareSync(req.body.password, users[i].password)){
                    var usuarioALoguearse = users[i];
                    req.session.userLogged = usuarioALoguearse;
                    res.redirect('/users/perfil');
                }
            }
         }

         if(usuarioALoguearse == undefined){
             res.render('login', {errors: [
                {msg: 'Credenciales inválidas'}
            ]})
         }

        } else {
             res.render('login', {errors: errors.errors, old: req.body})
        }
    },
    perfil: (req, res) => {
        res.render('perfil', {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    processRegister: (req, res) => {
        
    }
}

module.exports = usersController;