import jwt from "jsonwebtoken";

// ! unstable - restarting server will reset the list
const refreshList = {};

/**
 * @external
 * Uses jwt package to process the payload.
 * @param {object} payload The payload is an object containing a user object.
 * Signs and returns the access tokens and refresh tokens.
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_R_KEY, {
    expiresIn: "2h",
  });
};

/**
 * @function
 * Adds the refresh token to the list of tokens.
 * When a fetch is made to the refresh route, it must confirm
 * that both the token is valid and
 * that the refresh token is valid and in the list.
 */
const addTokenToList = (refreshToken, token) => {
  refreshList[refreshToken] = {
    status: "loggedin",
    token: token,
    refreshtoken: refreshToken,
  };
};

export {
  generateRefreshToken,
  generateAccessToken,
  addTokenToList,
  refreshList,
};
