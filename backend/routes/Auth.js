const express = require('express')
const { body, validationResult } = require('express-validator')
const User = require('../modals/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "shhh";
//route 1 : create a user using POST method "/api/user".
router.post('/signup', [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password must be 5 digit").isLength({ min: 5 }),

], async (req, res) => {
    const result = validationResult(req);
    const { email, password, name } = req.body;

    const id = await User.findOne({ email: email })
    if (id) {
        res.send("email already exist")
    }
    else {
        if (!result.isEmpty()) {

            res.status(400).json({ errors: result.array([]) });
        }
        else {
            // User.insertMany([data]).then(data => res.send(data.id));       
            //   instead of using above logic use below logic to get user id

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt);
            const data = new User({
                email,
                password: hashpass,
                name
            })
            const savedUser = await data.save();
            const tocken = {
                savedUser: {
                    id: savedUser.id
                }
            }
            
            const authtocken = jwt.sign(tocken, JWT_SECRET);
            res.status(201).json({ authtocken });
        }
    }
})



//route 2 :  login an user using account no. and password using post method 
router.post('/login', [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {

        return res.status(400).json({ errors: result.array([]) });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (user) {
            // bcrypt.compare is inbuilt function in bcrypt package to comapre password hash from all existing hashes
            const comparepass = await bcrypt.compare(password, user.password);

            if (!comparepass) {
                return res.status(400).json({ error: "please try to login with correct credentials" });
            }

            else {
                const tocken = {
                    user: {
                        id: user.id
                    }
                }
               
                const authtocken = jwt.sign(tocken, JWT_SECRET);
                res.status(201).json({ authtocken });
            }

        }

        else if (!user) {
            return res.status(400).json({ error: "please try to log in with correct credentials" });
        }

        else {
            res.send("invalid credentials")
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json("internal server error occured")
    }

})

// route 3 : get user logged in details "login required"
router.post('/getuser',fetchuser , async (req, res) => {

// fetchuser is a middleware which is created to decode the id from the web tocken

    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select('-password')
        res.send(user)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json("internal server error occured")
    }
})


module.exports = router
