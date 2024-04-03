const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('./models/User.js')
router.get('/register', async (req, res) => {
    res.render('auth/register.njk')
});
router.post('/register', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (req.body.pasword !== req.body.password_confirm || user) {
        res.redirect('/register');
    } else {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.redirect('/')
    }
});

router.get('/login', async (req, res) => {
    res.render('auth/login.njk')
});
router.post('/login', async (req, res) => {
    let user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.redirect('/login');

    } else{
        req.session.user = user;
        res.redirect('/')
    }

});
module.exports = router;