const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: { userId: req.userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json(cart?.items || []);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, color, quantity } = req.body;

        // Find user's cart
        let cart = await prisma.cart.findFirst({
            where: { userId: req.userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: req.userId
                }
            });
        }

        // Check if product already in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: parseInt(productId),
                color
            }
        });

        if (existingItem) {
            // Update quantity if already exists
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) }
            });

            return res.json(updatedItem);
        }

        // Add new item to cart
        const newItem = await prisma.cartItem.create({
            data: {
                productId: parseInt(productId),
                quantity: parseInt(quantity),
                color,
                cartId: cart.id
            },
            include: {
                product: true
            }
        });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        const updatedItem = await prisma.cartItem.update({
            where: { id: parseInt(req.params.id) },
            data: { quantity: parseInt(quantity) },
            include: {
                product: true
            }
        });

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart item' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        await prisma.cartItem.delete({
            where: { id: parseInt(req.params.id) }
        });

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart' });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };