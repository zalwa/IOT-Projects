const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

// We import our custom modules for handling the routes, we create this in the routes folder

const userRoutes = require("./routes/userRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");

const app = express();

//lets get done with our middlewares

//middleware to handle json
app.use(express.json());
//middleware to handle encoded data in the url
app.use(express.urlencoded({ extended: false }));
//the helmet middleware sets some basic security settings to secure our application, we will use the basic settings
app.use(helmet());
//cors middleware allows our application to be accessed from another host
app.use(cors());
//morgan middleware just enables better logging(not too important)
app.use(morgan("dev"));

//connect to the db
mongoose
  .connect(
    "mongodb+srv://frida1:1234@cluster0-yyvrm.mongodb.net/test2?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connection to MongoDB Successful"))
  .catch(err => console.error(err));

//Now to our routes- I am going to split them according to our models
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/user", userRoutes);


// This route will handle all requests that manage to make it here(since in essence, if a route was matched above, it would have ended the request, so a request reaching this function will be a 404(resource unavailable))
app.use((req, res) => {
  res.status(404).json({ error: "Route unavailable" });
});

//We initialize the app to listen at a particular port
app.listen(8060, () => {
  console.log("My app has started");
});
