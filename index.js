var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/todos", todoRoutes);
app.use(express.static(__dirname+`/views`));
app.use(express.static(__dirname+`/public`));
// varsinaisen apin root route
app.get("/", function (req,res){
    res.sendFile("index.html");
});

app.post("/", function (req, res){
    
});


app.listen(process.env.PORT, function(){
    console.log("server is on!");
});