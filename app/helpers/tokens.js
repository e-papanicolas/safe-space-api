import jwt from "jsonwebtoken";

// ! unstable - restarting server will reset the list
const refreshList = {};

// TODO: error handling needed here

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
