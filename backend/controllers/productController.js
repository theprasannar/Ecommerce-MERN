const Product = require('../models/productModel')
const ErrorHander = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require("../utils/apifeatures")
//createproduct --admin

exports.createProduct = catchAsyncErrors(
  async (req,res,next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product: product
    })
}
)

//get All products
exports.getAllProducts = catchAsyncErrors (async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
        const products = await apiFeature.query; //returned clasds is APifeature so we can use methods of that class 
        res.status(200).json({
            success: true,
            products: products,
            productCount:productCount
        })
})

exports.updateProduct = catchAsyncErrors( async (req, res, next) => {

        let product = await Product.findById(req.params.id);

        if (!product) {
          return next(new ErrorHander("Product not found", 404));
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
        
          res.status(200).json({
            success: true,
            product,
          });

})

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
        const product = await Product.findById(req.params.id);
  
        if (!product) {
          return next(new ErrorHander("Product not found", 404));
        }
        await product.remove();
        res.status(200).json({
          success: true,
          message: "Product Delete Successfully",
        });

  })

  exports.getProductDetails = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
  