import React,{useEffect,useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './productDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProductDetails,newReview} from "../../actions/productActions"
import "./productDetails.css"
import {useAlert} from "react-alert"
import Loader from '../layout/Loader/Loader'
import { Rating } from "@material-ui/lab";
import {addItemsToCart} from '../../actions/cartActions'
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReviewCard from './ReviewCard'

const ProductDetails = ({match}) => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const {product,loading,error} = useSelector(state => state.productDetails)
    const {success, error:reviewError} = useSelector(state => state.newReview)


    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", match.params.id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    useEffect(() =>{ 
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(reviewError) {
          alert.error(reviewError)
          dispatch(clearErrors())
      }
      if(success) {
        alert.success("Review successfully submitted")
        dispatch({type: NEW_REVIEW_RESET})
      }
        dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id,alert,error,reviewError,success]);

    const options = {
       readOnly:true,
       precision: 0.5,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value: product.ratings,
        isHalf:true
      };

      const [quantity, setQuantity] = useState(1);

      const increaseQuantity = () =>{
        if(quantity>=product.stock) return;
          setQuantity((prevVal)=>{
            return prevVal + 1;
          })
      }
      const decreaseQuantity = () =>{
        if(quantity <= 1) return;
        setQuantity((prevVal)=>{
          return prevVal - 1;
        })
      }
    
      const addToCartHandler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));
        alert.success("Item Added To Cart");
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
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity}/>
              <button onClick={increaseQuantity} >+</button>
            </div>
            <button
              disabled={product.stock === 0 ? true : false}
             onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>

          <p>
            Status:
            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
              {product.stock === 0 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description : <p>{product.description}</p>
        </div>

        <button onClick={submitReviewToggle}  className="submitReview">
          Submit Review
        </button>
      </div>
    </div>

    <h3 className="reviewsHeading">REVIEWS</h3>
    <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
   
  </>}
       
   </>
  )
};

export default ProductDetails;
