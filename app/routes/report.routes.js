import reportActions from "../controllers/report.controller.js";
import express from "express";
import auth from "../middleware/auth.js";

const reportRoutes = express.Router();

// creates a new report
reportRoutes.post("/", reportActions.new);
// retrieve all reports
reportRoutes.get("/", reportActions.getAll);
// retrieve a single report by id
reportRoutes.get("/:id", reportActions.getOne);
// delete a single report by id
reportRoutes.delete("/:id", reportActions.destroyOne);
// delete all reports
reportRoutes.delete("/", reportActions.destroyAll);

export default reportRoutes;
