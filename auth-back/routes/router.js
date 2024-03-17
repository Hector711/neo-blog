const express = require("express")

function routerApi(app) {
  // app.use("/api", express.Router());
  app.use("/api/signup", require( "./signup" ));
  app.use("/api/login", require( "./login" ));
  app.use("/api/refresh-token", require( "./refreshToken" ));
  app.use("/api/signout", require( "./signout" ));
  app.use("/api/todos", require( "./todos" ));
  app.use("/api/user", require( "./user" ));

  
}

module.exports = routerApi;
