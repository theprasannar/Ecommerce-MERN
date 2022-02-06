const User = require('../models/userModel')
const  Errorhandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
//Register User 
exports.registerUser = catchAsyncErrors( async (req, res,next) => {
    const {name,email,password} = req.body

    const user = await User.create({
        name,
        email, 
        password,
        avatar:{
            public_id:"this is id",
            url:"this is url"
        }
    });
    sendToken(user,201,res);
})

exports.loginUser = catchAsyncErrors( async (req, res, next) => {
    const {email,password} = req.body

    if(!email || !password) {
        return next(new Errorhandler("Please Enter email and password",400))
    }
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new Errorhandler("Invalid email or password",401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new Errorhandler("Invalid email or password",401))
    }
    sendToken(user,200,res);

})

exports.logout = catchAsyncErrors( async (req, res, next) => {

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
})