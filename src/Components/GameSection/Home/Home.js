import './Home.css'
import wingo from '../../../img/game_wingo.png'
import sureWin from '../../../img/sureWin.jpg'
import { Link, useLocation } from 'react-router-dom';

const Home = () => {

    const location = useLocation()

    return (
        <div className="top-banner min-h-screen w-full">
           <div className='grid grid-cols-1 md:grid-cols-2 pt-44'>
           <div className=' bg-[#6C005E] text-center p-10'>
            <img className='w-10/12 m-auto' src={wingo} alt="" />
            <Link to='/wingo'><button className='btn btn-warning w-10/12'>Go Game</button></Link>
           </div>
           <div className=' bg-[#6C005E] text-center p-10'>
            <img className='w-10/12 m-auto rounded-2xl' src={sureWin} alt="" />
            <Link to='/surewin'><button className='btn btn-primary mt-8 w-10/12'>Go Win!!!</button></Link>
           </div>
           </div>
        </div>
    );
};

export default Home;