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
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
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
            await axios.post("http://localhost:5000/register",{
              name,email,phone,password,confirmpassword
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
    return (
        <div>
                <div className='top-banner h-72 bg-[#0A1F3C]'>
                <h1 className='text-5xl font-bold text-white text-center pt-24'>Registration</h1>
                <p className='text-accent pt-16 pl-16 text-xl font-bold'>HOME // Registration</p>
            </div>
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center md:w-2/3 lg:w-1/2 mx-auto py-16 my-16">
              <h1 className="text-black text-center font-bold mb-5 text-3xl">
              Registration Our Website
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
                
                <input
                  type="password"
                  name='password'
                  placeholder="Type your password"
                  onChange={handlePasswordChange} required
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                
                <input
                  type="password"
                  name='confirmpassword'
                  placeholder="Type your confirmpassword" required
                  onChange={(e)=>{setConfirmpassword(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />

                {signInError || errorPass}
                  
                <input
                  type="submit"
                  value="Submit"
                  className="m-5 btn-accent cursor-pointer text-white text-bold text-xl block mx-auto input w-full max-w-xs"
                />

                <Link className=' text-xl font-bold underline' to='/login'>Login Page</Link>
              </form></div>

              
            
          </div>
            </div>
    );
};

export default Register;