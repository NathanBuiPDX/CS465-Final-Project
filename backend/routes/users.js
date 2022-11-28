const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookie = require('./cookie');

const s3Function = require('../s3helper/bucket');

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// s3 for put profile image or coverImage
router.put('/cover_image', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      const mongoId = cookies['userId'];
      // query user inside mongoDB

      const user = await User.findById({ _id: mongoId });
      console.log(user);
      // delete old cover image

      // set the new cover image with s3 returned url (same logic as post instead of user.image_url it will user.cover_url)
      const pic = req?.file?.buffer;
      console.log('CoverFILE: ', pic);
      // post image to S3BUCKET if the user did include an image
      if (pic) {
        var s3Object = await s3Function.setImage(pic);

        // so we can store our s3Unique key in our DB
        user.cover_url = s3Object.key;
        await User.findByIdAndUpdate({ _id: mongoId }, { $set: user });
        user.cover_url = s3Object.url;
        if (user.icon_url) user.icon_url = await s3Function.getImage(user.icon_url);
        res.status(200).json(user);
      }
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
});

// use s3
router.put('/profile_image', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      const mongoId = cookies['userId'];
      // query user inside mongoDB

      const user = await User.findById({ _id: mongoId });
      console.log(user);
      // delete old cover image

      // set the new cover image with s3 returned url (same logic as post instead of user.image_url it will user.cover_url)
      const pic = req?.file?.buffer;
      console.log('ICON_FILE: ', pic);
      // post image to S3BUCKET if the user did include an image
      if (pic) {
        var s3Object = await s3Function.setImage(pic);

        // so we can store our s3Unique key in our DB
        user.icon_url = s3Object.key;
        await User.findByIdAndUpdate({ _id: mongoId }, { $set: user });
        user.icon_url = s3Object.url;
        if (user.cover_url) user.cover_url = await s3Function.getImage(user.cover_url);
        res.status(200).json(user);
      }
    }
    res.end();
  } catch (error) {
    console.log(error);
  }
});

// this route is only for text updating
// UPDATE CURRENT USER
router.put('/', async (req, res) => {
  if (req.body.gender && !User.schema.path('gender').enumValues.includes(req.body.gender)) {
    res.status(400).json('Gender values must be in male, female, other').end();
  }
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      if (req.body.password) {
        try {
          req.body.password = await generateHashedPwd(req.body.password);
        } catch (err) {
          res.status(500).json(err);
          return;
        }
      }
      try {
        const mongoId = cookies['userId'];
        await User.findByIdAndUpdate({ _id: mongoId }, { $set: req.body });
        const user = await User.findById({ _id: mongoId });
        // eslint-disable-next-line no-unused-vars
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        if (other.icon_url) other.icon_url = await s3Function.getImage(other.icon_url);
        if (other.cover_url) other.cover_url = await s3Function.getImage(other.cover_url);
        if (other.dob)
          other.dob = other.dob.toLocaleDateString('en-CA', options);
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL USERS
// s3
router.get('/all', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      try {
        const userList = await User.find({}, { password: 0 });
        // const results = userList.filter(user => user._id.toString() !== cookies['userId']);
        // if (!results) {
        //     res.status(404).json(`No other users except you`);
        //     return;
        // }
        await Promise.all(
          userList.map(async (user) => {
            if (user.icon_url) {
              user.icon_url = await s3Function.getImage(user.icon_url);
              console.log('getting images  ', user.icon_url);
            }
            if (user.cover_url) {
              user.cover_url = await s3Function.getImage(user.cover_url);
              console.log('getting images  ', user.cover_url);
            }
          })

        );
        res.status(200).json(userList);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ANOTHER USER
// s3
router.get('/:userId', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      try {
        const userId = req.params.userId;
        // const user = await User.findOne({ username: username });
        const user = await User.findById(userId);
        if (!user) {
          res.status(404).json(`User not found`);
          return;
        }
        // eslint-disable-next-line no-unused-vars
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        if (other.cover_url)
          other.cover_url = await s3Function.getImage(other.cover_url);
        if (other.icon_url)
          other.icon_url = await s3Function.getImage(other.icon_url);
        if (other.dob)
          other.dob = other.dob.toLocaleDateString('en-CA', options);
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET CURRENT USER
// s3
router.get('/', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      try {
        const mongoId = cookies['userId'];
        const user = await User.findById({ _id: mongoId });
        // eslint-disable-next-line no-unused-vars
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        if (other.cover_url)
          other.cover_url = await s3Function.getImage(other.cover_url);
        if (other.icon_url)
          other.icon_url = await s3Function.getImage(other.icon_url);
        if (other.dob)
          other.dob = other.dob.toLocaleDateString('en-CA', options);
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE CURRENT USER
router.delete('/', async (req, res) => {
  try {
    const cookies = cookie.fetchCookies(req);
    if (cookies['userId']) {
      try {
        const mongoId = cookies['userId'];
        await User.deleteOne({ _id: mongoId });
        res.clearCookie('userId');
        res.status(200).json('Account has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

async function generateHashedPwd(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

module.exports = router;
