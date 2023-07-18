import React from 'react';
import WingoHeading from './WingoHeading';
import WingoPeriod from './WingoPeriod';
import WIngoPreriodRecord from './WIngoPreriodRecord';

const Wingo = () => {
    return (
        <div className='p-2 bg-red-300'>
            <WingoHeading></WingoHeading>
            <WingoPeriod></WingoPeriod>
            <WIngoPreriodRecord></WIngoPreriodRecord>
        </div>
    );
};

export default Wingo;