const router = require('express').Router();
const Like = require('../models/Like');
const Post = require('../models/Post');
const cookie = require("./cookie");

// LIKE/UNLIKE A POST BY CURRENT USER
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
            let like = await Like.findOne({ post_id: req.body.post_id, user_id: req.body.user_id });
            console.log(like);
            if (!like) {
                const newLike = new Like(req.body);
                like = await newLike.save();
                await Post.findByIdAndUpdate({ _id: req.body.post_id }, { $inc: { like_count: 1 } });
                // eslint-disable-next-line no-unused-vars
                const { __v, ...other } = like._doc;
                res.status(200).json(like);
            } else {
                await Post.findByIdAndUpdate({ _id: req.body.post_id }, { $inc: { like_count: -1 } });
                await Like.findByIdAndDelete(like._id);
                res.status(200).json("Like deleted");
            }
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;