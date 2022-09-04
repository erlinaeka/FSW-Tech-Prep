const express = require('express');
const router = express.Router();
const authController = require('../contoroller/auth');
const productController = require('../contoroller/productController');
const middleware = require('../middleware/checkUser');
const upload = require('../library/uploadOnMemory');

router.get('/', (req, res) => {
    res.send('running');
});

router.post('/auth/login', authController.login);
router.post('/auth/signup', authController.register);

router.post('/v1/products', middleware.verifToken, upload.single("image"), productController.addProduct);
router.get('/v1/products', middleware.verifToken, productController.getAllProduct);
router.get('/v1/products/:id', middleware.verifToken, productController.getProduct);
router.put('/v1/products/:id', middleware.verifToken, productController.updateProduct);
router.delete('/v1/products/:id', middleware.verifToken, productController.deleteProduct);


module.exports = router;