
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/GameSection/Home/Home';
import Wingo from './Components/GameSection/Wingo/Wingo';
import SignIn from './Components/LoginSystem/SignIn';
import Register from './Components/LoginSystem/Register';
import Header from './Components/Shared/Header';
import Countdown from './Components/Countdown';
import Timer from './Components/Timer';
import ParentComponent from './Components/ParentComponent';
import UserProfile from './Components/UserProfile/UserProfile';
import ForgetPass from './Components/LoginSystem/ForgetPass';
import DashBoard from './Components/DashBoard/DashBoard';
import DepositeForm from './Components/DepositeForm';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AdminRoute from './Components/PrivateRoute/AdminRoute';
import SureWin from './Components/GameSection/SureWin/SureWin';
import RechargeRequest from './Components/DashBoard/RechargeRequest';
import WithDrawRequest from './Components/DashBoard/WithDrawRequest';
import NotFound from './Components/NotFound';
import Add from './Components/DashBoard/Add';
import Userinfo from './Components/DashBoard/Userinfo';
import Footer from './Components/Shared/Footer';
import Baccarat from './Components/GameSection/Baccarat/Baccarat';
import PrivacyAndPolicy from './Components/Policy/PrivacyAndPolicy';
import AboutUs from './Components/Policy/AboutUs';
import PosterUploadForm from './Components/PosterUploadForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([])
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get`)
    .then((res)=>{
      console.log(res.data);
      setPhotos(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
  return (
    <div className=' m-auto'>
      <div className=' m-auto'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<SignIn></SignIn>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/terms' element={<PrivacyAndPolicy></PrivacyAndPolicy>}></Route>
        <Route path='/about' element={<AboutUs></AboutUs>}></Route>
        <Route path='/forgetPass' element={<ForgetPass></ForgetPass>}></Route>
        <Route path='/wingo' element={<PrivateRoute><Wingo></Wingo></PrivateRoute>}></Route>
        <Route path='/baccarat' element={<PrivateRoute><Baccarat></Baccarat></PrivateRoute>}></Route>
        <Route path='/user' element={<PrivateRoute><UserProfile></UserProfile></PrivateRoute>}></Route>
        <Route path='/timer' element={<Countdown></Countdown>}></Route>
        <Route path='/depositeForm' element={<PrivateRoute><DepositeForm  photos={photos}></DepositeForm></PrivateRoute>}></Route>
        <Route path='/surewin' element={<PrivateRoute><SureWin></SureWin></PrivateRoute>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path='/add' element={<Add></Add>}></Route>
        <Route path='/dashboard' element={<AdminRoute><DashBoard></DashBoard></AdminRoute>}></Route>
        <Route path='/dashboard/rechargerequest' element={<AdminRoute><RechargeRequest></RechargeRequest></AdminRoute>}></Route>
        <Route path='/dashboard/withdrawrequest' element={<AdminRoute><WithDrawRequest></WithDrawRequest></AdminRoute>}></Route>
        <Route path='/dashboard/user' element={<AdminRoute><Add></Add></AdminRoute>}></Route>
        <Route path='/imageupload' element={<PosterUploadForm  photos={photos}></PosterUploadForm>}></Route>
      </Routes>
      <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
