const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// LOGOUT
router.post('/logout', async (req, res) => {
    res.clearCookie('userId');
    res.status(200).json('logout');
});

// LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const loginId = req.body.username;
        const user = await User.findOne({ username: loginId });
        if (!user) {
            res.status(404).json(`User not found with Username : ${loginId}`);
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json(`Wrong Password!`);
            return;
        }
        // cookie set for 15 mins
        res.cookie('userId', user._id.toString(), { maxAge: 900000 });
        // eslint-disable-next-line no-unused-vars
        const { password, createdAt, updatedAt, __v, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
});

// REGISTER USER
router.post('/register', async (req, res) => {
    try {
        if (req.body.username && req.body.password && req.body.name && req.body.full_name) {
            req.body.password = await generateHashedPwd(req.body.password);
            const newUser = new User(req.body);
            const user = await newUser.save();
            // eslint-disable-next-line no-unused-vars
            const { password, createdAt, updatedAt, __v, ...other } = user._doc;
            res.status(200).json(other);
        } else {
            res.status(400).json('Required field is empty');
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