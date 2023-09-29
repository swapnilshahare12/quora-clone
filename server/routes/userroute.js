require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const userpost = require("../models/postschema");
const user = require("../models/userschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Storage Setting if we want a local system as storage

// let storage = multer.diskStorage({
//   destination: './public/uploads',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

//Storage Setting if we don't want local system as a storage
const storage = multer.diskStorage({});

//Upload Setting
let upload = multer({ storage });

router.post("/register-post", upload.single("file"), async (req, res) => {
  try {
    const {
      content,
      question,
      owner,
      ownerFirstName,
      ownerLastName,
      ownerProfilePicture,
      profession,
    } = req.body;
    if (question === "") {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "quora_posts",
        });
        console.log(result);
        const newPost = new userpost({
          content,
          contentType: "post",
          owner,
          imageUrl: result.secure_url,
          publicId: result.public_id,
          votes: 0,
          upvoted: [],
          downvoted: [],
          ownerFirstName,
          ownerLastName,
          ownerProfilePicture,
          profession,
        });
        const registeredPost = await newPost.save();
        const sendPost = await userpost.find({});
        res.json({ success: true, sendPost });
      } else {
        const newPost = new userpost({
          content,
          contentType: "post",
          owner,
          votes: 0,
          upvoted: [],
          downvoted: [],
          ownerFirstName,
          ownerLastName,
          ownerProfilePicture,
          profession,
        });
        const registeredPost = await newPost.save();
        const sendPost = await userpost.find({});
        res.json({ success: true, sendPost });
      }
    } else {
      const newQuestion = new userpost({
        question: `<strong>${question}</strong>`,
        contentType: "question",
        owner,
        votes: 0,
        upvoted: [],
        downvoted: [],
        ownerFirstName,
        ownerLastName,
        ownerProfilePicture,
        profession,
      });
      const registeredPost = await newQuestion.save();
      const sendPost = await userpost.find({});
      res.json({ success: true, sendPost });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/register-user",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        profession,
        password,
        confirmPassword,
      } = req.body;
      console.log(req.body);
      const registeredData = await user.findOne({
        email: email.toLowerCase(),
      });
      if (!registeredData) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "quora_user_profiles",
        });
        console.log(result);
        const newUser = new user({
          firstName,
          lastName,
          email,
          profession,
          password,
          confirmPassword,
          profilePicture: result.secure_url,
          publicId: result.public_id,
        });
        const registeredUser = await newUser.save();
        res.json({ success: true });
      } else if (registeredData) {
        res.json({ userExist: true });
      } else {
        res.json({ error: true });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/register-google-user", async (req, res) => {
  try {
    const { firstName, lastName, email, profilePicture } = req.body;
    const userExist = await user.findOne({
      email: email.toLowerCase(),
    });
    if (userExist) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      res.json({ success: true, token });
    } else {
      const newUser = new user({
        firstName,
        lastName,
        email,
        profession: "Google User",
        profilePicture,
      });
      const registeredUser = await newUser.save();
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      res.json({ success: true, token });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login-user", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const registeredUser = await user.findOne({
      email: email.toLowerCase(),
    });
    console.log("line no 146");
    if (registeredUser) {
      const isMatch = await bcrypt.compare(
        password,
        registeredUser.password ? registeredUser.password : "null"
      );
      // const isMatch = await bcrypt.compare(password, "123");
      console.log(isMatch, "line no 149");
      if (isMatch) {
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        // const token = registeredUser.generateAuthToken()
        console.log(token, "line no 88");
        // res.cookie("jwt", token, {
        //   expires: new Date(Date.now() + 25892000000),
        //   httpOnly: true,
        //   secure:true,
        // });
        res
          .status(201)
          .json({ success: true, token, firstName: registeredUser.firstName });
      } else {
        res.status(200).json({ invalid: "invalid credentials" });
      }
    } else {
      res.status(200).json({ invalid: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/fetch-posts", async (req, res) => {
  try {
    const posts = await userpost.find({});
    res.json({ posts, success: true });
  } catch (err) {
    console.log(err);
  }
});

router.post("/handle-upvote", async (req, res) => {
  try {
    const { userEmail, postId } = req.body;
    const post = await userpost.findById(postId);
    if (post.upvoted.includes(userEmail)) {
      const updateUpvotes = post.upvoted.filter((email) => {
        return email !== userEmail;
      });
      const updatePost = await userpost.findByIdAndUpdate(postId, {
        upvoted: updateUpvotes,
        $inc: { votes: -1 },
      });
      const sendPost = await userpost.find({});
      res.json({ sendPost });
    } else {
      const updateUpvotes = post.downvoted.filter((email) => {
        return email !== userEmail;
      });
      if (post.downvoted.includes(userEmail)) {
        // const upvotedArray = post.upvoted;
        const updatePost = await userpost.findByIdAndUpdate(postId, {
          upvoted: [...post.upvoted, userEmail],
          $inc: { votes: 1 },
          downvoted: updateUpvotes,
        });
        const sendPost = await userpost.find({});
        res.json({ sendPost });
      } else {
        // const upvotedArray = post.upvoted;
        const updatePost = await userpost.findByIdAndUpdate(postId, {
          upvoted: [...post.upvoted, userEmail],
          $inc: { votes: 1 },
        });
        const sendPost = await userpost.find({});
        res.json({ sendPost });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/handle-downvote", async (req, res) => {
  try {
    const { userEmail, postId } = req.body;
    const post = await userpost.findById(postId);
    if (post.downvoted.includes(userEmail)) {
      const updateDownvotes = post.upvoted.filter((email) => {
        return email !== userEmail;
      });

      const updatePost = await userpost.findByIdAndUpdate(postId, {
        downvoted: updateDownvotes,
      });
      const sendPost = await userpost.find({});
      res.json({ sendPost });
    } else {
      if (post.upvoted.includes(userEmail)) {
        // const downvotedArray = post.downvoted;
        const downVotes = post.upvoted.filter((email) => {
          return email !== userEmail;
        });
        const updatePost = await userpost.findByIdAndUpdate(postId, {
          downvoted: [...post.downvoted, userEmail],
          upvoted: downVotes,
          $inc: { votes: -1 },
        });
        const sendPost = await userpost.find({});
        res.json({ sendPost });
      } else {
        // const downvotedArray = post.downvoted;
        const updatePost = await userpost.findByIdAndUpdate(postId, {
          downvoted: [...post.downvoted, userEmail],
        });
        const sendPost = await userpost.find({});
        res.json({ sendPost });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/handle-delete-post", async (req, res) => {
  try {
    const { userEmail, postId, postOwner } = req.body;
    const post = await userpost.findById(postId);
    if (post.imageUrl) {
      const deleteImage = await cloudinary.uploader.destroy(post.publicId);
      const deletePost = await userpost.findByIdAndDelete(postId);
      const sendPost = await userpost.find({});
      res.json({ sendPost });
    } else {
      const deletePost = await userpost.findByIdAndDelete(postId);
      const sendPost = await userpost.find({});
      res.json({ sendPost });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/user-auth", async (req, res) => {
  try {
    const { token } = req.body;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const userDetails = await user.findOne({ email: verifyUser.email });
    res.json({ userDetails, success: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
