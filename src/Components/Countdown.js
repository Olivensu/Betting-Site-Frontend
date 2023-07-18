// // Countdown.js

import React from 'react';

const Countdown = () => {
  return (
    <div>
      
    </div>
  );
};

export default Countdown;

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

// const Countdown = () => {
//   const [countdown, setCountdown] = useState(180); // Initial countdown time in seconds

//   useEffect(() => {
//     socket.on('countdown', updatedCountdown => {
//       setCountdown(updatedCountdown);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const formatTime = time => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div>
//       <h1>Countdown: {formatTime(countdown)}</h1>
//       {/* Render your betting options and user interface here */}
//     </div>
//   );
// };

// export default Countdown;
