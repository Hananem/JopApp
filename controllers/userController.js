const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

exports.signup = async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            mobileNumber:req.body.mobileNumber,
            password: hashedPassword,
            status:'online',
            recoveryEmail:req.body.recoveryEmail,
            DOB:req.body.DOB,
        })
        await user.save();
        res.status(201).send("User created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

exports.signin = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const user = await User.findOne({ $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }] });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            return res.status(401).send("Invalid password");
        }
        user.status = 'online';
        await user.save();
        res.status(200).send("Sign in successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateAccount = async (req, res) => {
    try {
        const user = req.user;
        user.email = req.body.email || user.email;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
        user.recoveryEmail = req.body.recoveryEmail || user.recoveryEmail;
        user.DOB = req.body.DOB || user.DOB;
        user.lastName = req.body.lastName || user.lastName;
        user.firstName = req.body.firstName || user.firstName;
        await user.save();
        res.status(200).send("Account updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.params.userId; 
        await User.deleteOne({ _id: userId });

        res.status(200).send("Account deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllUsersData = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



exports.getProfileForUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobileNumber: user.mobileNumber
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const userId = req.params.userId; // Retrieve user ID from request parameters
        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare the provided current password with the user's current password
        const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).send("Invalid current password");
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        
        // Update user's password with the hashed new password
        user.password = hashedNewPassword;
        
        // Save the updated user object
        await user.save();

        res.status(200).send("Password updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.forgetPassword = async (req, res) => {
    try {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        res.status(200).json({ OTP: OTP });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAccountsByRecoveryEmail = async (req, res) => {
    try {
        const users = await User.find({ recoveryEmail: req.params.recoveryEmail });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};