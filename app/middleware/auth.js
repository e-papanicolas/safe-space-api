import jwt from "jsonwebtoken";

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
