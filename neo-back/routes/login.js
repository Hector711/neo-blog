const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");

router.get("/", (req, res) => {
  res.send("login");
});

router.post("/", (req, res) => {
  const { username, password } = req.body;
  const accesToken = "acces_token";
  const refreshToken = "refresh_token";
  const user = {
    id: "1",
    name: "John Doe",
    username: "XXXXXXX"
  }

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required!",
      })
    );
  }

  res.status(200).json(
    jsonResponse(200, {
      user,
      accesToken,
      refreshToken,
    })
  );
});

module.exports = router;
