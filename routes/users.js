const express = require('express');
const router = express.Router();

// load user model
const User = require('../models/user');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));


// @route   POST users
// @desc    create new users
// @access  Public
router.post(`/create_user`, (req, res) => {
   const { name,dateOfBirth, salary, NHIF_deduction, house_allowance} = req.body;
   
   let sum_totals = 0;
   sum_totals = salary + house_allowance -NHIF_deduction;

	 const newUser = new User({
        name,
        dateOfBirth,
        salary, 
        NHIF_deduction, 
        house_allowance, 
        sum_totals
     });
	 console.log(req.body);
    newUser
    .save()
    .then(
        (user) => {
        res.status(200).json(user);
        console.log(user);
    })
    .catch(err => console.log(err));
     
    });
    


router.get('/users', (req, res) => {
	User.find().then((user) => {

		res.json(user);
    })
    .catch(err=> res.status(500).json({ succeess: false}));

})

module.exports = router;