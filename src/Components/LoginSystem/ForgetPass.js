import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgetPass = () => {
    const [emails, setEmails] = useState('');
    const auth = getAuth();
      
      const handleResetEmail = () => {
        return sendPasswordResetEmail(auth, emails);
      }
    return (
        <div>
            <div className='bg-primary text-center md:w-2/3 lg:w-1/2 mx-auto py-20 my-20'>
                <h1 className="text-yellow-300 text-2xl font-bold">Forget Password</h1>
                <form>
                <input name='email' type="email" onChange={(e) => setEmails(e.target.value)} placeholder="Type your email" className="m-5 block mx-auto input w-full max-w-xs" />
                <button className="m-5 btn-accent text-white text-bold text-xl block mx-auto btn  w-full  max-w-xs" onClick={() => handleResetEmail()}>Forget Password</button>
                </form>
                <Link className='text-xl font-bold text-yellow-400 bg-cyan-500 rounded-full py-1 px-4' to='/login'>Login Page</Link>
            </div>
        </div>
    );
};

export default ForgetPass;