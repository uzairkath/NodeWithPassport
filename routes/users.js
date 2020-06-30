const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const user = require('../models/Users');
const User = require('../models/Users');

 router.get('/login', (req, res) => {
     res.render('login')
 })

 router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    let errors = [];

    if(!name || !password || !password2){
        errors.push({msg: 'passwords do not match'})
    }
    if(!email){
        errors.push({msg: 'Please Enter Valid Email'})
    }
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' })
    }
    if(password.length < 6){
        errors.push({ msg: "Password should be atleast 6 characters" })
    }
    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })

        console.log(errors)
    }
    else {
    // Validation passes
        User.findOne({email: email})
        .then(user => {
            if(user){
                errors.push({ msg: 'Email is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
        
            } else{
                const newUser = new User({
                    name,
                    email,
                    password 
                })
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registered and can log in')
                        res.redirect('login')
                        console.log(newUser)
                    })
                    .catch(err => console.log(err))

                }))
            }
        })
        }
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: 'login',
            failureFlash: true
        })(req, res, next);
    })
    router.get('/logout', (req, res, next) => {
        req.logOut();
        req.flash('success_msg', 'You are logged out')
        res.redirect('login');
    })

 module.exports = router;