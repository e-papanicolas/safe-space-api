import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { db } from "./app/database/models/index.js";
import {
  userRoutes,
  profileRoutes,
  commentRoutes,
  postRoutes,
  reportRoutes,
} from "./app/routes/index.js";

const app = express();
const port = process.env.PORT || 8081;

// FOR PRODUCTION:
// secure web traffic only allow 443 (https) redirect port 80 traffic (http) to 443

app.use(cookieParser());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(csrf({ cookie: true }));

// use routes
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/report", reportRoutes);

// * change cors configuration to this when running with a front end in a different repo
// const corsOptions = {origin: "http://localhost:____"};
// app.use(cors(corsOptions));

/**
 * @function
 * Forces the database to sync with models.
 * Should only be used for development.
 */
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// app.all("*", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.render("index");
// });

// app.get("/getCSRFToken", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

// start server
app.listen(port, () => console.log(`Server is running on ${port}`));

export default app;
