import React,{useRef,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from "@material-ui/icons/Face";
import {useSelector,useDispatch} from 'react-redux'
import {login,clearErrors,register} from '../../actions/userAction'
import './LoginSignup.css'
import {useAlert} from 'react-alert'
import Loader from '../layout/Loader/Loader'

const LoginSignup = ({history,location}) => {

  const dispatch = useDispatch()
  const loginTab= useRef(null);
  const registerTab= useRef(null);
  const switcherTab = useRef(null);

  const alert = useAlert();

  const {error,loading,isAuthenticated} = useSelector(state => state.user)

  const[loginEmail,setLoginEmail] = useState("")
  const[loginPassword,setLoginPassword] = useState("")

  const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png")


  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
    const reader = new FileReader();
    reader.onload = () => {
          if(reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            }
          };
      reader.readAsDataURL(e.target.files[0]);
        } 
    else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
  };
    

  const registerSubmit = (e) => {
      e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
      };
    

    const redirect = location.search ? location.search.split('=')[1]:'/account'
    console.log(location.search);
    useEffect(() => {
      if(error) {
        alert.error(error);
        dispatch(clearErrors);
      }

      if(isAuthenticated)
      {
        history.push(redirect)
      }
    },[dispatch,error,history,isAuthenticated,redirect]);

    //login submit handler
    const loginSubmit = (e) => {
      e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }

    //switching forms
    const switchTab = (e,tab) => {
        if(tab === "login")
        {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        else
        {
            switcherTab.current.classList.remove("shiftToNeutral")
            switcherTab.current.classList.add("shiftToRight")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }

  return (
    <>
      {loading ? <Loader /> :<>
        <div className="Container">
            <div className="LoginSignUpBox">
            <div>
                <div className="toggle">
                    <p onClick={(e) => switchTab(e,"login")}>Login</p>
                    <p onClick={(e) => switchTab(e,"Register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
                <MailOutlineIcon />
                <input 
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                 />
            </div>
            <div className="loginPassword">
                <LockOpenIcon />
                <input 
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                 />
            </div>
            <Link to="/password/forget">Forgot Pasword ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
            
            </form>

            {/*------------ Registration Form --------------------*/}
            <form
                className="signupForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signupBtn" />
              </form>
            </div>
        </div>
    </>}
    </>
  )
}

export default LoginSignup