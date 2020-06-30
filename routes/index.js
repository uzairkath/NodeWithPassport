const express = require('express');
const router = express.Router();
const ensure = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    });
})
 router.get('/', (req, res) => {
     res.render("welcome")
 })

 
 module.exports = router;