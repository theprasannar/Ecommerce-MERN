import React,{Fragment,useEffect} from 'react'
import './UserProfile.css'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../../actions/userAction'
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

const UserProfile = ({history}) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated === false) {
        history.push("/login");
      }
    }, [history, isAuthenticated]);
  return (
   <> 
     {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}     
   </>
  )
}

export default UserProfile