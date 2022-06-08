import React,{Fragment} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './Cart.css'
import CartItemCard from './CartItemCart.js'
import {addItemsToCart,removeItemsFromCart} from '../../actions/cartActions'
import RemoveShoppingCartIcon  from '@material-ui/icons/RemoveShoppingCart';
import {Link} from 'react-router-dom'
const Cart = ({history}) => {

    const dispatch = useDispatch()
    const {cartItems} = useSelector((state) => state.cart)
    console.log(cartItems)

    const increaseQuantity = (id, quantity,stock) => {
        const newQty = quantity + 1 
        console.log(id)
        console.log(quantity)
        console.log(stock)
        if(quantity>=stock)
            return
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if(quantity<=1)
        return;

        dispatch(addItemsToCart(id,newQty))
    }
    const deleteCartItem = (id) =>{
        dispatch(removeItemsFromCart(id))
    }

    const checkOutHandler = () => {
        history.push("./login?redirect=shipping")
    }
  return (
    <Fragment>
        {cartItems.length === 0 ? <div className="NoItem"> 
            <RemoveShoppingCartIcon />
            <h3>No Item In Cart</h3>
           <Link to="/products">View Products</Link>
        </div>:<Fragment>
    <div className="cartPage">
        <div className="Header">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
            {cartItems && cartItems.map((item)=>(
                <div className="cardContainer">
                <CartItemCard item={item} key={item.product} deleteCartItem={deleteCartItem}/>
                    <div className="cardInput">
                        <button onClick={() =>{increaseQuantity(item.product,item.quantity,item.stock)}}>
                        +</button>

                        <input readOnly value={item.quantity}></input>
                        <button onClick={()=>{decreaseQuantity(item.product,item.quantity,item.stock)}}>-</button>
                     </div>
                     <p className="subtotal">{` ₹${item.price * item.quantity}`}</p>
                </div>
            ))}
            <div className="cartTotal">
                <div></div> 
                <div className="cartTotalBox">
                    <p>Grand Total</p>
                    <p>{cartItems.reduce((total, item) => total + item.price*item.quantity,0
                    )}</p>
                </div>
                <div></div>
                <div className="checkoutBtn">
                    <button onClick={checkOutHandler}>Checkout</button>
                </div>
            </div>
        </div>
 
</Fragment>}
    </Fragment>
  )
}

export default Cart