var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos.js")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/todos", todoRoutes);
// varsinaisen apin root route
app.get("/", function (req,res){
    res.send("Hello from the root route!")
});




app.listen(process.env.PORT, function(){
    console.log("server is on!")
});