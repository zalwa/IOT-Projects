const express = require("express");
const Telemetry = require("../models/Telemetry.model");

const router = express.Router();

//get telemetry for a particular device - remember in the system description the full route is telemetry/:deviceId, but we ommit 'telemetry' since its already covered in the app.js main file which will forward any route with api/telemetry to this handler file

router.get("/:devicename", async (req, res) => {
  
  const name = req.params.devicename;
  const allTelemetry = await Telemetry.find({ device: name }).sort('-time');
  res.status(200).json({data:allTelemetry});
});

// store a dataset for a particular telemtery - must include the deviceId - you may notice that this route is exaclty equivalent to the get route with the difference of the HTTP method - this is now a POST rather than a get , they have different handler functions

router.post("/create", async (req, res) => {
  const newTelemetry = new Telemetry(req.body);
  await newTelemetry.save();
  res
    .status(201)
    .json({ message: "Succefully created telemetry", telemetry: newTelemetry });
});

module.exports = router;
