import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BaccaratRecord = () => {

    const [data, setData] = useState([]);
    const [gameCount, setGameCount] = useState(1);
    // console.log(gameCount)

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/baccaratcountdown/`).then(res=>{
        setData(res.data);
      })
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const finishedData = data.filter(data => data.status === 'finished');

  const sortedData = finishedData.sort((a, b) =>parseInt(b.countdownId) - parseInt(a.countdownId)).slice(0,10);
  // console.log(sortedData)
    return (
        <div className='bg-base-200 rounded-xl py-3'>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-4 text-xl font-bold">Period Record</p>
            </div>
            <div className='h-1 mt-3 w-full bg-yellow-700'></div>
            <div>
      <div className='overflow-x-auto bg-sky-100'>
      <table className='table'>
        <thead>
          <tr className=''>
            <th>ID</th>
            <th>status</th>
            <th>Baccarat</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map(number => (
            <tr className="hover" key={number._id}>
              <td>{number.countdownId}</td>
              <td>{number.status}</td>
              <td>{number?.winningColor==='player'? <div>Player</div>:number?.winningColor==='tie'? <div>TIE</div>:<div>Banker</div>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
    
        </div>
    );
};

export default BaccaratRecord;