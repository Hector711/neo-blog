const express = require("express");
const app = express();
const cors = require("cors");
const routerApi = require("./routes/router.js");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
routerApi(app);

app.use((error, req, res, next) => {
  console.error("Unhandled error", error);
  res.status(500).json({ 
    error: "Internal Server Error: Error no identificado",
    message: error.message, 
    stack: error.stack
  });
});


async function main() {
  await mongoose.connect(process.env.DB_CONEXION_STRING);
  console.log("Connected to MongoDB")
}
main().catch(console.error)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
