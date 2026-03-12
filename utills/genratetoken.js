const jwt = require('jsonwebtoken');

const genrateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = genrateToken;