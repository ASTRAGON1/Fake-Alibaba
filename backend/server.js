const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet'); // for security
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const reviewRoutes = require('./routes/review');
const wishlistRoutes = require('./routes/wishlist');
const messageRoutes = require('./routes/message');
const notificationRoutes = require('./routes/notification');

dotenv.config();

connectDB();
// constants here:
const app = express();
const limiter = rateLimit({ //this limits the amount of requestion the system gets every 15 min
    windowMs: 15 * 60 * 1000,
    max: 100,
})

// middlewares here:
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/', limiter);

// routes here:
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/notification', notificationRoutes);

// default route
app.get('/', (req, res) => {
    res.send('Fake-Alibaba API is running...');
});

// server port starter
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});