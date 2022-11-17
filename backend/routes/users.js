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

function fetchCookies(req) {
    let cookies = {};
    req.headers &&
        req.headers.cookie &&
        req.headers.cookie.split(";").forEach(function (cookie) {
            console.log("cookie is:", cookie);
            if (cookie.match(/(.*?)=(.*)$/)) {
                const cookieSplit = cookie.match(/(.*?)=(.*)$/);
                cookies[cookieSplit[1].trim()] = (cookieSplit[2] || "").trim();
            }
            else {
                cookies = {};
            }
        });
    return cookies;
}

// UPDATE USER
router.put('/', async (req, res) => {
    try {
        const cookies = fetchCookies(req);
        if (cookies["user"]) {
            if (req.body.password) {
                try {
                    req.body.password = await generateHashedPwd(req.body.password);
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
            try {
                const loginId = cookies["user"];
                await User.findOneAndUpdate({ username: loginId }, { $set: req.body });
                res.status(200).json(req.body);
            } catch (err) { res.status(500).json(err); }
        } else {
            res.status(403).json("Unauthorized user");
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