const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Document = require('../models/documents');
const verifyToken = require('../middleware/accessToken');
const process = require('dotenv').config();
const upload = require('../middleware/storage');
const hashPassword = require('../middleware/hash');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, process.parsed.SECRET_KEY);
    res.json({ "token": token, "username": user.username });
});

router.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        const hashedPassword = await hashPassword(password);
        const user = { name, username, password: hashedPassword }
        const data = await User.create(user);
        await data.save();
        if (data) {
            res.status(201).json({ message: 'User registered successfully' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getall', verifyToken.verifyToken(), async (req, res) => {
    try {
        const data = await Document.find(); // Replace with the appropriate method for fetching users
        res.status(200).json({ userData: data, message: 'Data retrieved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/fileUpload', verifyToken.verifyToken(), upload.single('image'), async (req, res) => {
    try {
        const image = req.file;
        const imagename = image ? image.filename : null;
        const { businessname, businesstype, country, state, city, postalcode, address, mobile, currentaddress, businessdesc, businessmail, businessweb } = req.body;
        const reqData = { businessname, businesstype, country, state, city, postalcode, address, mobile, currentaddress, businessdesc, businessmail, businessweb }
        const data = await Document.create(reqData);
        await data.save();
        if (data) {
            res.status(201).json({
                message: 'Upload successful',
                image: image ? imagename : null
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


});


router.get('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});



module.exports = router;
