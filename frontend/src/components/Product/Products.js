import React,{useEffect,useState} from 'react'
import "./products.css"
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors, getProduct} from "../../actions/productActions"
import {useAlert} from "react-alert"
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Products = ({match}) => {

const dispatch = useDispatch();
const [currentPage,setCurrentPage] = useState(1);

const {products,loading,error,productCount,resultPerPage} = useSelector(state => state.products)

const keyword = match.params.keyword;
useEffect(() =>{
    dispatch(getProduct(keyword,currentPage))
},[dispatch,keyword,currentPage])
    function handleChange(e,v)
    {
        setCurrentPage(v)
        console.log(e);
    }
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
       <div className="pagination">
       <Stack >
            <Pagination onChange={handleChange} count={
                productCount%resultPerPage==0 ? productCount/resultPerPage: parseInt(productCount/resultPerPage+1)
            } variant="outlined" shape="rounded" />
        </Stack>
       </div>
        </> 
        }
    </div>
  )
}

export default Products