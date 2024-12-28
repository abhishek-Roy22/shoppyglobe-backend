import { Schema, model } from 'mongoose';
import bycrypt from 'bcryptjs';
import { generateToken } from '../generateToken.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// incrypted the password before saving to the db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // checking password is different or not
    return next();
  }

  const salt = await bycrypt.genSalt(10); // generate salt
  this.password = await bycrypt.hash(this.password, salt); // update the plane password with hash password
  next(); // proceed to the next middleware or next route
});

// verify the password in login process
userSchema.static('matchPasword', async function (email, password) {
  // check user exist with this email or not
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const hashedPassword = user.password; // getting hashedpassword from user

  // compare the hashedPassword with provided password
  const isMatch = await bycrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new Error('Invalid Password');
  }

  // get token from generatetoken function
  const token = generateToken(user);

  return token;
});

const User = model('User', userSchema);

export default User;
