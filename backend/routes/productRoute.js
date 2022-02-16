const express = require('express')
const { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController');

const router = express.Router()

const {isAuthenticatedUser,authorizedRole} = require('../middleware/Auth')

router.route("/products").get(getAllProducts)


router.route("/admin/product/new")
      .post(isAuthenticatedUser, authorizedRole("admin"),createProduct)

router.route("admin/product/:id")
    .put(isAuthenticatedUser, authorizedRole("admin"),updateProduct)
    .delete(isAuthenticatedUser, authorizedRole("admin"),deleteProduct)
   
router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

