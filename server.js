// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const  express= require("express");
const  bodyParser= require("body-parser");
const  cors= require("cors");
// Start up an instance of app


const  app= express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT=3000;
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port:", PORT);
})

// Get rout:
app.get("/alldt",function (req,res){
    res.send(projectData);

})

// Post rout:
app.post("/postDt", function (req,res){
 //console.log(req.body);
    projectData={
        date: req.body.date,
        temp: req.body.temp,
        userFeel: req.body.userFeel
    }
    res.send(projectData);
});




