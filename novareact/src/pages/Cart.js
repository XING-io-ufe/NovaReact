import React, { useEffect, useState } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/cart', {
                    credentials: 'include'
                });
                const data = await res.json();
                if (res.ok) {
                    setCartItems(data);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCart();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="border p-4">
                            <p><strong>Product:</strong> {item.product.name}</p>
                            <p>Color: {item.product.color}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
