import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const AdminRoute = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const [userinfo, setUserinfo] = useState('true');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=> setUserinfo(data.isAdmin))
      }, [])

    
      if(loading && !userinfo){
        return <Loading></Loading>
      }
    if(userinfo !== 'true'){
        return <Navigate to='/login' state={{from: location}}></Navigate>
    }
    return children;
};

export default AdminRoute;