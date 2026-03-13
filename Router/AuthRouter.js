const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../Model/UserModel");
const generateToken = require("../utils/generateToken");



// register
router.post("/register", async (req, res, next) => {

try {

const { name, email, password } = req.body;

const userExists = await User.findOne({ email });

if (userExists) {
return res.status(400).json({
message: "User already exists"
});
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
name,
email,
password: hashedPassword
});

res.json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});

} catch (err) {
next(err);
}

});


// login
router.post("/login", async (req, res, next) => {

try {

const { email, password } = req.body;

const user = await User.findOne({ email });

if (!user) {
return res.status(400).json({
message: "Invalid credentials"
});
}

const match = await bcrypt.compare(password, user.password);

if (!match) {
return res.status(400).json({
message: "Invalid credentials"
});
}

res.json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});

} catch (err) {
next(err);
}

});

module.exports = router;