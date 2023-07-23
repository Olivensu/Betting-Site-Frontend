import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashBoard = () => {

    
    return (
      <div>
            <p className='text-3xl font-bold text-center my-10 text-yellow-600'>Dashboard</p>
            <div className='grid md:grid-cols-2 m-10 justify-items-center'>
              <Link to='/dashboard/rechargerequest'><p className='bg-sky-300 w-96 text-2xl font-bold text-gray-600 text-center py-10 rounded-2xl cursor-pointer'>Recharge Request</p></Link>
              <Link to='/dashboard/withdrawrequest'><p className='bg-lime-300 w-96 text-2xl font-bold text-gray-600 text-center py-10 rounded-2xl cursor-pointer'>Withdraw Request</p></Link>
            </div>
      </div>
    );
};

export default DashBoard;