import React,{useRef,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from "@material-ui/icons/Face";
import {useSelector,useDispatch} from 'react-redux'
import {updateProfile,clearErrors,loadUser} from '../../actions/userAction'
import './UpdateProfile.css'
import {useAlert} from 'react-alert'
import {Redirect} from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader'


const UpdateProfile = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const {user} = useSelector(state => state.user)
    const {error,isUpdated,loading} = useSelector(state => state.profile)

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
          if(reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
            }
          };
      reader.readAsDataURL(e.target.files[0]);
        
 
  };
    

  const updateProfileSubmit = (e) => {
      e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };
    

    useEffect(() => {
        if(user)
        {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
      if(error) {
        alert.error(error);
        dispatch(clearErrors);
      }
      if(isUpdated)
      {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
       
        dispatch(({
            type:UPDATE_PROFILE_RESET
        }))
      }
    },[dispatch,error,history,user,isUpdated]);
  
  return (
   <>
       <div className="updateProfileContainer">
            <div className="updateProfileBox">
            <h2 className="profileHeading">Update Profile</h2>
            <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input type="submit" value="Update" className="signupBtn" />
              </form>
             </div>
        </div>
   </>
  )
}

export default UpdateProfile