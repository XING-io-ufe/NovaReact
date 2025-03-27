import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, updateCartItem, removeFromCart } = useCart();

    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                <Link
                    to="/"
                    className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row border-b pb-4">
                        <div className="sm:w-1/4">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-32 object-cover rounded"
                            />
                        </div>
                        <div className="sm:w-3/4 sm:pl-6 mt-4 sm:mt-0">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                                    <p className="text-gray-600">Color: {item.color}</p>
                                    <p className="text-indigo-600">${item.product.price.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="mt-4 flex items-center">
                                <span className="mr-2">Qty:</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                                    className="border rounded px-2 py-1 w-16"
                                />
                            </div>

                            <div className="mt-2">
                                <p className="font-medium">
                                    Total: ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t pt-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
                </div>

                <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;