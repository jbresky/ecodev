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
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`)
    }
}) 

const uploadFile = multer({storage})

router.get('/login', guestMiddleware, usersController.login);

router.get('/register', guestMiddleware, usersController.register);
// router.post('edit-profile', usersController.editProfile);

router.get('/perfil', authMiddleware, usersController.detailProfile);
router.get('/logout', usersController.logout)

router.get('/favorites', authMiddleware, usersController.favorites)

const validation = [
    check('email')
        .notEmpty().withMessage('Escribí tue email').bail()
        .isEmail().withMessage('Email inválido'),
    check('password')
        .notEmpty().withMessage('Escribí tu contraseña').bail()
        .isLength({min: 8}).withMessage('Mínimo 8 caracteres')
]

router.post('/login', validation, usersController.processLogin)

const validatorRegister = [
    check('firstName')
        .notEmpty().withMessage('Colocá tu nombre'),
    check('lastName')
        .notEmpty().withMessage('Colocá tu apellido'),
    check('email')
        .notEmpty().withMessage('Escribí tue email').bail()
        .isEmail().withMessage('Email inválido'),
    check('password')
        .notEmpty().withMessage('Escribí tu contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('address')
        .notEmpty().withMessage('Colocá tu dirección')
]

router.post('/register', uploadFile.single('image'), validatorRegister, usersController.processRegister)

module.exports = router;