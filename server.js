import express from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { db } from "./app/database/models/index.js";
import { userRoutes } from "./app/routes/index.js";

const app = express();
const port = process.env.PORT || 8081;

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//user routes
app.use("/user", userRoutes);

// * change cors configuration to this when running with a front end
// const corsOptions = {origin: "http://localhost:____"};
// app.use(cors(corsOptions));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

// start server
app.listen(port, () => console.log(`Server is running on ${port}`));

export default app;
