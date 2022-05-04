const express = require('express');
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');
const router = express.Router();

const usersController = require('../controllers/usersControllers');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const req = require('express/lib/request');



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

router.get('/login', guestMiddleware, usersController.login)

router.get('/register', guestMiddleware, usersController.register)

router.get('/profile', authMiddleware, usersController.profile)
router.get('/logout', usersController.logout)

router.get('/favorites', authMiddleware, usersController.favorites)
router.get('/edit', authMiddleware, usersController.edit)
router.get('/edit/password', authMiddleware, usersController.password)
router.get('/edit/cancel', authMiddleware, usersController.cancel)

const validationLogin = [
    check('email')
        .notEmpty(),
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


router.put('/avatar', uploadFile.single('avatar'), usersController.processAvatar)

const validationEdit = [
    check('first_name')
        .notEmpty()
        .isLength({min: 4}),
    check('last_name')
        .notEmpty(),
]
router.put('/edit', validationEdit, usersController.processName)

const validationPasswordEdit = [
    check('password')
        .notEmpty()
        .isLength({min: 8})
]

router.put('/password', validationPasswordEdit, usersController.processPassword)

router.delete('/cancel', usersController.deleteUser)
module.exports = router;