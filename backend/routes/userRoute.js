const express = require('express')
const {
     registerUser,
     loginUser,logout,
     forgotPassword,resetPassword,
     getUserDetails,
     updatePassword,
     updateUserDetails,
     getAllUser,
     getSingleUser,
     updateUserRole,
     deleteUser 
     } = require('../controllers/userController');

const router = express.Router()

const {isAuthenticatedUser,authorizedRole} = require('../middleware/Auth')

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get( isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route('/me/update').put(isAuthenticatedUser,updateUserDetails);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllUser);

  router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizedRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteUser);

module.exports = router;