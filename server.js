import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
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

// * change cors configuration to this when running with a front end in a different repo
const corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));
// app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/report", reportRoutes);

/**
 * @function
 * Forces the database to sync with models.
 * Should only be used for development.
 */
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

// start server
app.listen(port, () => console.log(`Server is running on ${port}`));

export default app;
