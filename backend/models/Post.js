const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        min: 6
    },
    image_url: {
        type: String,
        max: 100,
    },
    caption: {
        type: String,
        max: 150,
        required: true,
    },
    like_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('posts', PostSchema);