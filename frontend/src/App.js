import React,{useEffect} from 'react';
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
function App() {

  const {isAuthenticated,user} = useSelector(state => state.user)
    useEffect(() => {
        WebFont.load({
          google: {
            families: ["Roboto", "Droid Sans", "Chilanka"],
          },
        })
      },[])
      
  return (
      <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
        <Switch>
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
        </Switch>
      </Router>  
  )
}

export default App;
