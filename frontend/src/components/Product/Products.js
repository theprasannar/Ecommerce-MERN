import React,{useEffect,useState} from 'react'
import "./products.css"
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProduct} from "../../actions/productActions"
import {useAlert} from "react-alert"
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = ({match}) => {

const dispatch = useDispatch();
const alert = useAlert();

const [currentPage,setCurrentPage] = useState(1);
const [price, setPrice] = useState([0, 50000]);
const [category, setCategory] = useState("");



const {products,loading,error,resultPerPage,filteredCount} = useSelector(state => state.products)

const keyword = match.params.keyword;

let Count = filteredCount;

    useEffect(() =>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
    dispatch(getProduct(keyword,currentPage,price,category))
    },[dispatch,keyword,currentPage,price,category,alert,error])

    function handleChange(e,v)
    {
        setCurrentPage(v)
        console.log(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };

  return (
    <div >
        {loading ? <Loader />:
        <>
            <h2 className="heading">Products</h2>
            <div className="productList">
                {products && products.map(product =>(
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="Filter">
                    <Typography>Price</Typography>
                    <Slider 
                         value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={50000}
                    />
                     <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                    <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                        >
                        {category}
                    </li>
              ))}
            </ul>

            </div>
       <div className="pagination">
       <Stack >
            <Pagination onChange={handleChange} count={
                Count%resultPerPage===0 ? Count/resultPerPage: parseInt(Count/resultPerPage+1)
            } variant="outlined" shape="rounded" />
        </Stack>
       </div>
        </> 
        }
    </div>
  )
}

export default Products