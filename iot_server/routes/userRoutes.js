const express = require("express");
const User = require("../models/User.model");

const router = express.Router();
//I have explained most of the syntax in the telemetryRoutes file, there is nothing different here, just additional routes

//create a new user
router.post("/createnewuser", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res
    .status(201)
    .json({ message: "Successfully created a user", "user": newUser });
});

//get all users in the system
router.get("/getallusers", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json({ users: allUsers });
});

module.exports = router;
