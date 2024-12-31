// location-address-flow/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/location-address-backend";

// Middleware
app.use(cors());  // This allows cross-origin requests from React app
app.use(bodyParser.json());  // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error: ", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    }
  ]
});

const User = mongoose.model('User', userSchema);

// Address Schema
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const Address = mongoose.model('Address', addressSchema);

// POST: Register User
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user', details: error });
  }
});

// POST: Add Address to User
app.post('/add-address', async (req, res) => {
  const { userId, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

  try {
    // Create new address
    const newAddress = new Address({
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();

    // Find user and add address
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.addresses.push(newAddress);
    await user.save();

    res.status(200).json({ message: 'Address added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding address', details: error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
