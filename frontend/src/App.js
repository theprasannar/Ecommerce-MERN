import React,{useEffect,useState} from 'react';
import Header from './components/layout/Header/Header'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./components/Home/Home"
import "./App.css"
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search"
import LoginSignup from './components/User/LoginSignup';
import store from './store'
import {loadUser} from './actions/userAction'
import UserProfile from './components/User/UserProfile'
import {useSelector} from 'react-redux'
import UserOptions from './components/layout/Header/UserOptions'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdateProfle from './components/User/UpdateProfile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import ForgotPassword from './components/User/ForgotPassword.js'
import ResetPassword from './components/User/ResetPassword.js'
import Shipping from './components/Cart/Shipping.js'
import Cart from './components/Cart/Cart'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess.js'
import  MyOrders  from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js'
function App() {

  const {isAuthenticated,user} = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
 
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    if (window.location.href!=="http://localhost:3000/login")
    store.dispatch(loadUser());
    
    getStripeApiKey();
  }, []);

      
  return (
      <Router>
      {isAuthenticated && <UserOptions user={user} />}

      <Header />
   
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={LoginSignup}/>
        <ProtectedRoute exact path="/account" component={UserProfile}/>
        <ProtectedRoute exact path="/me/update" component={UpdateProfle}/>
        <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
        <Route exact path="/password/forget" component={ForgotPassword}/>
        <Route exact path="/password/reset/:token" component={ResetPassword}/>
        <Route exact path="/cart" component={Cart}/>
        <ProtectedRoute exact path="/shipping" component={Shipping}/>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <ProtectedRoute exact path="/success" component={OrderSuccess}/>
      <ProtectedRoute exact path="/orders" component={MyOrders}/>
      <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
      </Router>  
  )
}

export default App;
