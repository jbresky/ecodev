
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
                    // delete userData.password

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
    profile: async (req, res) => {
        try {
            let User = await db.User.findOne({
                where: {
                    email: userData.email
                },
                include: ['products']
            })
            let Cart = await db.Cart.findOne({
                where: {
                    user_id: userData.id
                }
            })
            let ProductsInCart = await db.CartProducts.findAll({
                where: {
                    cart_id: Cart.id
                },
            })

            Promise.all([User, Cart, ProductsInCart])
            .then(([user, cart, cartProducts]) => {
                res.render('users/profile.ejs', {user, cartProducts})
            })
        } catch(err){
            console.log(err);
        }
        // db.User.findOne({
        //     where:{
        //         email: userData.email
        //     }, 
        //     include: ['products', 'cart']
        // })
        // .then(user => {
        //     res.render('users/profile.ejs',  {user})
        // })
        // .catch(err => console.log(err))
    },
    favorites: (req, res) => {
        db.Fav.findAll({
            where: {
                user_id: userData.id
            },
            include: ['user', 'product']
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
    processAvatar: (req, res) => {
        
        db.User.update({
        avatar: req.file ? req.file.filename : 'default.jpg',
        },{
            where:{
                id: userData.id
            }
        })     
         res.redirect('/users/profile')
        // .catch(err => console.log(err))
   
    },
    password: (req, res) => {
        db.User.findOne({
            where: {
                email: userData.email
            }
        })
        .then(user => {
            res.render('users/password.ejs', {user})
        })
    },
    cancel: (req, res) => {
        db.User.findOne({
            where: {
                email: userData.email
            }
        })
        .then(user => {
            res.render('users/cancel.ejs', {user})
        })
    },
    processName: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
          
            db.User.update({
                ...req.body,
            },{
                where:{ email: userData.email }
            })
            .then(editedUser => {
                return res.redirect('/users/profile')
            })
            .catch(error => console.log(error))
        } else {
            res.render('users/edit.ejs', {user: userData})
        }
    },
    processPassword: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            if(bcrypt.compareSync(req.body.oldPassword, userData.password)){
            db.User.update({
                password: bcrypt.hashSync(req.body.password, 10)
            },{
                where:{ email: userData.email }
            })
            .then(editedUser => {
                return res.render('users/login.ejs')
            })
            .catch(error => console.log(error))
          } else {
            res.render('users/password.ejs', {errors})   
          }
        } else {
            res.render('users/password.ejs', {user: userData})
        }
    },
    deleteUser: async (req, res) => {
        try {
        await db.User.destroy({
            where: {
                id: userData.id
            }
        })
            res.redirect('/users/login')
    } catch(error ) {
        console.log(error)
    }
        
    }
}

module.exports = usersController