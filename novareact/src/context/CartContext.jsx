import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { token } = useAuth();

    const fetchCart = async () => {
        if (!token) return;
        try {
            const response = await axios.get('http://localhost:5000/api/cart');
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const addToCart = async (productId, color, quantity) => {
        try {
            await axios.post('http://localhost:5000/api/cart', { productId, color, quantity });
            await fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity });
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);