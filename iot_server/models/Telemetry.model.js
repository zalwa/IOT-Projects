const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TelemetrySchema = new Schema({
  device: {
    type: String
  },
  temprature: {
    type: Number
  },
  humidity: {
    type: Number
  },
  time: {
    type: Date,
    default: Date.now
  }
},{strict:false});

module.exports = mongoose.model("Telemetry", TelemetrySchema);
