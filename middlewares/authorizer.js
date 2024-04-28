const bcrypt = require('bcrypt');
require('dotenv').config();
const { userModel } = require('../models/userModel');

const authorize = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    // Check if user is registered.
    if (!user) {
        return res.status(404).json({message: "Account does not exist"});
    }

    req.user = user;

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({message: "Something went wrong, please try again"});
        }
    
        if (result) {
            next(); // Passwords match, proceed to next middleware
        } else {
            return res.status(401).json({message: "password incorrect"});
        }
    });
}

module.exports = {
    authorize,
}