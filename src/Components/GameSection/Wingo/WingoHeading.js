import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';

const WingoHeading = () => {
  const [user, loading, error] = useAuthState(auth);
  const [deposites, setDeposites] = useState(0);

  useEffect(() => {

    const interval = setInterval(()=>{
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user?.email}`)
    .then(res=>res.json())
    .then(data=> setDeposites(data.deposite))
    }, (2000));

    return () => {
      clearInterval(interval);
    }

  }, [deposites])


  if(loading){
    return <Loading></Loading>
  }
    return (
      <div className=" bg-base-200 py-6 shadow-xl rounded-xl">
        <p className="text-2xl font-bold text-center py-2">
          Available Balance: {deposites}
        </p>
        <div className="flex justify-around">
        <Link to='/depositeForm'><button  className='btn btn-warning hover:bg-yellow-600 text-white'>Recharge</button></Link>

          {/* Rules Modal */}
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn btn-warning hover:bg-yellow-600 text-white"
            onClick={() => window.my_modal_1.showModal()}
          >
            Read Rules
          </button>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Rule Of Guess</h3>
              <p className="py-4">
              3 minutes 1 issue, 2 minutes and 30 seconds to order, 30 seconds to show the lottery result. It opens all day. The total number of trade is 480 issues
              </p>
              <p className="py-4">If you spend 100 to trade, after deducting 2 service fees, your contract amount is 98:
              </p>
              <p className="py-4">1. JOIN GREEN: if the result is green you will get (98*2) 196
              </p>
              <p className="py-4">2. JOIN RED: if the result is red you will get (98*2) 196</p>
              <p className="py-4">3. JOIN VIOLET: if the result is VIOLET you will get (98*2) 196</p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-accent">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
    );
};

export default WingoHeading;