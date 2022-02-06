let express = require('express');
let multer = require('multer');
let path = require('path');
let {check} = require('express-validator');

let router = express.Router();

const usersController = require('../controllers/usersControllers');

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

router.get('/login', usersController.login);
router.post('/login', validation, usersController.processLogin)

router.get('/register', usersController.register);
router.post('/register', uploadFile.single('avatar'), usersController.processRegister)

router.get('/perfil', usersController.perfil)
router.get('/my-products', usersController.administracion);


module.exports = router;