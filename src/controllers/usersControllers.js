
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../data/users.json')
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'))

const db = require('../database/models');

const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs');
    },
    register: (req,res) => {
        db.User.create({
            name:req.params.name,
            direccion: req.params.direccion,
            ciudad: req.params.ciudad,
            email: req.params.email,
            telefono: req.params.telefono,
            username: req.params.username,
            password: req.params.password,
            password1: req.params.password1,
        })
        res.redirect('home');
        /*res.render('users/register.ejs')*/;
    },
    editProfile: (req,res) => {
        db.User.update({
            name:req.params.name,
            direccion: req.params.direccion,
            ciudad: req.params.ciudad,
            email: req.params.email,
            telefono: req.params.telefono,
            username: req.params.username,
            password: req.params.password,
            password1: req.params.password1,
        })
        res.redirect('perfil', {})
    },
    detailProfile: (req, res) =>{
        res.render('perfil');
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            
         for(i = 0; i < users.length; i++){
            if(users[i].email == req.body.email){
                if(req.body.password == users[i].password){
                // if(bcrypt.compareSync(req.body.password, users[i].password)){
                    var usuarioALoguearse = users[i];
                    req.session.userLogged = usuarioALoguearse;
                
                    if(req.body.recordame){
                        res.cookie('recordame', usuarioALoguearse.email, {
                            maxAge: (1000 * 60) * 60
                        }
                        )
                    }
                    res.redirect('/users/perfil');
                }
            }
         }

         if(usuarioALoguearse == undefined){
             res.render('users/login.ejs', {errors: [
                {msg: 'Credenciales inválidas'}
            ]})
         }

        } else {
             res.render('users/login.ejs', {errors: errors.errors, old: req.body})
        }
    },
    perfil: (req, res) => {
        // console.log(req.session.userLogged);
        res.render('users/perfil.ejs', {
            user: req.session.userLogged
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    processRegister: (req, res) => {
        
    },
    favorites: (req, res) => {
        res.render('users/favorites.ejs')
    },
}

module.exports = usersController, users