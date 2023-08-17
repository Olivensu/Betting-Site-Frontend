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
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user?.email}`)
        .then(res=>res.json())
        .then(data=> setUserinfo(data))

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/surewin/${user?.email}`)
      .then(res=>{
        setSureWinData(res.data)
        setSurewindeposite(res.data.deposite);
        setSurewinwinmoney(res.data.winmoney);
      });

      }, [deposites,surewinwinmoney])

      useEffect(() => {
        const interval = setInterval(() => {

          axios.get(`${process.env.REACT_APP_API_BASE_URL}/surewin/${user?.email}`)
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
      const {time} = sureWinData;

      const handleSubmit = async (e) =>{
        const currentBalance = deposite - deposites;
        e.preventDefault();
        if (deposite < deposites) {
          alert('Deposit less than your current amount.');
          return;
        }

        if(deposites<500){
          alert('Deposit should be more than 500.');
          return;
        }

        const updateDeposit = parseInt(surewindeposite) + parseInt(deposites)
        const updatewinmoney = parseInt(surewinwinmoney) + parseInt(deposites)

        try {
            if(!sureWinData){
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/surewin`,{
                name,email,phone,deposite:deposites
            })
            .then(res=>{
                alert("Deposit successfully")
                console.log("Deposit successfully")
            })
            }else if(sureWinData.email === email){
                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/surewin/${email}`, {winmoney:updatewinmoney })
                .then(res=>{
                    // alert("New Deposit added successfully")
                    console.log("New Deposit added successfully")
                    return <Loading></Loading>
                })

            }

            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${email}`, {deposite:currentBalance, time: new Date()})
      .then(res=>{
        // console.log(res);
        console.log('Amount updated successfully',currentBalance);
        setDeposites(currentBalance);
        setSurewinwinmoney(updatewinmoney)
      }) 
      .catch((error) => {
        console.error('Error updating status:', error);
      });
        }
        catch(err){
            alert("Wrong Details")
            console.log(err)
        }
        window.my_modal_4.close();
      }

  
      const handleWithDraw = async (e) =>{
        
      const currentDate = new Date(time);
      const todayDate = new Date()
      const futureDate = new Date(time);
      futureDate.setDate(currentDate.getDate() + 10);
      const withdrawDate = (todayDate-currentDate)/864000000;
      console.log(withdrawDate)
      console.log(futureDate)
      if(withdrawDate<1){
        alert('You can withdraw after: ' + futureDate.toDateString());
        return
      }
        if(deposites<500){
          alert('Withdraw should be more than 500.');
          return;
        }

        if(deposites%500!==0){
          alert("You can only withdraw multiple of 500 ex:(500, 1000, 1500 2000, 2500, 3000, 3500) up to 10000")
          return;
        }

        const currentBalance = parseInt(deposite) + parseInt(deposites);

        e.preventDefault();
        if (surewinwinmoney < deposites) {
          alert('The withdrawal amount is more than your deposited value.');
          return;
        }

        const updatewinmoney = parseInt(surewinwinmoney) - parseInt(deposites);
        window.my_modal_5.close();

        try {
          if(!sureWinData){
              alert('There is no deposit in this acount.')
          }else if(sureWinData.email === email){
              await axios.put(`${process.env.REACT_APP_API_BASE_URL}/surewin/${email}`, { winmoney:updatewinmoney, time: new Date() })
              .then(res=>{
                  // alert("New Deposit added successfully")
                  console.log("New Deposit added successfully")
                  return <Loading></Loading>
              })

          }

          await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${email}`, {deposite:currentBalance})
    .then(res=>{
      // console.log(res);
      console.log('Amount updated successfully',currentBalance);
      setDeposites(currentBalance);
      setSurewinwinmoney(updatewinmoney)
    }) 
    .catch((error) => {
      console.error('Error updating status:', error);
    });
      }
      catch(err){
          alert("Wrong Details")
          console.log(err)
      }
      window.my_modal_5.close();
      }

      const handleDepositClose= ()=>{
        window.my_modal_4.close();
      }
      const handleWithDrawClose= ()=>{
        window.my_modal_5.close();
      }
    return (
        <div className='m-auto text-center bg-lime-100 py-10'>

        <div className="flex justify-around ">
        <Link to='/depositeForm'><button  className='btn btn-warning hover:bg-yellow-600 text-white'>Deposit</button></Link>

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
              <h3 className="font-bold text-lg">Rule Of SureWin</h3>
              
              <p className="py-4">
              You can deposit your money here for fixed.
              </p>
              <p className="py-4">After 24h the money will increase 5%.
              </p>
              <p className="py-4">After putting your money, You can withdraw your money after 10days.
              </p>
              <p className="py-4">How many money you put here, everyday it increase 5% interest.
              </p>
              <p className="py-4">There is no Risk, so put your money and increase from here.
              </p>
              <p className="py-4">This is a great opportunity for you without loose anything.</p>
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
            <p className='text-xl text-center py-3 my-6 m-auto rounded-2xl shadow-xl bg-purple-300 w-10/12'>SureWin Deposited Balance With 5% Interest: {surewinwinmoney}</p>
            </div>

            {/* You can open the modal using ID.showModal() method */}
          <button className="btn btn-success text-white"
            onClick={() => window.my_modal_4.showModal()}>Deposit</button>
          <dialog id="my_modal_4" className="modal">
          <div className='modal-box w-11/12 max-w-5xl'>
          <button  onClick={handleDepositClose} className="btn float-right w-12 rounded-full btn-accent">X</button>
            <form onSubmit={handleSubmit} className="">
                
              <h3 className="font-bold text-center bg-lime-500 text-white py-3 rounded-xl  text-lg">Keep your money to Win with secured interest</h3>
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
                  className="btn w-1/2 btn-success text-white"
                /> */}
              </div>
              <div>
      <br />
    </div>
    
              <div className="modal-action">
                {/* if there is a button, it will close the modal */}
                <input
                  type="submit"
                  value="Submit"
                  className="btn w-full btn-success text-white"
                />
                
              </div>
    </form>
          </div>
    
          </dialog>

            {/* You can open the modal using ID.showModal() method */}
          <button className="btn btn-accent ml-5 text-white"
            onClick={() => window.my_modal_5.showModal()}>Withdraw</button>
          <dialog id="my_modal_5" className="modal">
            <div className='modal-box w-11/12 max-w-5xl'>
            <button  onClick={handleWithDrawClose} className="btn float-right w-12 rounded-full btn-accent">X</button>
            <form  onSubmit={handleWithDraw} className="">
                
                <h3 className="font-bold text-center bg-lime-500 text-white py-3 rounded-xl  text-lg">Withdraw your money from the SureWin and Add to Main Balance!!!</h3>
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
                    className="btn w-1/2 btn-success text-white"
                  /> */}
                </div>
                <div>
        <br />
      </div>
      
                <div className="modal-action">
                  {/* if there is a button, it will close the modal */}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn w-full btn-success text-white"
                  />
                  
                </div>
      </form>
            </div>
    
          </dialog>
        </div>
    );
};

export default SureWin;