const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }

        const pdfParser = new pdfParse.PDFParse(Uint8Array.from(req.file.buffer));
        const resumeText = await pdfParser.getText();
        
        // If resumeText is an object with a text property (as implied by your code), use that.
        // Otherwise, use resumeText itself.
        const resumeContent = typeof resumeText === 'object' ? resumeText.text : resumeText;

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

module.exports = {
    generateInterviewReportController
};