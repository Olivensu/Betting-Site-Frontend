import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SureWin = () => {

    const [user, loading, error] = useAuthState(auth);
    const [userinfo, setUserinfo] = useState([]);
    const [names, setNames] = useState('');
    const [emails, setEmails] = useState('');
    const [phones, setPhones] = useState(0);
    const [deposites, setDeposites] = useState(0);
    const [sureWinData, setSureWinData] = useState([]);
    const [surewindeposite, setSurewindeposite] = useState(0);
    const [surewinwinmoney, setSurewinwinmoney] = useState(0);
    const [count, setCount] = useState(0);
      useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=> setUserinfo(data))

        axios.get(`http://localhost:5000/surewin/${user?.email}`)
      .then(res=>{
        setSureWinData(res.data)
        setSurewindeposite(res.data.deposite);
        setSurewinwinmoney(res.data.winmoney);
      });

      }, [])

      useEffect(() => {
        const interval = setInterval(() => {

          axios.get(`http://localhost:5000/surewin/${user?.email}`)
          .then(res=>{
            setSurewinwinmoney(res.data.winmoney);
            console.log(res.data.winmoney);
            console.log(res.data);
          });
          // This function will execute every 1 second (1000 milliseconds)
          // You can put any logic here that you want to execute every 1 second
          // setCount((prevCount) => prevCount + 1);
        }, (1000 * 60 * 60 * 24));
    
        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(interval);
        };
        },[]);
  

      if(loading){
        return <Loading></Loading>
      }
      const {name, email,phone,deposite} = userinfo;

      const handleSubmit = async (e) =>{
        const currentBalance = deposite - deposites;
        e.preventDefault();
        if (deposite < deposites) {
          alert('Deposit less than your current amount.');
          return;
        }

        const updateDeposit = parseInt(surewindeposite) + parseInt(deposites)
        const updatewinmoney = parseInt(surewinwinmoney) + parseInt(deposites)

        try {
            if(!sureWinData){
                await axios.post("http://localhost:5000/surewin",{
                name,email,phone,deposite:deposites
            })
            .then(res=>{
                alert("Deposit successfully")
                console.log("Deposit successfully")
            })
            }else if(sureWinData.email === email){
                await axios.put(`http://localhost:5000/surewin/${email}`, {winmoney:updatewinmoney })
                .then(res=>{
                    alert("New Deposit added successfully")
                    console.log("New Deposit added successfully")
                })

            }

            await axios.put(`http://localhost:5000/users/${email}`, {deposite:currentBalance})
      .then(res=>{
        // console.log(res);
        console.log('Amount updated successfully',currentBalance);
      }) 
      .catch((error) => {
        console.error('Error updating status:', error);
      });
        }
        catch(err){
            alert("Wrong Details")
            console.log(err)
        }
      }


      const handleWithDraw = async (e) =>{
        const currentBalance = parseInt(deposite) + parseInt(deposites);

        e.preventDefault();
        if (surewinwinmoney < deposites) {
          alert('The withdrawal amount is more than your deposited value.');
          return;
        }

        const updatewinmoney = parseInt(surewinwinmoney) - parseInt(deposites);

        try {
          if(!sureWinData){
              alert('There is no deposit in this acount.')
          }else if(sureWinData.email === email){
              await axios.put(`http://localhost:5000/surewin/${email}`, { winmoney:updatewinmoney })
              .then(res=>{
                  alert("New Deposit added successfully")
                  console.log("New Deposit added successfully")
              })

          }

          await axios.put(`http://localhost:5000/users/${email}`, {deposite:currentBalance})
    .then(res=>{
      // console.log(res);
      console.log('Amount updated successfully',currentBalance);
    }) 
    .catch((error) => {
      console.error('Error updating status:', error);
    });
      }
      catch(err){
          alert("Wrong Details")
          console.log(err)
      }
      }
    return (
        <div className='m-auto text-center bg-lime-100 py-10'>

        <div className="flex justify-around ">
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
              <p className="py-4">1. JOIN GREEN: if the result shows 1,3,7,9, you will get (98*2) 196
              </p>
              <p className="py-4">If the result shows 5, you will get (98*1.5) 147
              </p>
              <p className="py-4">2. JOIN RED: if the result shows 2,4,6,8, you will get (98*2) 196; if the result shows 0, you will get (98*1.5) 147</p>
              <p className="py-4">3. JOIN VIOLET: if the result shows 0 or 5, you will get (98*4.5) 441</p>
              <p className="py-4">4. SELECT NUMBER: if the result is the same as the number you selected, you will get(98*9)882</p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-accent">Close</button>
              </div>
            </form>
          </dialog>
        </div>

            <div className='w-96 m-auto bg-purple-600 py-6 rounded-2xl my-12 shadow-2xl'>
            <p className='text-xl text-center py-3 my-6 m-auto rounded-2xl shadow-xl bg-purple-300 w-10/12'>Current Balance: {deposite}</p>
            {/* <p className='text-xl text-center py-3 my-6 m-auto rounded-2xl shadow-xl bg-purple-300 w-10/12'>SureWin Deposited Balance: {surewindeposite}</p> */}
            <p className='text-xl text-center py-3 my-6 m-auto rounded-2xl shadow-xl bg-purple-300 w-10/12'>SureWin Deposited Balance With Interest: {surewinwinmoney}</p>
            </div>

            {/* You can open the modal using ID.showModal() method */}
          <button className="btn btn-success text-white"
            onClick={() => window.my_modal_4.showModal()}>Deposit</button>
          <dialog id="my_modal_4" className="modal">
            <form className="modal-box w-11/12 max-w-5xl">
                
              <h3 className="font-bold text-center bg-pink-600 text-white py-3 rounded-xl  text-lg">Keep your money to Win with secured interest</h3>
              <div className='bg-sky-200 m-auto text-center py-8 mt-5 rounded-xl shadow-xl'>
                
                
                <input
                  type="number"
                  name='deposite'
                  placeholder="Type your deposit amount"
                  onChange={(e)=>{setDeposites(e.target.value)}} 
                  className="m-5 block mx-auto input w-full max-w-xs"
                />
                {/* <input
                  type="submit"
                  value="Submit"
                  className="btn w-full max-w-xs btn-success text-white"
                /> */}
              </div>
              <div>
      <br />
    </div>
    
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button onClick={handleSubmit} className="btn w-1/2 btn-success text-white">Submit</button>
                <button className="btn w-1/2 btn-accent">Close</button>
              </div>
    </form>
    
          </dialog>

            {/* You can open the modal using ID.showModal() method */}
          <button className="btn btn-accent ml-5 text-white"
            onClick={() => window.my_modal_5.showModal()}>Withdraw</button>
          <dialog id="my_modal_5" className="modal">
            <form className="modal-box w-11/12 max-w-5xl">
                
              <h3 className="font-bold text-center bg-pink-600 text-white py-3 rounded-xl  text-lg">Keep your money to Win with secured interest</h3>
              <div className='bg-sky-200 m-auto text-center py-8 mt-5 rounded-xl shadow-xl'>
                
                
                <input
                  type="number"
                  name='deposite'
                  placeholder="Type your withdraw amount"
                  onChange={(e)=>{setDeposites(e.target.value)}} 
                  className="m-5 block mx-auto input w-full max-w-xs"
                />{/* <input
                  type="submit"
                  value="Submit"
                  className="btn w-full max-w-xs btn-success text-white"
                /> */}
              </div>
              <div>
      <br />
    </div>
    
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <button onClick={handleWithDraw} className="btn w-1/2 btn-success text-white">Submit</button>
                <button className="btn w-1/2 btn-accent">Close</button>
              </div>
    </form>
    
          </dialog>
        </div>
    );
};

export default SureWin;