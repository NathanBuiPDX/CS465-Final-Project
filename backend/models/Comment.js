const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true, },
    post_id: { type: Schema.Types.ObjectId, ref: "posts", required: true, },
    text: {
        type: String,
        max: 150,
        required: true,
    },
    parent_comment_id: { type: Schema.Types.ObjectId, ref: "comments", },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('comments', CommentSchema);