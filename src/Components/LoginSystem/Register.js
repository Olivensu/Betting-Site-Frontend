import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';

const Register = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const queryParams = new URLSearchParams(window.location.search);
    const referralCode = queryParams.get('ref');
    const [
      createUserWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [errorPass, setErrorPass] = useState('');
  
    let signInError;
      if(error){
        signInError = <p className='text-red-500'>{error?.message}</p>
      }

      if(user){
        history('/')
      }
  
      if(loading ){
        return <Loading></Loading>
      }

      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrorPass('');
      };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (password.length < 7) {
          setErrorPass('Password must be at least 7 characters long.');
          return;
        }
        

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`,{
              name,email,phone,password,confirmpassword, referralCode: referralCode
            })
            .then(res=>{
                if(res.data === "exist"){
                    // history("/", {state:{id:email}})
                    alert("User already registered")
                }
                else if(password !== confirmpassword){
                  alert("Password are not match")
              }
                else{
                  console.log(user)
                    createUserWithEmailAndPassword(email, password);
                    console.log("registered successfully")
                }
            })
        }
        catch(e){
            alert("Wrong Details")
            console.log(e)
        }
        
    }

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleShowConfirmPassword = () => {
      setConfirmShowPassword(!showConfirmPassword);
    };
    
    return (
        <div>
                {/* <div className='top-banner h-72 bg-[#0A1F3C]'>
                <h1 className='text-5xl font-bold text-white text-center pt-24'>Registration</h1>
                <p className='text-accent pt-16 pl-16 text-xl font-bold'>HOME // Registration</p>
            </div> */}
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center md:w-2/3 lg:w-1/2 mx-auto py-16 md:my-16">
              <h1 className="text-black text-center font-bold mb-5 text-2xl md:text-3xl">
              Sign Up
              </h1>
    
              <form onSubmit={handleSubmit}>
                
                <input
                  type="text"
                  name='name'
                  placeholder="Type your name"
                  onChange={(e)=>{setName(e.target.value)}} required
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                <input
                  type="email"
                  name='email'
                  placeholder="Type your email"
                  onChange={(e)=>{setEmail(e.target.value)}} required
                  className="m-5 block mx-auto input w-full max-w-xs"
                />

                <input
                  type="number"
                  name='phone'
                  placeholder="Type your number"
                  onChange={(e)=>{setPhone(e.target.value)}} required
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                
                <div className='flex m-auto max-w-xs'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder="Type your password"
                  onChange={handlePasswordChange} required
                  className="m-5 mx-auto input w-full max-w-xs"
                />
                <button className='btn mt-5' type="button" onClick={handleShowPassword}>
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
                
                <div className='flex m-auto max-w-xs'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmpassword'
                  placeholder="Confirm Your Password" required
                  onChange={(e)=>{setConfirmpassword(e.target.value)}}
                  className="m-5 mx-auto input w-full max-w-xs"
                />
                <button className='btn mt-5' type="button" onClick={handleShowConfirmPassword}>
                {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
}
              </button>
                </div>
                <p className=''>Referral Code:</p>
  <input type="text" value={referralCode || ''} readOnly className="input input-bordered w-full max-w-xs" />
                {/* <label>Referral Code:</label>
        <input type="text" value={referralCode || ''} readOnly /> */}

                {signInError || errorPass}
                  
                <input
                  type="submit"
                  value="Submit"
                  className="m-5 btn-accent cursor-pointer text-white text-bold text-xl block mx-auto input w-full max-w-xs"
                />
                <p className='mb-3'>Continue to log in if you agree to - <Link to='/terms' className='text-blue-600'>Terms & Conditions</Link>
          </p>

                <Link className=' text-xl font-bold underline' to='/login'>Login Page</Link>
              </form>
              </div>

              
            
          </div>
            </div>
    );
};

export default Register;