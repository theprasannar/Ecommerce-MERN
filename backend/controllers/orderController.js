const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//Create NEw Order 
exports.newOrder = catchAsyncErrors ( async (req, res)=>{
   
    const {shippingInfo,OrderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    const order = await Order.create({
        shippingInfo,
        OrderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:user.req._id
    })


    res.status(201).json({
        success: true,
        order
    })
})

//get a single order
exports.getSingleOrder = catchAsyncErrors( async (req, res)=>{

    //find from order that mathches wih current user
    const order = await Order.findById(req.params.id).populate("user, name email");

    if(!order){
        return next(new ErrorHandler("No order found",404));
    }
    res.status(201).json({
        success: true,
        order
    })
})

//Logged in user's ORder
exports.myOrder = catchAsyncErrors( async (req, res)=>{

    //find from order that mathches wih current user
    const orders = await Order.find(req.user._id);

    res.status(201).json({
        success: true,
        orders
    })
})


//All orders for admin
exports.getAllOrders = catchAsyncErrors( async (req, res)=>{

    //find from order that mathches wih current user
    const orders = await Order.find();

    res.status(201).json({
        success: true,
        orders
    })
    const totalAmount = 0;

    orders.forEach(order => {
        totalAmount+=order.totalPrice
    })

    res.status(201).json({
        success: true,
        totalAmount,
        orders
    })
})



exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
      //reference of Product
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });