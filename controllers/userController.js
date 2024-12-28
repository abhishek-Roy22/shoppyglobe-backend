import { verifyToken } from '../generateToken.js';
import User from '../models/userModel.js';

// define function to create new user
export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // checking the user is already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: 'User already exist with this email' });
    }
    // if not create new user
    const newUser = await User.create({
      userName,
      email,
      password, // password is incrypted in userSchema
    });

    return res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // matchpassword function is defined in userSchema
    const token = await User.matchPasword(email, password);
    // verify the token by passing token give function
    const payload = verifyToken(token);
    return res
      .status(200)
      .json({ message: 'login successful', user: payload, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
