import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator  from 'validator';

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email '
           }
    },
    mobileNumber: {
        type:String,
        required:true,
        validate:{
            validator:validator.isMobilePhone,
            message:'{VALUE} is not a valid mobile number '
           },
    },
    password: {
        type:String,
        required:true,
       minlength:8
    },
    status: {
        type:String,
       default:'online'
       
    },
    recoveryEmail: {
        type:String,
        required:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email '
           }
    },
    
    lastName: {
        type:String,
        required:true,
       
    },
    firstName: {
        type:String,
        required:true,
       
    },
});

userSchema.methods.generateHash = async function(password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
