
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

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<SignIn></SignIn>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/forgetPass' element={<ForgetPass></ForgetPass>}></Route>
        <Route path='/wingo' element={<PrivateRoute><Wingo></Wingo></PrivateRoute>}></Route>
        <Route path='/user' element={<UserProfile></UserProfile>}></Route>
        <Route path='/timer' element={<Countdown></Countdown>}></Route>
        <Route path='/dashboard' element={<AdminRoute><DashBoard></DashBoard></AdminRoute>}></Route>
        <Route path='/dashboard/rechargerequest' element={<AdminRoute><RechargeRequest></RechargeRequest></AdminRoute>}></Route>
        <Route path='/dashboard/withdrawrequest' element={<AdminRoute><WithDrawRequest></WithDrawRequest></AdminRoute>}></Route>
        <Route path='/depositeForm' element={<PrivateRoute><DepositeForm></DepositeForm></PrivateRoute>}></Route>
        <Route path='/surewin' element={<PrivateRoute><SureWin></SureWin></PrivateRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
