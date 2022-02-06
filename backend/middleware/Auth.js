const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next)=>{

    //saved cookie wyjile login or registration time
    const {token} = req.cookies

    if(!token) {
        next(new Errorhandler("Please Login to access this page",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)

    next();

});

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new Errorhandler(
            `Role:${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };