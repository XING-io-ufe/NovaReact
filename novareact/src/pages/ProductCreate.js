import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        quantity: 0,
        price: 0.0,
        imageUrl: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: formData.name,
                    color: formData.color,
                    quantity: Number(formData.quantity),
                    price: Number(formData.price),
                    imageUrl: formData.imageUrl,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Product added successfully!');
                navigate('/products');
            } else {
                alert(data.error || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border p-2"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Color:</label>
                    <input
                        type="text"
                        name="color"
                        className="w-full border p-2"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        className="w-full border p-2"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Price:</label>
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        className="w-full border p-2"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="w-full border p-2"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductCreate;
