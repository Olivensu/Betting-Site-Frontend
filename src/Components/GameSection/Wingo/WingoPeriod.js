import React, { useEffect, useState } from 'react';
import './wingoPeriod.css'
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const WingoPeriod = () => {
  const [user, loading, error] = useAuthState(auth);
  const [time, setTime] = useState(0);
  const [gameCount, setGameCount] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // const date = new Date().getDate()  
  // const month = new Date().getMonth()
  // const year = new Date().getFullYear() 
  
  // const id = `${year}${month+1}${date}`
  // useEffect(() => {
  //   const storedTime = localStorage.getItem('countdownTime');

  //   if (storedTime) {
  //     const remainingTime = parseInt(storedTime);
  //     if (remainingTime > 0) {
  //       setTime(remainingTime);
  //     } else {
  //       setTime(0);
  //       localStorage.removeItem('countdownTime'); // Reset the stored time if it has expired
  //     }
  //   }

  //   const interval = setInterval(() => {
  //     setTime(prevTime => {
  //       const updatedTime = (prevTime + 1)%180;
  //       localStorage.setItem('countdownTime', updatedTime);
  //       return updatedTime;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const intervals = setInterval(() => {
  //     setGameCount(prevCount => (prevCount % 480) + 1);
  //   }, 180000);

  //   return () => clearInterval(intervals);
  // },[])

  useEffect(() => {
    const interval = setInterval(() => {

      axios.get(`http://localhost:5000/countdown/running`)
      .then(res=>{
        setTime(res.data.secondsLeft);
        setGameCount(res.data.countdownId)
        console.log(res.data.secondsLeft);
        console.log(res.data);
      });
      // This function will execute every 1 second (1000 milliseconds)
      // You can put any logic here that you want to execute every 1 second
      // setCount((prevCount) => prevCount + 1);
    }, (1000));

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
    },[]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  const handleButtonClick = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = async(color) => {
    if (selectedValue !== null) {
      try {
        await axios.post(`http://localhost:5000/bet`,{
        email: user?.email, color, betAmount: selectedValue
      }).then(res=>{
        alert(`Successfully ${selectedValue} submitted.`)
      })
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please select a value.");
    }
  };
    return (
      <div className="bg-base-200 my-5 rounded-xl">
        <div className="w-full rounded-xl border-b-4 border-yellow-600">
          <p className="text-xl font-bold text-center">Parity</p>
        </div>
        <div className="p-4 flex justify-between">
          <div>
            <div className="flex">
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
              <p className="ml-4 text-xl font-bold">Period</p>
            </div>
            <p className="text-3xl">{gameCount}</p>
          </div>
          <div className="text-end">
            <h1 className="text-xl font-bold">Countdown Timer</h1>
            <h2 className="text-3xl ">{formatTime(time)}</h2>
          </div>
        </div>
        <div className="flex justify-around py-3">
          {/* You can open the modal using ID.showModal() method */}
          {
            time>30 ? <button className="btn btn-success text-white"
            onClick={() => window.my_modal_4.showModal()}>Join Green</button> : <button className="btn text-white " disabled
            onClick={() => window.my_modal_4.showModal()}>Join Green</button>
          }
          <dialog id="my_modal_4" className="modal">
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-center bg-green-600 text-white py-3 rounded-xl  text-lg">Join Green</h3>
              <p className="py-4">Contract Money</p>
              <div>
      <input type="button" value="100" onClick={() => handleButtonClick(100)} className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 100 ? 'green' : '' }} />
      <input type="button" value="1000" onClick={() => handleButtonClick(1000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 1000 ? 'green' : '' }}/>
      <input type="button" value="10000" onClick={() => handleButtonClick(10000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 10000 ? 'green' : '' }}/>
      <input type="button" value="50000" onClick={() => handleButtonClick(50000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 50000 ? 'green' : '' }}/>
      <br />
      <br />
      <p>Total contract money is {selectedValue}</p>
    </div>
    <div>
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button  className='btn w-1/2 btn-success text-white' onClick={()=>handleSubmit('green')} >Confirm</button>
                <button className="btn w-1/2 btn-accent">Close</button>
              </div>
    </div>
            </form>
          </dialog>

          {/* You can open the modal using ID.showModal() method */}
          {
            time>30 ?<button className="btn btn-accent text-white"
            onClick={() => window.my_modal_5.showModal()}>Join Red</button> : <button className="btn btn-accent text-white" disabled
            onClick={() => window.my_modal_5.showModal()}>Join Red</button>
          }
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-center bg-red-600 text-white py-3 rounded-xl  text-lg">Join Red</h3>
              <p className="py-4">Contract Money</p>
              <div>
      <input type="button" value="100" onClick={() => handleButtonClick(100)} className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 100 ? 'red' : '' }} />
      <input type="button" value="1000" onClick={() => handleButtonClick(1000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 1000 ? 'red' : '' }}/>
      <input type="button" value="10000" onClick={() => handleButtonClick(10000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 10000 ? 'red' : '' }}/>
      <input type="button" value="50000" onClick={() => handleButtonClick(50000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 50000 ? 'red' : '' }}/>
      <br />
      <br />
      <p>Total contract money is {selectedValue}</p>
    </div>
    <div>
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button  className='btn w-1/2 btn-success text-white' onClick={()=>handleSubmit('red')} >Confirm</button>
                <button className="btn w-1/2 btn-accent">Close</button>
              </div>
    </div>
            </form>
          </dialog>

          {/* You can open the modal using ID.showModal() method */}
          {
            time>30 ? <button className="btn btn-primary text-white"
            onClick={() => window.my_modal_6.showModal()}>Join Blue</button> : <button className="btn btn-primary text-white" disabled
            onClick={() => window.my_modal_6.showModal()}>Join Blue</button>
          }
          <dialog id="my_modal_6" className="modal">
            <form method="dialog" className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-center bg-blue-600 text-white py-3 rounded-xl  text-lg">Join Blue</h3>
              <p className="py-4">Contract Money</p>
              <div>
      <input type="button" value="100" onClick={() => handleButtonClick(100)} className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 100 ? '#6739B6' : '' }} />
      <input type="button" value="1000" onClick={() => handleButtonClick(1000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 1000 ? '#6739B6' : '' }}/>
      <input type="button" value="10000" onClick={() => handleButtonClick(10000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 10000 ? '#6739B6' : '' }}/>
      <input type="button" value="50000" onClick={() => handleButtonClick(50000)}  className='btn btn-primary text-white mr-5' style={{ backgroundColor: selectedValue === 50000 ? '#6739B6' : '' }}/>
      <br />
      <br />
      <p>Total contract money is {selectedValue}</p>
    </div>
    <div>
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button  className='btn w-1/2 btn-success text-white' onClick={()=>handleSubmit('blue')} >Confirm</button>
                <button className="btn w-1/2 btn-accent">Close</button>
              </div>
    </div>
            </form>
          </dialog>
        </div>
        {/* <div className='grid grid-cols-5 gap-3 m-3 pb-4'>
            <button className='btn bg-gradient-to-r from-violet-500 to-red-500 w-full text-white text-2xl'>0</button>
            <button className='btn btn-success w-full text-white text-2xl'>1</button>
            <button className='btn btn-accent w-full text-white text-2xl'>2</button>
            <button className='btn btn-success w-full text-white text-2xl'>3</button>
            <button className='btn btn-accent w-full text-white text-2xl'>4</button>
            <button className='btn bg-gradient-to-r from-violet-500 to-green-500 w-full text-white text-2xl'>5</button>
            <button className='btn btn-success w-full text-white text-2xl'>6</button>
            <button className='btn btn-accent w-full text-white text-2xl'>7</button>
            <button className='btn btn-success w-full text-white text-2xl'>8</button>
            <button className='btn btn-accent w-full text-white text-2xl'>9</button>
        </div> */}
      </div>
    );
};

export default WingoPeriod;