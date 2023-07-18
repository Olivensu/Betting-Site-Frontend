import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DepositeForm = () => {
    const history = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [deposite, setDeposite] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/depositHistory",{
              name,email,phone,deposite
            })
            .then(res=>{
                console.log(res);
                history('/')
                alert('Deposit Submitted successfully')
            })
        }
        catch(e){
            alert("Wrong Details")
            console.log(e)
        }
        
    }
    return (
        <div>
                <div className='top-banner h-72 py-20 bg-[#0A1F3C]'>
                <h1 className='text-5xl bg-lime-400 font-bold text-white text-center bg-opacity-50'>Recharge</h1>
                <p className='text-white mt-16 pl-16 text-xl font-bold bg-red-400 bg-opacity-50'>HOME // Recharge</p>
            </div>
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center md:w-2/3 lg:w-1/2 mx-auto py-16 my-16">
              <h1 className="text-black text-center font-bold mb-5 text-3xl">
              Recharge in Your account
              </h1>
    
              <form onSubmit={handleSubmit}>
                
                <input
                  type="text"
                  name='name'
                  placeholder="Type your name"
                  onChange={(e)=>{setName(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                <input
                  type="email"
                  name='email'
                  placeholder="Type your email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />

<input
                  type="number"
                  name='phone'
                  placeholder="Type your number"
                  onChange={(e)=>{setPhone(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                
                
                <input
                  type="number"
                  name='deposite'
                  placeholder="Deposite Amount"
                  onChange={(e)=>{setDeposite(e.target.value)}}
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                  
                <input
                  type="submit"
                  value="Submit"
                  className="m-5 btn-accent cursor-pointer text-white text-bold text-xl block mx-auto input w-full max-w-xs"
                />
              </form></div>

              
            
          </div>
            </div>
    );
};

export default DepositeForm;