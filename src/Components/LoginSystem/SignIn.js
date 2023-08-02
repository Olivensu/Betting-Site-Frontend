import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state?.from?.pathname);

    const from =location.state?.from?.pathname ||  "/"; 
    useEffect(()=>{
      if(user){
        // console.log(user);
        navigate(from, {replace: true})
      }
    },[from, navigate,user])
    
let signInError;
if(error){
  signInError = <p className='text-red-500'>{error?.message}</p>
}

if(loading ){
  return <Loading></Loading>
}
const handleShowPassword = () => {
  setShowPassword(!showPassword);
};
    const handleSubmit = async (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(email, password)
        // try {
        //   await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`,{
        //         email,password
        //     })
        //     .then(res=>{
        //         if(res.data === "exist"){
        //             // console.log("Login successful")
        //         }
        //         else{
        //             // alert("User email or password is wrong")
        //             // console.log("Login invalid")
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
        //     // alert("Wrong Details")
        //     console.log(e)
        // }
        
    }
    return (
        <div>
                {/* <div className='top-banner h-72 bg-[#0A1F3C]'>
                <h1 className='text-5xl font-bold text-white text-center pt-24'>Sign In</h1>
                <p className='text-accent pt-16 pl-16 text-xl font-bold'>HOME // Sign In</p>
            </div> */}
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center md:w-2/3 lg:w-1/2 mx-auto py-16 md:my-16">
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
                
                <div className='flex m-auto max-w-xs'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder="Type your password"
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="m-5  mx-auto input w-full  max-w-xs"
                /><button className='btn mt-5' type="button" onClick={handleShowPassword}>
                {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
}
              </button>
                </div>
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