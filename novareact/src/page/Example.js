import React, { useState } from "react";
import ProductList from "./../components/ProductList";
import Cart from "./../components/Cart";
import "../App.css";

function Example() {
    // Сагсны төлөв хадгалах (id, name, price, quantity) массын хэлбэртэй
    const [cart, setCart] = useState([]);

    // Сагс нээх/хаах төлөв
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Жишээ бүтээгдэхүүний жагсаалт
    const products = [
        { id: 1, name: "Product A", price: 1000 },
        { id: 2, name: "Product B", price: 2000 },
        { id: 3, name: "Product C", price: 3000 },
    ];

    // 1) Бүтээгдэхүүн сагсанд нэмэх
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // Өмнө нь байвал тоог 1-ээр нэмэгдүүлнэ
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Байгаагүй бол шинээр quantity=1-ээр нэмнэ
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // (+) Бүтээгдэхүүний тоог нэмэх
    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        );
    };

    // (–) Бүтээгдэхүүний тоог хасах
    const decrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === id && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
                // Хэрэв 0 болсон бол тухайн барааг сагсаас бүрэн хасах
                .filter((item) => item.quantity !== 0)
        );
    };

    // Тухайн барааг бүрэн устгах
    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Сагсыг бүрэн хоослох
    const clearCart = () => {
        setCart([]);
    };

    // Сагсанд байгаа нийт тоо ширхэг
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="App">
            <header className="App-header">
                <h1>My E-commerce Site</h1>
                {/* Сагсны товч (Cart (X)) */}
                <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
                    Cart ({totalItems})
                </button>
            </header>

            {/* Бүтээгдэхүүний жагсаалт */}
            <ProductList products={products} addToCart={addToCart} />

            {/* Сагс нээгдсэн үед л Cart компонентийг харуулна */}
            {isCartOpen && (
                <Cart
                    cart={cart}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    removeItem={removeItem}
                    clearCart={clearCart}
                />
            )}
        </div>
    );
}

export default Example;
