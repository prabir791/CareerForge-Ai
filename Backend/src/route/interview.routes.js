const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router();


/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController);

// Get all interview reports for logged-in user
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllReportsController);

// Get a specific interview report by id
interviewRouter.get("/report/:id", authMiddleware.authUser, interviewController.getReportByIdController);

// Generate resume PDF for a given interview report
interviewRouter.post("/resume/pdf/:id", authMiddleware.authUser, interviewController.generateResumePdfController);


module.exports = interviewRouter