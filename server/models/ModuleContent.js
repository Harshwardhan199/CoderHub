const mongoose = require('mongoose');

const ModuleContentSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        index: true,
        lowercase: true
    },
    type: {
        type: String,
        required: true,
        enum: ['basics', 'intermediate', 'advanced', 'practice', 'interview', 'projects', 'roadmap']
    },
    content: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

// Composite index for fast lookups
ModuleContentSchema.index({ language: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('ModuleContent', ModuleContentSchema);
