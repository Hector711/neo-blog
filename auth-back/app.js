const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json())
app.use("/api/signup",require( "./routes/signup" ));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
