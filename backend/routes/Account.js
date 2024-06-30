const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Account = require('../modals/Account')
const User = require('../modals/User')
const fetchuser = require('../middleware/fetchuser')

// Route 1 : get all the details using get request [login required]
router.get('/accountdetails', fetchuser, async (req, res) => {
    const accountdetails = await Account.find({ user: req.user.id });
    res.json(accountdetails)

})

// route 2 : deposit money using post request (login required)

router.post('/depositmoney', [
    body("money", "money is not less than 1rs").isInt({ min: 1 }),

], fetchuser, async (req, res) => {

    try {
        const { note, money } = req.body
        // is their error return bad req.
        const result = validationResult(req)

        if (!result.isEmpty()) {

            res.status(400).json({ errors: result.array([]) });
        }
        const id = req.user.id;

        const USER = await User.findById(id) //use to find name of the object

        const mny = parseInt(money)
        USER.accountbalance += mny;
        await USER.save();
        // console.log(USER)
        const name = USER.name

        const accountbalance = new Account({
            user: req.user.id,
            note: note,
            name: name,
            status: "deposit",
            money: money

        })
        const saveTransaction = await accountbalance.save();
        res.json(saveTransaction)
    } catch (error) {
        console.log(error)
        res.status(401).json("internal server occured")
    }



})
// front end se data bhejne wala namm or backend mai data recieve krne wala namm same hona chaiye ni toh validation error dega or time khrab krega

// route 3 : withdrawl money using post request (login required)

router.post('/Withdrawl', [
    body("money", "money is not less than 1rs").isInt({ min: 1 }),

], fetchuser, async (req, res) => {

    try {
        const { note, money } = req.body
        // is their error return bad req.
        const result = validationResult(req)

        if (!result.isEmpty()) {

            res.status(400).json({ errors: result.array([]) });

        }
        const id = req.user.id;

        // console.log(typeof(money))
        // const mny = parseInt(money)
        const USER = await User.findById(id) //use to find name of the object
        if (USER.accountbalance >= money) {

            USER.accountbalance -= money;
            await USER.save();
        }
        else {
            return res.json("not enough balance")
        }
        const name = USER.name

        const accountbalance = new Account({
            user: req.user.id,
            name: name,
            note: note,
            status: "withdraw",
            money: money

        })
        const saveTransaction = await accountbalance.save();
        res.json(saveTransaction)
    } catch (error) {
        console.log(error)
        res.status(401).json("internal server occured")
    }



})

module.exports = router
