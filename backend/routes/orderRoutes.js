const express = require('express')
const router = express.Router()

const {
    newOrder,
    myOrder,
    getSingleOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController')

const {isAuthenticatedUser,authorizedRole} = require('../middleware/Auth')

router.route("/order/new").post(isAuthenticatedUser,newOrder)

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)

router.route("/order/me").get(isAuthenticatedUser,myOrder)

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrder);


module.exports = router;