import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();

app.use(bodyParser.json());

const PORT = process.env.PORT || 7000;
const MONGO = process.env.MONGO_URL;

mongoose.connect(MONGO)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => 
      console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// User Model

const User = mongoose.model("Users", UserSchema);




// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// On successful login


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  dish: String,
  quantity: Number,
  address: String,
});

const Order = mongoose.model('Order', orderSchema);

// Routes
app.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reservation Schema and Model
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  guests: Number,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Routes
app.post('/reservations', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use(express.static('public'));

export default app;