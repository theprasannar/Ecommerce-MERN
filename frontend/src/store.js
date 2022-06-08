import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"

import {productReducer,productDetailsReducer,newReviewReducer} from "./reducers/productReducer"
import { userReducer,profileReducer,forgotPasswordReducer} from "./reducers/userReducer"
import {cartReducer} from "./reducers/cartReducer"
import {newOrderReducer,myOrderReducer,orderDetailsReducer} from "./reducers/orderReducer"
const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user: userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
        shippingInfo:localStorage.getItem('shippinginfo') ? JSON.parse(localStorage.getItem('shippinginfo')): {},
    }
};

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;