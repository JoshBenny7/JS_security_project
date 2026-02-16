var express = require("express");
var app = express();

app.get("/", function (req, resp) {
    resp.send("Welcome to the Rest API");
});

app.get('/time', function(req, resp) {
    var time = new Date().toLocaleTimeString();
    resp.send(`Time is: ${time}`);
});

app.get('/date', function(req, resp) {
    var date = new Date().toLocaleDateString();
    resp.send(`Date is: ${date}`);
});

app.get('/square/:n',function(req,resp){
    var n= Number(req.params.n);
    var s= n*n;
    resp.send(`Square of ${n} is ${s}`);
});

app.get('/addition/:a/:b',function(req,resp){
    var a= Number(req.params.a);
    var b= Number(req.params.b);
    var c= a+b;
    resp.send(`Add of ${a} and ${b} is ${c}`);
});

app.listen(9000, () => console.log("API Started Listening..."));
