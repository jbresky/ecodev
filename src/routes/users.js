const express = require('express');
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');
const router = express.Router();

const usersController = require('../controllers/usersControllers');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users')
    },
    filename: (req, file, cb) => {
       let fileName = `${Date.now()}-${path.extname(file.originalname)}`;
       cb(null, fileName)
    }
}) 

const uploadFile = multer({storage})

router.get('/login', guestMiddleware, usersController.login);

router.get('/register', guestMiddleware, usersController.register);
// router.post('edit-profile', usersController.editProfile);

router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', usersController.logout)

router.get('/favorites', authMiddleware, usersController.favorites)

const validationLogin = [
    check('email')
        .notEmpty(),
        // .isEmail().withMessage('Email inválido'),
    check('password')
        .notEmpty()
        .isLength({min: 8})
]

router.post('/login', validationLogin, usersController.processLogin)

const validatorRegister = [
    check('first_name')
        .notEmpty()
        .isLength({min: 4}),
    check('last_name')
        .notEmpty(),
    check('email')
        .notEmpty()
        .isEmail(),
    check('password')
        .notEmpty()
        .isLength({min: 8}),
    check('country')
        .notEmpty()
]

router.post('/register', uploadFile.single('avatar'), validatorRegister, usersController.processRegister)

module.exports = router;