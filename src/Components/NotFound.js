import React from "react";
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-red-600">Sorry,</h1>
      <h2 className="text-3xl my-10 font-bold text-red-600">Something missing....</h2>
      <Link to='/'><button className="rounded-pill px-5 py-3 bg-warning border-0 mb-5 fs-5">Back To Home</button></Link>
    </div>
  );
};

export default NotFound;