import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DashBoard = () => {

    const [data, setData] = useState([]);
    const [status, setStatus] = useState('Submitted');
    const [show, setShow] = useState('All');
    // const [amount, setAmount]= useState(0);

    useEffect(()=>{
        axios.get('http://localhost:5000/depositHistory')
        .then(response =>{
            setData(response.data)
            setTableData(response.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[status])

    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const pendingRequests = data.filter(req => req.request === 'Pending');
    const AcceptedRequests = data.filter(req => req.request === 'Accepted');
    const RejectedRequests = data.filter(req => req.request === 'Rejected');

    const handleSearch = (event) => {
      event.preventDefault();
      const { value } = event.target;
      setSearchQuery(value);
  
      // Filter the data based on the search query.
      const filteredData = data.filter((item) =>
        item.txnID.toLowerCase().includes(value.toLowerCase())
      );
  
      setTableData(filteredData);
    };
  
    const handleResetSearch = () => {
      setSearchQuery('');
      setTableData(data);
    };

    const handleAccept =  (id) => {
        axios.get(`http://localhost:5000/depositHistory/${id}`)
        .then(res=>{
          console.log(res.data.deposite);
          updateAmount(res.data.email, res.data.deposite)
        }) 
        .catch((error) => {
          console.error('Error updating status:', error);
        });
      let request = "Accepted";
      
          // Make a PUT request to update the status to 'accepted'
           axios.put(`http://localhost:5000/depositHistory/${id}`, {request})
          .then(res=>{
            // console.log(res);
            setStatus(request);
          }) 
          .catch((error) => {
            console.error('Error updating status:', error);
          });
          setStatus('');
      };
    
      const handleReject = async (id) => {
        let request = "Rejected";
        // Make a PUT request to update the status to 'Rejected'
        axios.put(`http://localhost:5000/depositHistory/${id}`, {request})
        .then(res=>{
          // console.log(res);
          setStatus(request)
        }) 
        .catch((error) => {
          console.error('Error updating status:', error);
        });
        setStatus('');
      };
      const handleClick = (val) =>{
        setShow(val);
    }

    const updateAmount = (email, amount) =>{
      axios.get(`http://localhost:5000/users/${email}`)
      .then(res=>{
        console.log(res.data.deposite);
        const updateAmount = res.data.deposite + amount;
        currentBalance(email,updateAmount);
      })
    }

    const currentBalance = (email,deposite) =>{
      // Make a PUT request to update the status to 'accepted'
      axios.put(`http://localhost:5000/users/${email}`, {deposite})
      .then(res=>{
        // console.log(res);
        console.log('Amount updated successfully',deposite);
      }) 
      .catch((error) => {
        console.error('Error updating status:', error);
      });
    }
    return (
        <div className='p-5 py-10 bg-cyan-50'>
            <p className='text-3xl text-center font-bold text-lime-500'>Dashboard</p>

            <div className='m-auto text-center my-5 bg-lime-200 py-3 rounded-2xl shadow-xl'>
            <input className='input'
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button className='btn btn-secondary text-white mx-5' onClick={handleResetSearch}>Reset Search</button>
            </div>
            <div>
            <ul className="flex justify-center mb-3" id="pills-tab" role="tablist">
                        <li className="m-5">
                            <button  className={`btn btn-sm btn-primary ${show==='All' && 'active:bg-lime-500'}`} type="button" onClick={()=>handleClick('All')}>All</button>
                        </li>
                        <li className="m-5">
                            <button  className={`btn btn-sm btn-primary ${show==='Pending' && 'active:bg-lime-500'}`} type="button" onClick={()=>handleClick('Pending')}>Pending</button>
                        </li>
                        <li className="m-5">
                            <button className={`btn btn-sm btn-primary ${show==='Accepted' && 'active:bg-lime-500'}`} type="button" onClick={()=>handleClick('Accepted')}>Accepted</button>
                        </li>
                        <li className="m-5">
                            <button  className={`btn btn-sm btn-primary ${show==='Rejected' && 'active:bg-lime-500'}`} type="button" onClick={()=>handleClick('Rejected')}>Rejected</button>
                        </li>
                    </ul>
            </div>
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
        <th>TxnID</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        show==='All'? tableData.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                <td>{req.txnID}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.request}</td>
                {/* <td><button className='btn btn-sm btn-success mr-2' onClick={()=>handleAccept(req._id)}>Accept</button>
      <button  className='btn btn-sm btn-accent' 
      onClick={()=>handleReject(req._id)}
      >Reject</button></td> */}
            </tr>
        )) : show==='Pending'? pendingRequests.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                <td>{req.txnID}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.request}</td>
                <td><button className='btn btn-sm btn-success mr-2' onClick={()=>handleAccept(req._id)}>Accept</button>
      <button  className='btn btn-sm btn-accent' 
      onClick={()=>handleReject(req._id)}
      >Reject</button></td>
            </tr>
        )) : show==='Accepted'? AcceptedRequests.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                <td>{req.txnID}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.request}</td>
                {/* <td><button className='btn btn-sm btn-success mr-2' onClick={()=>handleAccept(req._id)}>Accept</button>
      <button  className='btn btn-sm btn-accent' 
      onClick={()=>handleReject(req._id)}
      >Reject</button></td> */}
            </tr>
        )) : RejectedRequests.map(req=>(
            <tr key={req._id} className="hover">
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.deposite}</td>
                <td>{req.txnID}</td>
                <td>{req.date}</td>
                <td>{req.time}</td>
                <td>{req.request}</td>
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

export default DashBoard;