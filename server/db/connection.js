const mongoose = require("mongoose");


mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));
