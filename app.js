const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signUp.html");
});

app.post("/",function(req,res){
const fname = req.body.fname;
const lname = req.body.lname;
const email = req.body.email;


  var data= {
    members:[
      {
      email_address : email,
      status : "subscribed",
      merge_fields:{
        FNAME: fname,
        LNAME: lname
      }
    }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/1924018fcf";
  const options={
    method : "POST",
    auth : "arjun:f3492ba4a39ce125e3f654a85160d61b-us21"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode ===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
    console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
  console.log(res.status);
});

app.post("/failure.html",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

/*
apikey:
f3492ba4a39ce125e3f654a85160d61b-us21

audiences id:
1924018fcf
*/
