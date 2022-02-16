import React,{Fragment,useEffect} from 'react';
import {KeyboardArrowDown} from '@material-ui/icons'
import "./Home.css"
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData.js"
import {clearErrors, getProduct} from "../../actions/productActions"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader'
import {useAlert} from "react-alert"
const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();

  const {loading,error,products,productCount} = useSelector(state => state.products);
  useEffect(() => {
    if(error) {
      if(error) {
        alert.error(error)
        dispatch(clearErrors())
    }
    }
    dispatch(getProduct());
  },[dispatch,alert,error])

  return(
    <Fragment>
      {loading ? <Loader /> :
      <Fragment>
      <MetaData title="Home" />
    <div className="banner">
      <p>Welcome to E-CART</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>

      <a href="#container">
        <button>
          <KeyboardArrowDown />
        </button>
      </a>
    </div>
    <h2 className="homeHeading">Featured Products</h2>
    <div className="container" id="container">
    {products && products.map(product =>(
      <ProductCard product={product} />
    ))}
    </div>

  </Fragment>}
    </Fragment>
  )
};

export default Home;
