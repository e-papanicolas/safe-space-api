import jwt from "jsonwebtoken";

/**
 * @function
 * This middleware is on ALL protected routes.
 * Detaches the token from the Authorization header.
 * If token is valid, attaches the user to the request body
 * and passes it to the next middleware in the route.
 */
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_KEY);
      req.body.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).send({ message: "Unauthorized access" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

export default auth;
