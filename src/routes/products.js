const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const path = require('path'); 
const multer = require('multer');

const productsController = require('../controllers/productsController');
// const guestMiddleware = require('../middlewares/guestMiddleware')
// const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin')
const authAdmin = require('../middlewares/authAdmin')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/products')
    },
    filename: (req, file, cb) => {
       let fileName = `${Date.now()}-${path.extname(file.originalname)}`;
       cb(null, fileName)
    }
}) 

const uploadFile = multer({storage})

router.get('/', productsController.products)
router.get('/personal-care', productsController.personalCare)
router.get('/health-&-beauty', productsController.healthBeauty)
router.get('/natural-medicine', productsController.naturalMedicine)
router.get('/eco-products', productsController.ecoProducts)
router.get('/deco', productsController.deco)
// router.get('/cart', authMiddleware, productsController.shoppingCart)

router.get('/create', isAdmin, productsController.create)
router.post('/create', uploadFile.single('image'), productsController.new)

router.get('/detail/:id', productsController.detail)
router.get('/edit/:id', isAdmin, productsController.edit)

// router.put('/:id', productsController.change)
router.get('/delete/:id', authAdmin, isAdmin, productsController.delete)
router.get('/search', productsController.search)


// router.get('/addToCart/:productId', authMiddleware, productsController.addProductToCart);
// router.delete('/cartDeleteProduct/:productId', authMiddleware, productsController.cartDeleteProduct);

router.put('/edit/:id', uploadFile.single('image'), productsController.processEdit)
router.delete('/delete/:id', productsController.processDelete)
module.exports = router;