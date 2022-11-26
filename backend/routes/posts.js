const router = require('express').Router();
const Post = require('../models/Post');
const cookie = require("./cookie");
// multer takes the image data and stores it in memory
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const s3Function = require('../s3helper/bucket')
// WRITE A NEW POST BY CURRENT USE
router.post("/", upload.single('imageFile'), async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies["userId"]) {
      req.body.user_id = cookies["userId"];
      // AWS S3 LOGIC
      // req.file.buffer is our image that we send to S3
      const pic =  req.file.buffer;

      console.log("FILE: ", pic);
      // post image to S3BUCKET
      if (pic) {
                var s3Object = await s3Function.setImage(pic);
                // so we can store our s3Unique key in our DB
                req.body.image_url = s3Object.key;
        }
      // DB LOGIC
      // this is where we store imageKey in DB
      const newPost = new Post(req.body);
      const post = await newPost.save();
      // eslint-disable-next-line no-unused-vars
      const { createdAt, updatedAt, __v, ...other } = post._doc;

      // store s3URL to frontEnd because we want to store the key in DB
      const s3pic = s3Object.url;
      other.image_url = s3pic
      res.status(200).json(other);
    } else {
      res.status(403).json("Unauthorized user");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
  }
});

// UPDATE A POST BY CURRENT USER
router.put('/:postId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const postId = req.params.postId;
        if (cookies['userId']) {
          let post = await Post.findById(postId);
          if (!post) {
            res.status(404).json(`Post not found`);
            return;
          }

          await Post.findByIdAndUpdate({ _id: postId }, { $set: req.body });
          post = await Post.findById(postId);

          if (!post) {
            res.status(404).json(`Post not found`);
            return;
          }
        
          // eslint-disable-next-line no-unused-vars
          const { __v, ...other } = post._doc;
          //return s3URL to frontEnd

       

          res.status(200).json(other);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POST OF ALL USER
router.get('/all', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            const postList = await Post.find({}).sort({ updatedAt: -1 });
            if (!postList) {
                res.status(200).json(`No Post found`);
                return;
            }
            res.status(200).json(postList);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POST OF CURRENT USER
router.get('/', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            const postList = await Post.find({ user_id: cookies['userId'] }).sort({ updatedAt: -1 });
            if (!postList) {
                res.status(200).json(`No Post found`);
                return;
            }
            res.status(200).json(postList);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL POST OF ANOTHER USER
router.get('/users/:userId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const userId = req.params.userId;
        if (cookies['userId']) {
            const postList = await Post.find({ user_id: userId }, { __v: 0 }).sort({ updatedAt: -1 });
            if (!postList) {
                res.status(200).json(`No Post found`);
                return;
            }
            res.status(200).json(postList);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET A POST BY POSTID
router.get('/:postId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const postId = req.params.postId;
        if (cookies['userId']) {
            const post = await Post.findById(postId);
            if (!post) {
                res.status(404).json(`Post not found`);
                return;
            }
            // eslint-disable-next-line no-unused-vars
            const { __v, ...other } = post._doc;
            res.status(200).json(other);
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE A POST
router.delete('/:postId', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        const postId = req.params.postId;
        if (cookies['userId']) {
            await Post.findByIdAndDelete(postId);
            res.status(200).json('Post deleted');
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;