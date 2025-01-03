const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Database connection
const connecttomongo = require("./db");
connecttomongo();

// CORS Middleware
app.use((req, res, next) => {
    // Allow frontend origin (change if needed)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 

    // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    // Allow specific headers
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Handle preflight request (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();  // Respond with OK status for OPTIONS request
    }

    next(); // Proceed to the next middleware/route handler
});


app.use(express.json());

// Routes
app.use('/api/', require("./routes/CreateUser"));
app.use('/api/', require("./routes/ShopsData"));
app.use('/api/cart', require("./routes/cartRouter"));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
    } else {
        console.error(err);
    }
});

