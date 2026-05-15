const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const resumeContent = (pdfData && pdfData.text) ? pdfData.text : String(req.file.buffer);

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        });

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport: interviewReport
        });
    } catch (error) {
        console.error("Error in generateInterviewReportController:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


async function getReportByIdController(req, res) {
    try {
        const { id } = req.params;
        const report = await interviewReportModel.findById(id);

        if (!report) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        if (String(report.user) !== String(req.user.id)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        res.json({ interviewReport: report });
    } catch (error) {
        console.error("Error in getReportByIdController:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


async function getAllReportsController(req, res) {
    try {
        const reports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ interviewReports: reports });
    } catch (error) {
        console.error("Error in getAllReportsController:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


async function generateResumePdfController(req, res) {
    try {
        const { id } = req.params;
        const report = await interviewReportModel.findById(id);

        if (!report) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        if (String(report.user) !== String(req.user.id)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const pdfBuffer = await generateResumePdf({
            resume: report.resume,
            selfDescription: report.selfDescription,
            jobDescription: report.jobDescription
        });

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=resume_${id}.pdf`,
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error in generateResumePdfController:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {
    generateInterviewReportController,
    getReportByIdController,
    getAllReportsController,
    generateResumePdfController
};