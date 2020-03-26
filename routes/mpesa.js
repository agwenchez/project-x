const express = require('express');
const router = express.Router();
const request =  require('request');


router.get('/access-token',access, (req,res)=>{
    res.status(200).json({access_token:req.access_token});
})


router.post('/confirmation',access, (req,res)=>{
    console.log('.............confirmation.............');
    console.log(req.body);
})
router.post('/validation',access, (req,res)=>{
    console.log('.............validation.............');
    console.log(req.body);
})


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
            "ConfirmationURL":"http://localhost:5000/mpesa/confirmation",
            "ValidationURL":"http://localhost:5000/mpesa/validation",
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






function access(req,res,next){

    let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    let auth = Buffer.from("5Jpxymebzdfh4w7uZf44RRw4zft23y0m:mV9D7mwginhtiOrq").toString('base64');


    //access- token
    request({
        url:url,
        headers:{
            "Authorization": "Basic " + auth
        }
    }, (err, response,body)=>{
        if(err){
            console.log(err);
        }else{
            req.access_token = JSON.parse(body).access_token;
            next();
        }
    }
    )
    
    };




module.exports = router;