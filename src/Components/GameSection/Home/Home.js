import './Home.css'
import wingo from '../../../img/game_wingo.png'
import sureWin from '../../../img/sureWin.jpg'
import baccarat from '../../../img/MegaBaccarat.webp'
import { Link, useLocation } from 'react-router-dom';
import FancySlider from '../FancySlider/FancySlider';

const Home = () => {

    const location = useLocation()

    return (
        <div className=" min-h-screen bg-[#6C005E] w-full">
            <div className='max-w-2xl m-auto'>
                <FancySlider></FancySlider>
            </div>
           <div className='m-auto max-w-2xl'>
           <div className=' bg-[#6C005E] text-center p-5'>
            <img className='w-11/12 m-auto' src={wingo} alt="" />
            <Link to='/wingo'><button className='btn btn-warning w-10/12'>Go Game</button></Link>
           </div>
           <div className=' bg-[#6C005E] text-center p-5'>
            <img className='w-11/12 m-auto rounded-2xl' src={baccarat} alt="" />
            <Link to='/surewin'><button className='btn btn-warning mt-8 w-10/12'>Go Game!!!</button></Link>
           </div>
           <div className=' bg-[#6C005E] text-center p-5'>
            <img className='w-11/12 m-auto rounded-2xl' src={sureWin} alt="" />
            <Link to='/surewin'><button className='btn btn-primary mt-8 w-10/12'>Go Win!!!</button></Link>
           </div>
           </div>
        </div>
    );
};

export default Home;