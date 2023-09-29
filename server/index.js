require('dotenv').config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require('cors');
const userroute = require("./routes/userroute");
const cookieParser = require("cookie-parser");
const userpost = require("./models/postschema");

app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userroute);

app.get("/", async (req, res) => {
  try {
    const post = await userpost.find({});
    console.log(post);
    res.send("hello from quora clone server");
  } catch (err) {
    console.log(err)
  }
});
app.get("/contact", (req, res) => {
  res.send("this is contact page");
});
// app.get('/about',(req,res)=>{
//     res.send("this is about page")
// })

app.post("/register-post", (req, res) => {
  console.log(req.body, "line no 6");
  res.json({ success: true });
});

app.get("*", (req, res) => {
  res.send("404 error page not available");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
