const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true, },
    post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true, },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('likes', LikeSchema);