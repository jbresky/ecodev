
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
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/users/login')
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
    profile: (req, res) => {
        db.User.findOne({
            where:{
                email: userData.email
            }, 
            include: ['products']
        })
        .then(user => {
            res.render('users/profile.ejs',  {user})
        })
        .catch(err => console.log(err))
    },
    favorites: (req, res) => {
        db.Fav.findAll({
            include: ['product', 'user']
        }, { 
            where: {
                'user': userData.id
        }
        })
        .then(products => {
            res.render('users/favorites.ejs', {products})
        })
        .catch(err => console.log(err))
    },
    edit: (req, res) => {
        db.User.findOne({
            where: {
                email: userData.email
            }
        })
        .then(user => {
            res.render('users/edit.ejs', {user})
        })
    },
    processEdit: (req, res) => {
        db.User.update({
        // ...req.body,
        // avatar: req.file ? req.file.filename : 'default.jpg',
        // password: bcrypt.hashSync(req.body.password, 10)
        })
        .then(userUpdated => {
            res.redirect('users/profile.ejs')
        })
    }
}

module.exports = usersController