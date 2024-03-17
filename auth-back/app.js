const express = require("express");
const app = express();
const cors = require("cors");
const routerApi = require("./routes/router.js");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
routerApi(app);

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({ 
    error: "Internal ServeCCCr Error",
    message: error.message, // Proporciona más detalles sobre el error
    stack: error.stack // Ten en cuenta que mostrar la pila de llamadas en producción puede ser un riesgo de seguridad
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
