const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

// Dummy data storage for users (in real applications, you would use a database)
let users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Register endpoint
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.send('Registration Successful!');
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.send('Login Successful!');
    } else {
        res.send('Invalid Credentials');
    }
});

// Route to get current user points (for loyalty program)
app.get('/get-user-points', (req, res) => {
    if (req.session.user) {
        res.json({ points: req.session.user.points || 0 });
    } else {
        res.send('Please log in');
    }
});

// Add loyalty points
app.post('/add-points', (req, res) => {
    const { userId, points } = req.body;
    const user = users.find(u => u.email === userId);
    if (user) {
        user.points = (user.points || 0) + points;
        res.send('Points Added!');
    } else {
        res.send('User not found');
    }
});

// Redeem loyalty points
app.post('/redeem-points', (req, res) => {
    const { userId, pointsToRedeem } = req.body;
    const user = users.find(u => u.email === userId);
    if (user && user.points >= pointsToRedeem) {
        user.points -= pointsToRedeem;
        res.send('Points Redeemed!');
    } else {
        res.send('Insufficient points');
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


// Add points when a user makes a booking
app.post('/add-points', (req, res) => {
    const { userId, points } = req.body;
    const user = users.find(u => u.email === userId);
    if (user) {
        user.points = (user.points || 0) + points;
        res.send('Points Added!');
    } else {
        res.send('User not found');
    }
});

// Redeem points
app.post('/redeem-points', (req, res) => {
    const { userId, pointsToRedeem } = req.body;
    const user = users.find(u => u.email === userId);
    if (user && user.points >= pointsToRedeem) {
        user.points -= pointsToRedeem;
        res.send('Points Redeemed!');
    } else {
        res.send('Insufficient points');
    }
});
