const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER USER
router.post('/register', async (req, res) => {

    try {
        const hashedPassword = await generateHashedPwd(req.body.password);
        const newUser = createNewUser(req.body.username, hashedPassword);
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;

function createNewUser(username, password) {
    return new User({
        username: username,
        password: password
    });
}

async function generateHashedPwd(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
