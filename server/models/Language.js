const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, lowercase: true },
    displayName: { type: String, required: true },
    type: { type: String, default: "Programming Language" },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    stats: {
        modules: { type: String, default: "?" },
        topics: { type: String, default: "?" },
        projects: { type: String, default: "?" }
    },
    orbs: [{
        color: String,
        position: String,
        size: String,
        delay: String
    }],
    cards: [{
        title: String,
        description: String,
        icon: String, // Store emoji or icon name as string
        color: String,
        topics: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);
