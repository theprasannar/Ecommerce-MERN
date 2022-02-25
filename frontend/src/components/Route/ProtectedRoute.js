import React,{Fragment} from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'


const ProtectedRoute = ({component:Component, ...rest}) => {

const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
        {!loading && (
            <Route 
            {...rest} 
            render={() => { 
                if(!isAuthenticated)
                {
                    return <Redirect to='/login'/>
                }
                return <Component />
            }}
       
            />

        ) }
    </Fragment>
  )
}

export default ProtectedRoute