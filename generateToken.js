import jwt from 'jsonwebtoken';

const securityKey = 'Abhishek-Kumar'; // security key

function generateToken(user) {
  const payload = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
  };

  // generating token
  const token = jwt.sign(payload, securityKey, { expiresIn: '1h' });

  return token;
}

// verifying the token when every user make new request
function verifyToken(token) {
  const payload = jwt.verify(token, securityKey);

  return payload;
}

export { generateToken, verifyToken };
