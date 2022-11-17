const router = require('express').Router();
const Post = require('../models/Post');
const cookie = require("./cookie");

// WRITE A NEW POST
router.post('/', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            req.body.user_id = cookies['userId'];
            const newPost = new Post(req.body);
            const post = await newPost.save();
            // eslint-disable-next-line no-unused-vars
            const { createdAt, updatedAt, __v, ...other } = post._doc;
            res.status(200).json(other);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE A POST BY CURRENT USER
router.put('/:postId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const postId = req.params.postId;
        if (cookies['userId']) {
            const post = await Post.findById(postId);
            if (!post) {
                res.status(404).json(`Post not found`);
                return;
            }
            await Post.findByIdAndUpdate({ _id: postId }, { $set: req.body });
            res.status(200).json('Post Updated');
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;