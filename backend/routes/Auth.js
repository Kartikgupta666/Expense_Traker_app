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
    const success = false;
    const result = validationResult(req);
    const { email, password, name } = req.body;

    const id = await User.findOne({ email: email })
    if (id) {
        res.send("email already exist")
    }
    else {
        if (!result.isEmpty()) {

            res.status(400).json({ success, errors: result.array([]) });
        }
        else {
            // User.insertMany([data]).then(data => res.send(data.id));       
            //   instead of using above logic use below logic to get user id

            const salt = await bcrypt.genSalt(10); //adding salt
            const hashpass = await bcrypt.hash(password, salt); //make password hash and save in DB

            const data = new User({
                email,
                password: hashpass,
                name
            })
            const user = await data.save();
            const Token = {
                user: {
                    id: user.id
                }
            }
            // console.log(Token)

            // finding account number of the recently saved query and send to user for further login process 
            const success = true
            const authToken = jwt.sign(Token, JWT_SECRET);
            res.status(201).json({ success, authToken });

        }
    }
})



//route 2 :  login an user using account no. and password using post method 
router.post('/login', [
    body("email", "enter an valid email").isEmail(),
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
                success = false
                return res.status(400).json({ success, error: "please try to login with correct credentials" });
            }

            else {
                const Token = {
                    user: {
                        id: user.id
                    }
                }
                // console.log(Token)
                const success = true
                const authToken = jwt.sign(Token, JWT_SECRET);
                res.status(201).json({ success, authToken });
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
router.post('/getuser', fetchuser, async (req, res) => {

    // fetchuser is a middleware which is created to decode the id from the web Token

    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select('-password')
        // console.log(user)
        res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(400).json("internal server error occured")
    }
})


module.exports = router
