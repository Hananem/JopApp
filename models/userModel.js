const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: String,
    mobileNumber: Number, 
    password: String,
    status: String,
    recoveryEmail: String,
    DOB: Date,
    lastName: String,
    firstName: String
});

userSchema.methods.generateHash = async function(password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
