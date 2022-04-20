
// const path = require('path');
// const fs = require('fs');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../database/models');

const usersController = {
    login: (req, res) => {
        res.render('users/login.ejs');
    },
    register: (req,res) => {
        res.render('users/register.ejs');
    },
    editProfile: (req,res) => {
        // db.User.update({
        //     name:req.params.name,
        //     direccion: req.params.direccion,
        //     ciudad: req.params.ciudad,
        //     email: req.params.email,
        //     telefono: req.params.telefono,
        //     username: req.params.username,
        //     password: req.params.password,
        //     password1: req.params.password1,
        // })
        // res.redirect('perfil', {})
    },
    processLogin: (req, res) => {
         let errors = validationResult(req);

        db.User.findOne(
            {where:
                {email: req.body.email}
            })
            .then(user => {
                if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    userData = user.dataValues;
                    delete userData.password

                    req.session.userLogged = userData;
                        if(req.body.recordame){
                            res.cookie('recordame', userData.email, {
                                maxAge: (1000 * 60) * 60
                            }
                            )
                        }
                        return res.redirect('/');
                    } else {
                        res.render('users/login.ejs', {errors})
                    }
                 } else {
                    res.render('users/login.ejs', {errors})
                 }
                })
        },
       
    profile: (req, res) => {
        console.log(req.session.userLogged.id);
        res.render('users/profile.ejs', {
            user: userData
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
          
            db.User.create({
                ...req.body,
                avatar: req.file ? req.file.filename : 'default.jpg',
                password: bcrypt.hashSync(req.body.password, 10)
            })
            .then( createdUser => {
                return res.redirect('/users/login')
            })
            .catch(error => console.log(error))
        } else {
            res.render('users/register.ejs')
        }
    },
    favorites: (req, res) => {
        db.Product.findAll({
            include: [{association: 'users'}]
        })
        .then(favs => {
            res.render('users/favorites.ejs', {favs})
        })
        .catch(err => console.log(err))
    
        // db.Fav.findAll({
        //     include: [{association: 'product'}]
        // })
        // .then(favs => {
        //     res.render('users/favorites.ejs', {favs})
        // })
    }
}

module.exports = usersController