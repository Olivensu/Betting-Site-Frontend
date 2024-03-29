import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Loading from '../Shared/Loading';
import axios from 'axios';

const UserProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userinfo, setUserinfo] = useState([]);
    const [withdraw, setWithdraw] = useState(0);
    const [number, setNumber] = useState(0);
    const [copySuccess, setCopySuccess] = useState(false);
    const logout = () => {
        signOut(auth);
      };

      const [depositeData, setDepositeData] = useState([]);
      const [withdrawData, setWithdrawData] = useState([]);
    // const [status, setStatus] = useState('Submitted');
    // const [amount, setAmount]= useState(0);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/depositHistory`)
        .then(response =>{
          setDepositeData(response.data);
        })
        .catch(err =>{
            console.log(err);
        })

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/withdrawHistory`)
        .then(response =>{
          setWithdrawData(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[])
      useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=> setUserinfo(data))
      }, [user,userinfo])

      if(loading){
        return <Loading></Loading>
      }
      const code = user?.email;
const parts = code.split('@');
const maincode = parts[0];

      const registrationUrl = `https://x-trading.vercel.app/register?ref=${encodeURIComponent(maincode)}`;
      const filterWithdrawData = withdrawData.filter(data => user?.email===data.email)
      const filterDepositData = depositeData.filter(data => user?.email===data.email)

      const {_id,name, email,phone,deposite,isAdmin} = userinfo;

      const handleSubmit = async (e) =>{
        
        e.preventDefault();
        window.my_modal_4.close();
        if (deposite < withdraw || withdraw < 500) {
          alert('Withdraw less than your current amount or less than 500.');
          return;
        } 

        if(withdraw%500!==0){
          alert("You can only withdraw multiple of 500 ex:(500, 1000, 1500 2000, 2500, 3000, 3500) up to 10000")
          return;
        }

        const currentBalance = deposite - withdraw;

        // const updateDeposit = parseInt(surewindeposite) + parseInt(deposites)
        // const updatewinmoney = parseInt(surewinwinmoney) + parseInt(deposites)
        
        try {
          await axios.post(`${process.env.REACT_APP_API_BASE_URL}/withdrawHistory`, {
            name, email, phone:number, withdraw
          }).then(res=>{
            updateCorrentBalance(currentBalance)
            alert('Your withdraw request created successfully.');
          })
        }
        catch(err){
            alert("Wrong Details")
            console.log(err)
        }
      }

      const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = registrationUrl;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setCopySuccess(true);
      };

      const updateCorrentBalance = async (amount) =>{
        try {
          await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${email}`, {deposite:amount})
        .then(res=>{
          console.log('Amount updated successfully',amount);
        }) 
        .catch((error) => {
          console.error('Error updating status:', error);
        });
        } catch (error) {
          alert("Wrong Details")
          console.log(error)
        }
      }
      
      const handleWithDrawClose= ()=>{
        window.my_modal_4.close();
      }
      
    return (
        <div className='bg-base-200 m-auto pt-10'>
          <div className=' mx-5'>
            <div className='m-auto text-center'>
            <Link to='/depositeForm'><button  className='ml-2 btn btn-warning hover:bg-yellow-600 text-white'>Deposit</button></Link>
            {/* You can open the modal using ID.showModal() method */}
          <button className="btn btn-success ml-2 md:ml-5 hover:bg-green-700 mt-5 text-white"
            onClick={() => window.my_modal_4.showModal()}>WithDraw</button>
          <dialog id="my_modal_4" className="modal">
          <div className='modal-box w-11/12 max-w-5xl'>
          <button  onClick={handleWithDrawClose} className="btn float-right w-12 rounded-full btn-accent">X</button>
          <h3 className="font-bold text-center bg-lime-600 text-white py-3 rounded-xl  text-lg">Hurray!!! Withdraw your winning money...</h3>
            <form onSubmit={handleSubmit} className="">
                
              
              <div className='bg-sky-200 m-auto text-center py-8 mt-5 rounded-xl shadow-xl'>
                
                <label htmlFor="number">Nagad Number</label>
                <input
                  type="number"
                  name='number'
                  placeholder="Type your Nagad Number"
                  onChange={(e)=>{setNumber(e.target.value)}} 
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                <label htmlFor="deposite">Withdraw Amount</label>
                <input
                  type="number"
                  name='deposite'
                  placeholder="Type your withdraw amount"
                  onChange={(e)=>{setWithdraw(e.target.value)}} 
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                {/* <input
                  type="submit"
                  value="Submit"
                  className="btn w-full max-w-xs btn-success text-white"
                /> */}
              </div>
              <div>
      <br />
    </div>
    
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <input
                  type="submit"
                  value="Submit"
                  className="btn w-full btn-success text-white"
                />
              </div>
    </form>
          </div>
    
          </dialog>
            </div>
          {/* <Link to={isAdmin==='true'? '/dashboard' : ''}><button className='btn btn-secondary text-white'>Dashboard</button></Link> */}
          </div>
            <div className='p-5'>
            <img className='m-auto w-20 rounded-2xl' src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" />

            <div className='text-center'>
              <p className='text-xl my-3'><b>Id:</b> {_id}</p>
              <p className='text-xl my-3'><b>Name:</b> {name}</p>
              <p className='text-xl my-3'><b>Email:</b> {email}</p>
              <p className='text-xl my-3'><b>Phone:</b> {phone}</p>
              <p className='text-xl my-3'><b>Current Balance:</b> {deposite}</p>
            </div>

            
            </div>
            {
               user ? <div>
                {/* <Link className='text-white font-bold w-2/5 m-auto mb-5  btn block ms-5 bg-green-600 flex justify-center items-center hover:bg-green-800' onClick={logout}>WithDraw Balance</Link> */}
               
               </div>:<Link></Link>
            }
            {
                  user ? <Link className='text-white w-2/5 m-auto  btn block ms-5 bg-red-600 flex justify-center items-center hover:bg-red-800' onClick={logout}>Sign Out</Link>: <Link className='text-white btn-primary btn btn-sm block ms-5 w-2/5  m-auto  flex justify-center items-center' to='/login'>Login</Link>
                }
                <div className='h-2 bg-gray-300 w-2/3 m-auto rounded-full mt-5'></div>

<div className='m-auto text-center'>
  <p className='my-5 text-xl font-bold'>Share your reference link and and get 50tk for every user!!!</p>
            <input className='text-center m-auto input border-sky-500 ' type="text" value={registrationUrl} readOnly />
        <button className='m-auto text-center btn bg-orange-500 ml-5' onClick={copyToClipboard}>
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
            </div>

            <div className=' p-7 my-10 bg-lime-100'> 
            <div className='overflow-y-auto shadow-xl max-h-96 bg-sky-100 rounded-xl p-2'>
              <p className='text-center text-xl font-bold my-2'>Deposit History</p>
      <table className='table'>
        <thead>
          <tr className=''>
            <th>Name</th>
            <th>deposite</th>
            <th>date</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {filterDepositData?.map(number => (
            <tr className="hover" key={number._id}>
              <td>{number.name}</td>
              <td>{number.deposite}</td>
              <td>{number.date}</td>
              <td>{number.request}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='overflow-y-auto mt-10 max-h-96 bg-sky-100  rounded-xl p-2'>
      <p className='text-center text-xl font-bold my-2'>Withdraw History</p>
      <table className='table'>
        <thead>
          <tr className=''>
            <th>Name</th>
            <th>deposite</th>
            <th>date</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {filterWithdrawData?.map(number => (
            <tr className="hover" key={number._id}>
              <td>{number.name}</td>
              <td>{number.withdraw}</td>
              <td>{number.date}</td>
              <td>{number.request}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
            </div>
        </div>
    );
};

export default UserProfile;