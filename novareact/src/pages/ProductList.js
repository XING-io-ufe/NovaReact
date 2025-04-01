import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Color from '../components/Color';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4">
                        {product.imageUrl && (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover mb-2"
                            />
                        )}
                        <h3 className="font-bold">{product.name}</h3>
                        <div className="flex justify-start gap-[15px]">
                            <Color colors={[product.color]} />
                        </div>
                        <p>Price: ${product.price}</p>
                        <Link to={`/products/${product.id}`} className="text-purple-500">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
