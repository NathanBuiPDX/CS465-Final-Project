const router = require('express').Router();
const Post = require('../models/Post');
const cookie = require('./cookie');
// multer takes the image data and stores it in memory

const s3Function = require('../s3helper/bucket');
// WRITE A NEW POST BY CURRENT USE
router.post('/', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      req.body.user_id = cookies['userId'];
      // AWS S3 LOGIC
      // req.file.buffer is our image that we send to S3
      const pic = req?.file?.buffer;
      // post image to S3BUCKET if the user did include an image
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
      const { __v, ...other } = post._doc;

      // if the pic is included, then extract the s3 URL and save it to image_url
      // store s3URL to frontEnd because we want to store the key in DB
      // must check if picture is included in request
      if (pic) {
        const s3pic = s3Object.url;
        other.image_url = s3pic;
      }
      // check if post objects ahve imageURl inside, if yes, call s3 function
      // getSignedURL from s3, res.status(200).json(other);
      res.status(200).json(other);
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
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
      // AWS S3 LOGIC
      // req.file.buffer is our image that we send to S3
      const pic = req?.file?.buffer;
      // post image to S3BUCKET if the user did include an image
      if (pic) {
        var s3Object = await s3Function.setImage(pic);
        // so we can store our s3Unique key in our DB
        req.body.image_url = s3Object.key;
      }


      await Post.findByIdAndUpdate({ _id: postId }, { $set: req.body });
      post = await Post.findById(postId);

      if (!post) {
        res.status(404).json(`Post not found`);
        return;
      }
      // eslint-disable-next-line no-unused-vars
      const { __v, ...other } = post._doc;
      // return s3URL to frontEnd
      if (pic || other.image_url) {
        const s3pic = await s3Function.getImage(other.image_url);
        other.image_url = s3pic;
      }

      res.status(200).json(other);
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error)
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
      console.log(postList);
      await Promise.all(
        postList.map(async (post) => {
          if (post.image_url) {
            post.image_url = await s3Function.getImage(post.image_url);
            console.log('getting images  ', post.image_url);
          }
        })
      );
      console.log(postList);
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
      const postList = await Post.find({ user_id: cookies['userId'] }).sort({
        updatedAt: -1,
      });
      if (!postList) {
        res.status(200).json(`No Post found`);
        return;
      }
      await Promise.all(
        postList.map(async (post) => {
          if (post.image_url) {
            post.image_url = await s3Function.getImage(post.image_url);
            console.log('getting images  ', post.image_url);
          }
        })
      );
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
      const postList = await Post.find({ user_id: userId }, { __v: 0 }).sort({
        updatedAt: -1,
      });
      if (!postList) {
        res.status(200).json(`No Post found`);
        return;
      }
      await Promise.all(
        postList.map(async (post) => {
          if (post.image_url) {
            post.image_url = await s3Function.getImage(post.image_url);
            console.log('getting images  ', post.image_url);
          }
        })
      );
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
      // delete image from S3 bucket first
      const post = await Post.findById(postId);
      console.log(post.image_url);
      // const deleted = await s3Function.deleteImage(post.image_url);
      // console.log(deleted);
      await Post.findByIdAndDelete(postId);

      res.status(200).json('Post deleted');
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
