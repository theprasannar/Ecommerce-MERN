import React,{useState,useEffect} from 'react'
import LockOpenIcon from "@material-ui/icons/LockOpen"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import LockIcon from "@material-ui/icons/Lock"
import {useSelector,useDispatch} from 'react-redux'
import {updatePassword,clearErrors} from '../../actions/userAction'
import './updatePassword.css'
import {useAlert} from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader'

const UpdatePassword = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert();
    const {error,isUpdated,loading} = useSelector(state => state.profile)

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const updatePasswordSubmit = (e) => {
        const myform = new FormData();
        myform.set("oldPassword",oldPassword)
        myform.set("newPassword",newPassword)
        myform.set("confirmPassword",confirmPassword)
        dispatch(updatePassword(myform))
  }

    useEffect(() => {
      if(error) {
        alert.error(error);
        dispatch(clearErrors);
      }
      if(isUpdated)
      {
        alert.success("Profile Updated Successfully");

       
        dispatch(({
            type:UPDATE_PASSWORD_RESET
        }))
      }
    },[dispatch,error,history,isUpdated]);
  
  return (
   <>
     {loading ? <Loader />:<>
       <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
            <h2 className="Heading">Update Profile</h2>
            <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="updatePassword">
                <VpnKeyIcon />
                <input 
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
                 />
            </div>
            <div className="updatePassword">
                <LockIcon />
                <input 
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                 />
            </div>
            <div className="updatePassword">
                <LockOpenIcon />
                <input 
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                 />
            </div>
            
                <input type="submit" value="Update" className="Btn" />
              </form>
             </div>
        </div>
   </>}
   </>
  )
}

export default UpdatePassword