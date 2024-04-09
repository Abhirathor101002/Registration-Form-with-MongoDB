var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true }); // Specify options for newer versions of mongoose
var db = mongoose.connection;
db.on('error', () => console.error("Error in Connection to DataBase")); // Changed consoleon to console.error
db.once('open', () => console.log("Connection to Database"));

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age; // Corrected syntax error
    var email = req.body.email;
    var phone = req.body.phone; // Corrected syntax error
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phone": phone,
        "gender": gender,
        "password": password
    };
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            console.error(err); // Changed throw err; to console.error(err);
        }
        console.log("Record Inserted Successful");
    });
    return res.redirect('/sign_up_successful'); // Changed the redirect path
});

app.get("/", (req, res) => {
    res.set({
        "Allow Access-Allow-Origin": '*'
    });
    return res.redirect('/index.html'); // Changed the redirect path
});

app.get("/sign_up_successful", (req, res) => { // Added route for sign up success
    res.sendFile(__dirname + '/public/sign_up_successful.html'); // Sending the HTML file
});

app.listen(3000, () => { // Changed console.log to console.error to display error in case of failure
    console.log("Listening on port 3000");
});
