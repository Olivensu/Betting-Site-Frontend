import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => (prevTime + 1) % 180);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = time => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='text-end'>
      <h1 className='text-xl font-bold'>Countdown Timer</h1>
      <h2 className='text-3xl '>{formatTime(time)}</h2>
    </div>
  );
};

export default CountdownTimer;