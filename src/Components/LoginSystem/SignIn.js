import axios from 'axios';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const SignIn = () => {

    const history = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);

    if(user){
      history('/')
    }
    console.log(user);
    
let signInError;
if(error){
  signInError = <p className='text-red-500'>{error?.message}</p>
}

if(loading ){
  return <Loading></Loading>
}

    const handleSubmit = async (e) =>{
        // e.preventDefault();
        // signInWithEmailAndPassword(email, password)
        // try {
        //   await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`,{
        //         email,password
        //     })
        //     .then(res=>{
        //         if(res.data === "exist"){
        //             console.log("Login successful")
        //         }
        //         else{
        //             alert("User email or password is wrong")
        //             console.log("Login invalid")
        //         }
        //     })
        //   // const res= await fetch("${process.env.REACT_APP_API_BASE_URL}/login", {
        //   //   method: "POST",
        //   //   headers: {
        //   //     "Content-Type": "application/json", // Specify that you're sending JSON data
        //   //   },
        //   //   body: JSON.stringify({email,password}), // Convert the data object to a JSON string
        //   // });

        //   // const data = res.json()
        //   // console.log(data);

        //   // if(data){
        //   //           history("/")
        //   //           console.log("Login successful")
        //   //       }
                
        //   //       else{
        //   //           alert("User email or password is wrong")
        //   //           console.log("Login invalid")
        //   //       }
            
        // }
        // catch(e){
        //     alert("Wrong Details")
        //     console.log(e)
        // }
        
    }
    return (
        <div>
                <div className='top-banner h-72 bg-[#0A1F3C]'>
                <h1 className='text-5xl font-bold text-white text-center pt-24'>Sign In</h1>
                <p className='text-accent pt-16 pl-16 text-xl font-bold'>HOME // Sign In</p>
            </div>
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center md:w-2/3 lg:w-1/2 mx-auto py-16 my-16">
              <h1 className="text-black text-center font-bold mb-5 text-3xl">
                Login Our Website
              </h1>
    
              <form method='POST' onSubmit={handleSubmit}>
                
                <input
                  type="email"
                  name='email'
                  placeholder="Type your email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                
                <input
                  type="password"
                  name='password'
                  placeholder="Type your password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                  {signInError}
                <input
                  type="submit"
                  value="Submit"
                  className="m-5 btn-accent cursor-pointer text-white text-bold text-xl block mx-auto input w-full max-w-xs"
                />
                <p className='mb-3'>Forget Password? - <Link className='text-red-600 font-semibold' to='/forgetPass'>Click here.</Link></p>
                <Link className=' text-xl font-bold underline' to='/register'>Register Page</Link>
              </form></div>
            
          </div>
            </div>
    );
};

export default SignIn