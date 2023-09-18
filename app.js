//setting up Express.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs'); //setting up EJS 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//an empty list of the tasks
let items = [];

//route for the TO-DO list web application
app.get("/", function(req, res){
    
    let today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay : day, newListItems: items});   
});

//add the new tasks to the list
app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);

    res.redirect("/");
});

//remove the selected tasks from the list
app.post("/remove", function(req, res){
    const index = req.body.index;
    items.splice(index, 1);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});