import { db } from "../database/models/index.js";

const Report = db.reports;
const reportActions = {};

/**
 * POST /
 * Creates a new report.
 * This route is for users.
 * @function
 * Returns a message that report has been saved.
 */
reportActions.new = async (req, res, next) => {
  try {
    let report = await Report.create({
      name: req.body.name,
      pronouns: req.body.pronouns,
      anonymous: req.body.anonymous,
      date: req.body.date,
      location: req.body.location,
      content: req.body.content,
      recieved: true,
    });
    if (report) res.status(200).send({ message: "Report has been saved." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /
 * These next routes are for the admin/SPI.
 * @function
 * Returns all reports.
 */
reportActions.getAll = async (req, res, next) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /:id
 * To get the id for a report, you must have first run a GET to all reports.
 * @param {integer} id - reportId
 * @function
 * Returns a single report.
 */
reportActions.getOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const report = await Report.findByPk(id);
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /:id
 * @param {integer} id - reportId
 * @function
 * Deletes the report from the database.
 */
reportActions.destroyOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const report = await Report.findByPk(id);
    await report.destroy();
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /
 * @function
 * WARNING: Deletes ALL reports.
 * This might be used in case of emergencies.
 */
reportActions.destroyAll = async (req, res, next) => {
  try {
    await Report.destroy({
      truncate: true,
    });
    res.status(200).json({ message: "All reports deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default reportActions;
