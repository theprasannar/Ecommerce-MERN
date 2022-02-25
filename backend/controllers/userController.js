const User = require('../models/userModel')
const  Errorhandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail.js')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
const fs = require('fs')
const path = require('path')

//----------------------------Register User 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  var uploadStr = 'data:image/jpeg;base64,' + req.body.avatar;
  const myCloud = await cloudinary.v2.uploader.upload(uploadStr, {
    overwrite: true,
        invalidate: true,
        width: 810, height: 456, crop: "fill"
  });

  console.log(req.body.avatar.path)
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});


//-------------------------------loginUser------------------------
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

//---------------Logout------------------------
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


//-----------------------------Forgot Password----------
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

    const resetPasswordURL = `http://localhost:3000/password/reset/${resetToken}`

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


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});



//const userDetails

exports.getUserDetails =  catchAsyncErrors( async (req, res, next) => {
    //during login user will be stored in req.user
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user: user
    })
})


//update USer Details
exports.updateUserDetails = catchAsyncErrors( async (req, res, next)=>{

    const {email,name} = req.body;
    const newUserData = {
        name: name,
        email: email
    }
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);
  
      const imageId = user.avatar.public_id;
  
      await cloudinary.v2.uploader.destroy(imageId);
  
    }
})

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });

  // Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`)
      );
    }
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  // update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  
  // Delete User --Admin
  exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
    await user.remove();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });