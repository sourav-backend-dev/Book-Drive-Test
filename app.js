const express = require("express");
const app = new express();
app.use(express.static("public"));
const mongoose = require('mongoose');

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://admin:admin@database.gnxi7re.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.urlencoded({ extended: true }));

// if mongodb not connected it will show error
const db = mongoose.connection;
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
db.once('open', () => {
    console.log('App Connected to MongoDB');
  });

// Include the User model
const User = require("./models/users");
// Include the Signup model
const Signup = require("./models/signup");

// listernig router
app.listen(4000, () => {
  console.log(`Server is running on http://localhost:4000`);
});


// get routes
app.get("/", (req, res) => {
  res.render("dashboard");
});

app.get("/G", (req, res) => {
  res.render("G");
});

app.get("/G2", (req, res) => {
  res.render("G2");
});

app.get("/Login", (req, res) => {
  res.render("login");
});

app.get("/SignUp", (req, res) => {
  res.render("Signup");
});

// post routes
app.post('/G2', async(req, res)=>{
    const data = new User(req.body)
    await data.save();
    res.render('G');
  });

app.post('/Signup', async(req, res)=>{
  const data = new Signup(req.body)
  await data.save();
  res.render('Login');
});


app.post("/getUser", async (req, res) => {
  const licenseNumber = req.body.lnumber;
  const user = await User.findOne({ licenseNo: licenseNumber });

  if (!user) {
    res.render("G", { message: "No User Found", backLink: "/G2" });
  } else {
    res.render("G", { user });
  }
});

app.post("/updateCarInfo", async (req, res) => {
  const licenseNumber = req.body.licenseNumber;

  const user = await User.findOne({ licenseNo: licenseNumber });

  if (user) {
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const plateNumber = req.body.plateNumber;

    user.carDetails.make =  make || user.carDetails.make;
    user.carDetails.model =  model || user.carDetails.model;
    user.carDetails.year =  year || user.carDetails.year;
    user.carDetails.platno =  plateNumber || user.carDetails.platno;
    await user.save();
  }
  res.redirect("/G");
});
