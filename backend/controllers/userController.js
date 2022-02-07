const User = require('../models/userModel')
const  Errorhandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail.js')
const crypto = require('crypto')

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

exports.forgotPassword = catchAsyncErrors( async (req, res, next)=>{
    
    //first find the user 
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        retrun (next(new Errorhandler("No user found",404)))
    }
    //get apssword token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is \n\n${resetPasswordURL} \n\n If you have not requested reset password then ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message: message
        })
        res.status(200).json({
            success: true,
            message:`Email sent to ${user.email}`
        })

    }
    catch(e) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new Errorhandler(e.message,500))
    }

})

//reset password 
exports.resetPassword = catchAsyncErrors( async (req, res, next) => {
    
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user) {
        return next(new Errorhandler("Reset Password Token is not valid",400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new Errorhandler("Passwords do not match",400))
    }
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
   sendToken(user,200,res);
})