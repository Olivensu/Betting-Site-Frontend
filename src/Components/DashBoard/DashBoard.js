import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashBoard = () => {

  const [deposit, setDeposit] = useState([]);
  const [withdraw, setWithdraw] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/depositHistory`)
    .then(res=>{
      setDeposit(res.data)
    })
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/withdrawHistory`)
    .then(res=>{
      setWithdraw(res.data)
    })
  },[])

  const filterDeposite = deposit?.filter(deposit => deposit?.request === "Accepted")
  const filterWithdraw = withdraw?.filter(deposit => deposit?.request === "Accepted")

  console.log(filterDeposite)
  let totaldepositvalue = 0;
  let totalwithdrawvalue = 0;
  for (const user of filterDeposite) {
    totaldepositvalue += user.deposite;
  }
  for (const user of filterWithdraw) {
    totalwithdrawvalue += user.withdraw;
  }
  let remainingBalance = totaldepositvalue - totalwithdrawvalue;
  


    
    return (
      <div>
            <div className=''>
            <p className='text-3xl font-bold text-center my-10 text-yellow-600'>Dashboard</p>
            <div className='bg-purple-500 w-96 m-auto p-3 rounded-xl'>
            <p className='text-xl font-bold text-center my-3'>Total Deposited Balance {totaldepositvalue}</p>
            <p className='text-xl font-bold text-center my-3'>Total Withdraw Balance {totalwithdrawvalue}</p>
            <p className='text-xl font-bold text-center my-3'>Total Remaining Balance {remainingBalance}</p>
            </div>
            </div>
            <div className='grid lg:grid-cols-3 m-10 justify-items-center gap-12'>
              <Link to='/dashboard/user'><p className='bg-sky-300 w-80 text-2xl font-bold text-gray-600 text-center py-10 rounded-2xl cursor-pointer'>Users info</p></Link>
              <Link to='/dashboard/rechargerequest'><p className='bg-sky-300 w-80 text-2xl font-bold text-gray-600 text-center py-10 rounded-2xl cursor-pointer'>Recharge Request</p></Link>
              <Link to='/dashboard/withdrawrequest'><p className='bg-lime-300 w-80 text-2xl font-bold text-gray-600 text-center py-10 rounded-2xl cursor-pointer'>Withdraw Request</p></Link>
            </div>
      </div>
    );
};

export default DashBoard;