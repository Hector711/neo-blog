const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.get("/", (req, res) => {
  res.send("signup");
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required!",
      })
    );
  }

  // crear usuario en la base de datos
  try {
    const user = new User();
    const exist = await user.usernameExist(username);
    const newUser = new User({ username, name, password });

    if (exist) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Username already exists",
        })
      );
    } else {
      await newUser.save();
    }
    res.status(200).json(
      jsonResponse(200, {
        message: "User created succesfully!",
        newUser: req.body,
      })
    );
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        error: "Error creating user"
      })
    )
  }

  
});

module.exports = router;
