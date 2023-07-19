import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loading from '../Shared/Loading';

const UserProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userinfo, setUserinfo] = useState([]);
    const logout = () => {
        signOut(auth);
      };
      useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=> setUserinfo(data))
      }, [])

      if(loading){
        return <Loading></Loading>
      }

      const {_id,name, email,phone,deposite,isAdmin} = userinfo;
      
       
      
    return (
        <div className='bg-base-200 m-auto py-16'>
          <div className='flex justify-between mx-10'>
            <Link to='/depositeForm'><button  className='btn btn-warning hover:bg-yellow-600 text-white'>Recharge</button></Link>
          <Link to={isAdmin==='true'? '/dashboard' : ''}><button className='btn btn-secondary text-white'>Dashboard</button></Link>
          </div>
            <div className='flex justify-center p-10'>
            <img className='w-52 rounded-2xl' src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" />

            <div className='ml-12'>
              <p className='text-xl my-3'><b>Id:</b> {_id}</p>
              <p className='text-xl my-3'><b>Name:</b> {name}</p>
              <p className='text-xl my-3'><b>Email:</b> {email}</p>
              <p className='text-xl my-3'><b>Phone:</b> {phone}</p>
              <p className='text-xl my-3'><b>Current Balance:</b> {deposite}</p>
            </div>
            </div>
            {
                  user ? <Link className='text-white w-2/5 m-auto  btn block ms-5 bg-red-600 flex justify-center items-center hover:bg-red-800' onClick={logout}>Sign Out</Link>: <Link className='text-white btn-primary btn btn-sm block ms-5 w-2/5  m-auto  flex justify-center items-center' to='/login'>Login</Link> 
                }
        </div>
    );
};

export default UserProfile;