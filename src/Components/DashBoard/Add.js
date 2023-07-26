import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Add = () => {
    const [data, setData] = useState([]);
    // const [amount, setAmount]= useState(0);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`)
        .then(response =>{
            setData(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[])

    // const [tableData, setTableData] = useState([]);
    // const [searchQuery, setSearchQuery] = useState('');

    const pendingRequests = data.filter(req => req.request === 'Pending');
    const AcceptedRequests = data.filter(req => req.request === 'Accepted');

    // const handleSearch = (event) => {
    //   event.preventDefault();
    //   const { value } = event.target;
    //   setSearchQuery(value);
  
    //   // Filter the data based on the search query.
    //   const filteredData = data.filter((item) =>
    //     item.email.toLowerCase().includes(value.toLowerCase())
    //   );
  
    //   setTableData(filteredData);
    // };
  
    // const handleResetSearch = () => {
    //   setSearchQuery('');
    //   setTableData(data);
    // };

    return (
        <div className='p-5 py-10 bg-cyan-50'>
            <div className='flex justify-around pb-5'>
                <Link to='/dashboard'><button className='btn btn-sm btn-primary'>Dashboard</button></Link>
                <Link to='/dashboard/user'><button className='btn btn-sm btn-primary'>Users Info</button></Link>
                <Link to='/dashboard/rechargerequest'><button className='btn btn-sm btn-primary'>Recharge Request</button></Link>
                <Link to='/dashboard/withdrawrequest'><button className='btn btn-sm btn-primary'>Withdraw Request</button></Link>
            </div>
            <p className='text-3xl text-center font-bold text-lime-500'>User Info</p>

            {/* <div className='m-auto text-center my-5 bg-lime-200 py-3 rounded-2xl shadow-xl'>
            <input className='input'
        type="text"
        placeholder="Search by email"
        // value={searchQuery}
        // onChange={handleSearch}
      />
      <button className='btn btn-secondary text-white mx-5' onClick={handleResetSearch}>Reset Search</button>
            </div> */}
           
            <div className="overflow-x-auto mt-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Amount</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
         data.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                {/* <td><button className='btn btn-sm btn-success mr-2' onClick={()=>handleAccept(req._id)}>Accept</button>
      <button  className='btn btn-sm btn-accent' 
      onClick={()=>handleReject(req._id)}
      >Reject</button></td> */}
            </tr>
        ))
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Add;