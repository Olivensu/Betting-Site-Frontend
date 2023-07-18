import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DashBoard = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/depositHistory')
        .then(response =>{
            setData(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[])

    const pendingRequests = data.filter(req => req.request === 'Pending');
    console.log(pendingRequests)

    const handleAccept = async () => {
        try {
          // Make a PUT request to update the status to 'accepted'
          const response = await axios.put('http://localhost:5000/depositHistory', { request: 'Accepted'})
          
        //   setRequest(response.data.request);
          console.log(response)
          alert(response.data);
        } catch (error) {
          console.error('Error accepting deposit:', error);
        }
      };
    
      const handleReject = async () => {
        try {
          // Make a PUT request to update the status to 'rejected'
          const response = await axios.put('http://localhost:5000/depositHistory', {request: 'Rejected'});
        //   setRequest(response.data.request);
          console.log(response)
        } catch (error) {
          console.error('Error rejecting deposit:', error);
        }
      };
    return (
        <div className='p-5 py-10 bg-cyan-50'>
            <p className='text-3xl text-center font-bold text-lime-500'>Dashboard</p>

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        pendingRequests.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.request}</td>
                <td><button className='btn btn-sm btn-success mr-2' onClick={handleAccept}>Accept</button>
      <button  className='btn btn-sm btn-accent' onClick={handleReject}>Reject</button></td>
            </tr>
        ))
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default DashBoard;