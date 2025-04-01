import React, { useState } from 'react';

function Color({ colors }) {
    const [activeColor, setActiveColor] = useState(null);

    if (!colors || !Array.isArray(colors)) return null;

    const handleColorClick = (color) => {
        setActiveColor(color);
    };

    return (
        <ul className="flex gap-4">
            {colors.map((color) => (
                <li
                    key={color}
                    onClick={() => handleColorClick(color)}
                    style={{ backgroundColor: color }}
                    className={`cursor-pointer rounded-full w-6 h-6 ${activeColor === color ? 'border border-black' : ''}`}
                ></li>
            ))}
        </ul>
    );
}

export default Color;
