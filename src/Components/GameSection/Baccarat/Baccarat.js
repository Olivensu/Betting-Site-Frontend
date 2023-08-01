import React from 'react';
import BaccaratHeading from './BaccaratHeading';
import BaccaratCountdown from './BaccaratCountdown';
import BaccaratRecord from './BaccaratRecord';

const Baccarat = () => {
    return (
        <div className='p-2 bg-red-300'>
            <BaccaratHeading></BaccaratHeading>
            <BaccaratCountdown></BaccaratCountdown>
            <BaccaratRecord></BaccaratRecord>
        </div>
    );
};

export default Baccarat;