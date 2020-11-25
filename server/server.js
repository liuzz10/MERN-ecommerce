// import the packages from node_modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

// create the app
const app = express();

// connect to MongoDB using Mongoose
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((error) => console.log(`DB CONNECTION ERR ${error}`));

// middlewares: a function that runs inbetween
app.use(morgan("dev")); // use morgan to check how much time it takes to get /api
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// route middlewares
app.use("/api", authRoutes);

// route (moved the following to auth.js)
// app.get("/api", (req, res) => {
//     // send some hard coded data
//     res.json({
//       data: "hey you hit node API",
//     });
//   });

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
