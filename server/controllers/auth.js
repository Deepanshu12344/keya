import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      authProvider = 'local', // 'local' or 'google'
      providerId, // Only for Google OAuth users
    } = req.body;

    // If registering with email/password
    if (authProvider === 'local') {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        authProvider,
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }

    // If registering via Google OAuth
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).json(userExists);
    }

    const googleUser = new User({
      name,
      email,
      authProvider: 'google',
      providerId,
      password: '', // Not applicable
    });

    const savedGoogleUser = await googleUser.save();
    return res.status(201).json(savedGoogleUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, authProvider = 'local', providerId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Local login
    if (authProvider === 'local') {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      const { password: pw, ...userData } = user._doc;
      return res.status(200).json({ token, user: userData });
    }

    // Google OAuth login
    if (authProvider === 'google') {
      if (user.authProvider !== 'google' || user.providerId !== providerId) {
        return res.status(401).json({ message: 'Google authentication mismatch' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ token, user });
    }

    return res.status(400).json({ message: 'Invalid authentication method' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
