const ErrorHandler = require('../utils/errorhandler')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    //mongoDB duplicate key error
    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    //wrong jwt Error
    if(err.name === "JsonWenTokenError")
    {
        const message = "json web token is invalid"
        err = new ErrorHandler(message,400);
    }
    //wrong jwt Error
    if(err.name === "TokenExpiredError")
    {
        const message = "json web token is expired"
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message: err.message
    })
}