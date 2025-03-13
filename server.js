const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const propertyRoutes = require('./routes/propertyRoutes');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api/properties', propertyRoutes);

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
};

connectDB();

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
