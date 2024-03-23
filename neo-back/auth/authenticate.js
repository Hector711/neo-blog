const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyToken");
const { jsonResponse } = require("../lib/jsonResponse");


function authenticate(req, res, next) {
  const token = getTokenFromHeader(req.header);
  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = { ...decoded.user };
      next();
    } else {
      return res
      .status(401)
      .json(jsonResponse(401, { error: "No token provided" }));
    }
  } else {
    return res
      .status(401)
      .json(jsonResponse(401, { error: "No token provided" }));
  }
}

module.exports = authenticate;