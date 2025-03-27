import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product.id, selectedColor, quantity);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600">{product.name}</h3>
                    <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                </Link>

                <div className="mt-3">
                    <div className="flex items-center mb-2">
                        <span className="text-gray-700 mr-2">Color:</span>
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="border rounded px-2 py-1"
                        >
                            {product.colors.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center mb-3">
                        <span className="text-gray-700 mr-2">Qty:</span>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            className="border rounded px-2 py-1 w-16"
                        />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;