import React,{useEffect} from 'react';
import Header from './components/layout/Header/Header'
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import WebFont from "webfontloader";
import Home from "./components/Home/Home"
import "./App.css"
import ProductDetails from "./components/Product/ProductDetails"
import Products from "./components/Product/Products"
import Search from "./components/Product/Search"

function App() {
    useEffect(() => {
        WebFont.load({
          google: {
            families: ["Roboto", "Droid Sans", "Chilanka"],
          },
        })},[])
  return (
      <Router>
      <Header />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        </Switch>
      </Router>  
  )
}

export default App;
