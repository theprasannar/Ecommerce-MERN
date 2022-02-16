import React,{useEffect} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './productDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProductDetails} from "../../actions/productActions"
import "./productDetails.css"
import {useAlert} from "react-alert"
import Loader from '../layout/Loader/Loader'
import { Rating } from "@material-ui/lab";

const ProductDetails = ({match}) => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector(state => state.productDetails)


    useEffect(() =>{ 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id,alert,error])

    const options = {
        edit: false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value: product.ratings,
        isHalf:true
      };
    
  return(
   <>
       {loading? <Loader />:
        <>
    <div className="ProductDetails">
      <div>
      <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
            </Carousel>
      </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{product.name}</h2>
          <p>Product # {product._id}</p>
        </div>
        <div className="detailsBlock-2">
          <Rating {...options} />
          <span className="detailsBlock-2-span">
            {" "}
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button>-</button>
              <input readOnly type="number" value={0}/>
              <button >+</button>
            </div>
            <button
              disabled={product.Stock < 1 ? true : false}
             
            >
              Add to Cart
            </button>
          </div>

          <p>
            Status:
            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
              {product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description : <p>{product.description}</p>
        </div>

        <button  className="submitReview">
          Submit Review
        </button>
      </div>
    </div>

    <h3 className="reviewsHeading">REVIEWS</h3>

   
  </>}
       
   </>
  )
};

export default ProductDetails;
