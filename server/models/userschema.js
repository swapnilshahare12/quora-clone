const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  publicId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//hashing password through bcryptjs npm
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
    this.confirmPassword = undefined;
  }
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
