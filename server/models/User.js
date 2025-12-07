const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // Password is not required if using Google Auth
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    avatar: {
        type: String,
        default: ''
    },
    role_description: {
        type: String,
        default: 'Student'
    },
    phone: {
        type: String
    },
    progress: {
        // Map language/course ID to progress percentage or module details
        type: Map,
        of: new mongoose.Schema({
            completedModules: [String],
            currentModule: String,
            percentComplete: { type: Number, default: 0 },
            lastAccessed: { type: Date, default: Date.now }
        }),
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
