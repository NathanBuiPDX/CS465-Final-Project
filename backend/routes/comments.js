const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const cookie = require("./cookie");

// WRITE A NEW COMMENT BY CURRENT USER
router.post('/', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            const post = await Post.findById(req.body.post_id);
            if (!post) {
                res.status(404).json(`Post not found`);
                return;
            }
            req.body.user_id = cookies['userId'];
            const newComment = new Comment(req.body);
            const comment = await newComment.save();
            await Post.findByIdAndUpdate({ _id: req.body.post_id }, { $inc: { comments_count: 1 } });
            // eslint-disable-next-line no-unused-vars
            const { __v, ...other } = comment._doc;
            res.status(200).json(other);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE A COMMENT BY CURRENT USER
router.put('/:commentId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const commentId = req.params.commentId;
        if (cookies['userId']) {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                res.status(404).json(`Comment not found`);
                return;
            }
            if (comment.user_id.toString() !== cookies['userId']) {
                res.status(403).json('You are not authorized to update this comment');
                return;
            }
            await Comment.findByIdAndUpdate({ _id: commentId }, { $set: req.body });
            res.status(200).json('Comment Updated');
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POST OF ANOTHER USER
router.get('/posts/:postId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const postId = req.params.postId;
        if (cookies['userId']) {
            const commentList = await Comment.find({ post_id: postId }, { __v: 0 });
            res.status(200).json(commentList);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;