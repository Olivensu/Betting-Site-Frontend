import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from './Shared/Loading';

const DepositeForm = () => {
    const history = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [txnID, setTxnID] = useState('');
    const [deposite, setDeposite] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('')

  useEffect(() => {
    async function fetchImageUrl() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getPosterImage`); // Replace with your backend route
        setImageUrl(response.data.url);
        console.log(response.data.url);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    }

    fetchImageUrl();
  }, [imageUrl]);

  const [getInfo, setGetInfo] = useState('')
//   console.log(photos,'olive');

useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getinfo`)
    .then(res=>{
        console.log(res.data.info)
        setGetInfo(res.data.info)
    }).catch(err=>{
        console.log(err);
    })
},[])
//   useEffect(()=>{
//     axios.get(`${process.env.REACT_APP_API_BASE_URL}/getPosterImage`)
//     .then(res=>{
//         console.log(res.data.url)
//         setImage(res.data.url)
//     })
//     .catch(err => console.log(err));
// },[image])
  
    if(loading){
      return <Loading></Loading>
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(deposite<500){
          alert('Deposit amount should be more than 500.')
          return
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/depositHistory`,{
              name,email:user?.email,phone,deposite,txnID
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
          
          {/* {imageUrl ? <img src={`${imageUrl}`} alt="Latest Uploaded" /> : <p>No image found</p>} */}
                {/* <div className='top-banner h-72 py-20 bg-[#0A1F3C]'>
                <h1 className='text-5xl bg-lime-400 font-bold text-white text-center bg-opacity-50'>Recharge</h1>
                <p className='text-white mt-16 pl-16 text-xl font-bold bg-red-400 bg-opacity-50'>HOME // Recharge</p>
            </div> */}
                <div>
            {/* <div className="p-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              <img className="ms-20 w-[350px]" src={nsuLogo} alt="" />
            </div> */}
            <div className="bg-yellow-200 text-center lg:w-1/2 mx-auto py-16 lg:my-5">
            {/* {image && <img className='m-auto my-5' src={image} alt="Uploaded Poster" />} */}
            <p className='text-xl mb-10 '>{getInfo}</p>
              <h1 className="text-black text-center font-bold mb-5 text-3xl">
              Deposit
              </h1>
              <p className='text-red-600 font-bold'>Deposit amount should be more than 500.</p>
    
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
                  value={user?.email}
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
                  type="text"
                  name='txnid'
                  placeholder="Type your TxnID"
                  onChange={(e)=>{setTxnID(e.target.value)}}
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