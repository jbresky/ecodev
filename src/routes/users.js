const express = require('express');
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');

const usersController = require('../controllers/usersControllers');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`)
    }
}) 

const uploadFile = multer({storage})

const validation = [
    check('email').notEmpty().withMessage('Escribí tue email').isEmail().withMessage('Email inválido'),
    check('password').notEmpty().withMessage('Escribí tu contraseña').isLength({min: 8}).withMessage('Mínimo 8 caracteres')
]

const validatorRegister = [
    check('firstName').isAlpha().withMessage('Colocá tu nombre'),
    check('lastName').isAlpha().withMessage('Colocá tu nombre'),
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    check('address').isAlphanumeric().withMessage('Colocá tu dirección')
]

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', validation, usersController.processLogin)


router.get('/register', guestMiddleware, usersController.register);
router.post('/register', uploadFile.single('avatar'), validatorRegister, usersController.processRegister)

router.get('/perfil', authMiddleware, usersController.perfil)
router.get('/logout', usersController.logout)
router.get('/my-products', usersController.administracion);


module.exports = router;