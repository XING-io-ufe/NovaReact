import React from "react";

function Cart({ cart, incrementQuantity, decrementQuantity, removeItem, clearCart }) {
    // Нийт дүн (price * quantity)-ийн нийлбэр
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-panel">
            <h2>Cart Items</h2>

            {cart.length === 0 ? (
                <p>Сагс хоосон байна.</p>
            ) : (
                cart.map((item) => (
                    <div key={item.id} style={{ marginBottom: "0.5rem" }}>
                        <strong>{item.name}</strong> - {item.price}₮ x {item.quantity}{" "}
                        <button onClick={() => incrementQuantity(item.id)}>+</button>
                        <button onClick={() => decrementQuantity(item.id)}>-</button>
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                ))
            )}

            <hr />
            <h3>Нийт дүн: {totalPrice}₮</h3>
            <button onClick={clearCart}>Сагсыг хоослох</button>
            <button style={{ marginLeft: "1rem" }}>Payment</button>
        </div>
    );
}

export default Cart;
