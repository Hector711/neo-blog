const router = require("express").Router();
const jsonResponse = require('../lib/jsonResponse');

router.get("/", (req, res) => {
  res.send("signup");
});

router.post("/", (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  res.status(200).json({ message: "User created succesfully" });
});

module.exports = router;
