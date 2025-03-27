import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                setSelectedColor(response.data.colors[0]);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product.id, selectedColor, quantity);
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!product) {
        return <div className="text-center py-8">Product not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-2xl text-indigo-600 mt-2">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mt-4">{product.description}</p>

                    <div className="mt-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Color</label>
                            <select
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="border rounded px-3 py-2 w-full"
                            >
                                {product.colors.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="border rounded px-3 py-2 w-20"
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;