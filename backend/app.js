const express = require('express');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(express.json());


app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);


app.use(
    session({
        secret: 'my_super_secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
        },
    })
);

// ------------------ Auth Routes ------------------ //

// Register
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });


        req.session.userId = user.id;

        return res.json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        req.session.userId = user.id;
        return res.json({ message: 'Logged in successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Login failed' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logged out successfully' });
    });
});

// Middleware authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({ error: 'Not authenticated' });
}

// ------------------ Product Routes ------------------ //

// Create a product (protected)
app.post('/api/products', isAuthenticated, async (req, res) => {
    const { name, color, quantity, price, imageUrl } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, color, quantity, price, imageUrl },
        });
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create product' });
    }
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get product detail
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// ------------------ Cart Routes ------------------ //

// Add to cart (protected)
app.post('/api/cart', isAuthenticated, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.userId;
    try {

        const existingItem = await prisma.cartItem.findFirst({
            where: { userId, productId },
        });
        if (existingItem) {

            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
            return res.json(updatedItem);
        } else {
            const newItem = await prisma.cartItem.create({
                data: {
                    userId,
                    productId,
                    quantity,
                },
            });
            return res.json(newItem);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add to cart' });
    }
});

// Get user's cart (protected)
app.get('/api/cart', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
        return res.json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// ------------------ Profile Route ------------------ //

// Protected route to get user profile
app.get('/api/profile', isAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// ------------------ Start Server ------------------ //
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
