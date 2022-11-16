const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/other', async (req, res) => {
    try {
        const cookies = fetchCookies(req);
        if (cookies["user"]) {
            res.status(200).json("Authorized user");
        } else {
            res.status(403).json("Unauthorized user");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('user');
    res.status(200).json("logout");
});

router.post('/login', async (req, res) => {
    try {
        const loginId = req.body.username;
        const user = await User.findOne({ username: loginId });
        if (!user) res.status(404).json(`User not found with Username : ${loginId}`);

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) res.status(400).json(`Wrong Password!`);

        res.cookie("user", user.username, { maxAge: 360000 });
        res.status(200).json(user);
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
            res.status(200).json(user);
        } else {
            res.status(400).json('Required field is empty');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

function fetchCookies(req) {
    let cookies = {};
    req.headers &&
        req.headers.cookie &&
        req.headers.cookie.split(";").forEach(function (cookie) {
            console.log("cookie is:", cookie);
            if (cookie.match(/(.*?)=(.*)$/)) {
                const cookieSplit = cookie.match(/(.*?)=(.*)$/);
                console.log(cookieSplit);
                cookies[cookieSplit[1].trim()] = (cookieSplit[2] || "").trim();
            }
            else {
                cookies = {};
            }
        });
    return cookies;
}

async function generateHashedPwd(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports = router;