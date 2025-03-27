import './../../App.css';
import React, { useState } from 'react';


function Color({ colors }) {
    const [activeColor, setActiveColor] = useState(null);

    const handleColorClick = (color) => {
        setActiveColor(color);
    };
    return (
        <div className='Color'>
            {colors.map(color => (
                <li
                    key={color}
                    onClick={() => handleColorClick(color)}
                    style={{ color: color, cursor: 'pointer', backgroundColor: color, borderRadius: '100px' }}
                    className={activeColor === color ? 'active' : ''}
                ></li>
            ))
            }
        </div >
    );
}
export default Color;