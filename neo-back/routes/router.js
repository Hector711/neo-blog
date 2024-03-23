const express = require("express");
const authenticate = require("../auth/authenticate");

function routerApi(app) {
  // app.use("/api", express.Router());
  app.use("/api/signup", require( "./signup" ));
  app.use("/api/login", require( "./login" ));
  app.use("/api/refresh-token", require( "./refreshToken" ));
  app.use("/api/signout", require( "./signout" ));
  app.use("/api/todos", require( "./todos" ));
  app.use("/api/user", authenticate, require( "./user" ));
  app.use("/api/todos", authenticate, require( "./todos"))

  
}

module.exports = routerApi;
