const express = require("express");
const app = express();
const request = require("request");

var apiKey = "be22403d765e8a1ad5219486d2ebd3ff-us13";
var listID = "46f91d0f13";

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    
    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us13.api.mailchimp.com/3.0/lists/" + listID,
        method: "POST",
        headers: {
            "Authorization": "anagutjor " + apiKey
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
                if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html");
                } else {
                    res.sendFile(__dirname + "/failure.html");
                }
        }
    })
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000");
})
