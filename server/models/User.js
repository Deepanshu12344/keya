import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be at least 5 characters long']
    }
});

const User = mongoose.model('User', userSchema);
export default User;