import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordHash: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function() {
    if (this.password) {
        this.passwordHash = bcrypt.hash(this.password, 8);
        this.password = undefined;
    }
})

export default new model('Users', UserSchema);