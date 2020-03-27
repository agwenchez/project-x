const express = require('express');
const router = express.Router();
const access = require('./middlewares/access');


router.post('/',access, (req,res)=>{
    console.log('.............validation.............');
    console.log(req.body);
});



module.exports = router;