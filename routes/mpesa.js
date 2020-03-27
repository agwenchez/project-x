const express = require('express');
const router = express.Router();
const request =  require('request');
const access = require('./middlewares/access');



router.get('/access-token',access, (req,res)=>{
    res.status(200).json({access_token:req.access_token});
});
router.get('/', (req,res)=>{
    res.json({msg:"this "});
});

router.get('/simulate', access, (req,res)=>{

    let url ="https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
    let auth ="Bearer " +req.access_token;


    request({
        url:url,
        headers:{
            "Authorization":auth
        },
        json:{
            "ShortCode":"600427",
            "CommandID":"CustomerPaybillOnline",
            "Amount":"100",
            "Msisdn":"254708374149",
            "BillReferenceNumber":"TestAPI"

        }
    
    },(err, response, body)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(body);
        }
    }
    )

})



router.get('/register', access,(req,res)=>{
    
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    let auth ="Bearer " + req.access_token;

    
    request({
        url:url,
        headers:{
            method:"POST",
            "Authorization":auth
        },
        json:{
            "ShortCode":"600427",
            "ResponseType":"Complete",
            "ConfirmationURL":"https://mpesos.herokuapp.com/confirmation",
            "ValidationURL":"https://mpesos.herokuapp.com/validation",
        }
    },(err, response, body)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(body);
        }
    }
    )
});



module.exports = router;