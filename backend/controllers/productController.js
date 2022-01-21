const Product = require('../models/productModel')

//createproduct --admin
exports.createProduct = async (req,res,next) => {
    try
   { const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product: product
    })}
    catch (err)
    { 
        res.json({success:false,err:err.message})
    }
}

//get All products
exports.getAllProducts = async (req, res) => {
    try
    {
        const products = await Product.find()
        res.status(200).json({
            success: true,
            products: products
        })

    }
    catch (err)
    { 
        res.json({success:false,err:err.message})
    }
   
}

exports.updateProduct = async (req, res, next) => {
    try
    {
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
      
    }catch (err)
    { 
        res.json({success:false, err:err.message})
    }
}

exports.deleteProduct = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
  
        if (!product) {
          return next(new ErrorHander("Product not found", 404));
        }
        await product.remove();
        res.status(200).json({
          success: true,
          message: "Product Delete Successfully",
        });
    }
   catch (err){
    res.json({success:false, err:err.message})
   }
  }

  exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  };
  