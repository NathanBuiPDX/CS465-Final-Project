const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true, },
    image_url: {
        type: String,
        max: 100,
    },
    caption: {
        type: String,
        max: 150,
    },
    like_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('posts', PostSchema);