const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const cookie = require("./cookie");

router.post('/other', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['user']) {
            res.status(200).json('Authorized user');
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


//for put profile image or coverImage
router.put('/cover_image', async (req, res) => {
    try {
           const cookies = cookie.fetchCookies(req); 
               if (cookies["userId"]) {
                   const pic = req?.file?.buffer;
                   if (pic) {
                       const mongoId = cookies["userId"];
                       //query user inside mongoDB

                       const user = await User.findById({ _id: mongoId });
                       console.log(user)
                       //delete old cover image
                       
                       //set the new cover image with s3 returned url (same logic as post instead of user.image_url it will user.cover_url)
                    }
                } 
    } catch (error) {
        console.log(error)
        
    }

    
})

router.put("/profile_image", async (req, res) =>{

})
// UPDATE CURRENT USER
router.put("/", async (req, res) => {
    if (!User.schema.path("gender").enumValues.includes(req.body.gender)) {
    res
        .status(400)
        .json("Gender values must be in male, female, other")
        .end();
    }
    try {
    const cookies = cookie.fetchCookies(req);
    if (cookies["userId"]) {
        if (req.body.password) {
        try {
            req.body.password = await generateHashedPwd(req.body.password);
        } catch (err) {
            res.status(500).json(err);
            return;
        }
        }
        try {
        const mongoId = cookies["userId"];
        await User.findByIdAndUpdate({ _id: mongoId }, { $set: req.body });
        const user = await User.findById({ _id: mongoId });
        // eslint-disable-next-line no-unused-vars
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        res.status(200).json(other);
        } catch (err) {
        res.status(500).json(err);
        }
    } else {
        res.status(403).json("Unauthorized user");
    }
    } catch (error) {
    res.status(500).json(error);
    }
});

// GET ALL USERS
router.get('/all', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            try {
                const userList = await User.find({}, { _id: 1, full_name: 1, name: 1 });
                // const results = userList.filter(user => user._id.toString() !== cookies['userId']);
                // if (!results) {
                //     res.status(404).json(`No other users except you`);
                //     return;
                // }
                res.status(200).json(userList);
            } catch (err) { res.status(500).json(err); }
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ANOTHER USER
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
                res.status(200).json(other);
            } catch (err) { res.status(500).json(err); }
        } else {
            res.status(403).json('Unauthorized user');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET CURRENT USER
router.get('/', async (req, res) => {
    try {
        const cookies = cookie.fetchCookies(req);
        if (cookies['userId']) {
            try {
                const mongoId = cookies['userId'];
                const user = await User.findById({ _id: mongoId });
                // eslint-disable-next-line no-unused-vars
                const { password, createdAt, updatedAt, __v, ...other } = user._doc;
                res.status(200).json(other);
            } catch (err) { res.status(500).json(err); }
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
            } catch (err) { res.status(500).json(err); }
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