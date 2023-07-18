// // Timer.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Timer = ({ userId }) => {
//   const [timer, setTimer] = useState({ startTime: 0, endTime: 0, remainingTime: 0 });

//   const fetchTimer = async () => {
//     try {
//       const response = await axios.get(`/timer/${userId}`);
//       setTimer(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchTimer();
//   }, [userId]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const { startTime, endTime } = timer;
//       const currentTime = Date.now();

//       if (currentTime >= startTime && currentTime <= endTime) {
//         // Calculate the remaining time for the current day's countdown
//         const remainingTime = endTime - currentTime;
//         setTimer((prevTimer) => ({ ...prevTimer, remainingTime }));
//       } else {
//         // Fetch the next day's timer
//         fetchTimer();
//       }
//     }, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, [timer]);

//   const formatTime = (time) => {
//     if (time <= 0) {
//       return '00:00';
//     }

//     const minutes = Math.floor((time / 1000) / 60);
//     const seconds = Math.floor((time / 1000) % 60);

//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div>
//       <h2>Countdown Timer ({userId})</h2>
//       {timer.remainingTime <= 0 ? (
//         <p>00:00</p>
//       ) : (
//         <p>{formatTime(timer.remainingTime)}</p>
//       )}
//     </div>
//   );
// };

// export default Timer;
