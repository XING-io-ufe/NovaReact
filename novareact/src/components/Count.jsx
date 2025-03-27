import './../../App.css';
import React, { useState } from 'react';

function Count() {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        setCount(count - 1);
    };
    return (
        <div className='Count'>
            <p>Size</p>
            <div className="shape">
                <button className='one' onClick={decreaseCount} disabled={count === 0}>-</button>
                <p className='mid'>{count}</p>
                <button className='two' onClick={increaseCount}>+</button>
            </div>
        </div>
    );
}
export default Count;



