const express = require('express')
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails } = require('../controllers/productController');
const router = express.Router()
const {isAuthenticatedUser,authorizedRole} = require('../middleware/Auth')

router.route("/products").get(isAuthenticatedUser,authorizedRole("admin"),getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,createProduct)
router.route("/product/:id").put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(getProductDetails)

module.exports = router;