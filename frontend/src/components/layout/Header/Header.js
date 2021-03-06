import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,Typography} from '@material-ui/core'
import {ShoppingCart,Search,Person} from '@material-ui/icons'
import logo from '../../../assets/logo.png'
import useStyles from './style';
import "./Header.css"
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Header = () => {
  const classes = useStyles()
  const {cartItems} = useSelector(state => state.cart)
  const {isAuthenticated,user} = useSelector(state => state.user)
  return( <div>
     <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="30px" className={classes.image} /> 
          </Typography>
          <div className={classes.grow} />
        
              <ul >
                <li><a href="http://localhost:3000">Home</a></li>
                <li><a href="http://localhost:3000/products">Products</a></li>
                <li><a>About</a></li>
              </ul>
    
            <div className={classes.button}>
              <IconButton color="inherit">
              <Link to="/search" >  <Search style={{color: '#484848'}}/>  </Link>
              </IconButton>
              </div>
              <div className={classes.button}>
              <IconButton aria-label="Show cart items" color="inherit">
                <Badge badgeContent={cartItems.length} color="secondary">
              <Link to="/cart" >  <ShoppingCart style={{color: '#484848'}}/> </Link>
                </Badge>
              </IconButton>
          </div>
         {!isAuthenticated ? <div className={classes.button}>
            <IconButton  color="inherit">
            <a href="http://localhost:3000/login">   <Person /> </a>
            </IconButton>
          </div>:<button className="profilebtn">{user.name.slice(0,1).toUpperCase()}</button>}
        </Toolbar>
      </AppBar>
  </div>)
};

export default Header;