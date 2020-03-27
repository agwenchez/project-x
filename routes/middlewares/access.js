const request =  require('request');

module.exports = function access(req,res,next){

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
