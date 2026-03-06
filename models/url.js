const Mongoose = require('mongoose');

const urlSchema = new Mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            },
            // userAgent: String,
            // ipAddress: String
        }
    ]
}, {timestamps : true});

const Url = Mongoose.model('url', urlSchema);

module.exports = Url;