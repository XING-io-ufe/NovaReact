import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/products/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: parseInt(id),
                    quantity: parseInt(quantity)
                })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Added to cart');
                navigate('/cart');
            } else {
                alert(data.error || 'Failed to add to cart');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{product.name}</h2>
            {product.imageUrl && (
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-64 h-64 object-cover mb-2"
                />
            )}
            <p>Color: {product.color}</p>
            <p>Price: ${product.price}</p>
            <p>Available Quantity: {product.quantity}</p>
            <div className="mt-4">
                <label className="block mb-2">Select Quantity:</label>
                <input
                    type="number"
                    className="border p-2"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                    max={product.quantity}
                />
            </div>
            <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductDetail;
