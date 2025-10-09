// controllers/usersController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/usersModel.js';

// ✅ Register User
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);

    res.status(201).json({
      message: 'User registered',
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
