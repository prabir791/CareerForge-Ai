const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const { generateInterviewReport } = require("../src/services/ai.service");
const InterviewReport = require("../src/models/interviewReport.model");

async function testCreate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("Calling ai.service generateInterviewReport...");
        const aiResult = await generateInterviewReport({
            resume: "Prabir Rahman. Tech stack: React, Node.js, Express, MongoDB.",
            selfDescription: "Software Engineer looking for a backend node job.",
            jobDescription: "Looking for a Senior Backend Developer who is expert in Express and MongoDB."
        });

        console.log("Gemini Output parsed:", JSON.stringify(aiResult, null, 2));

        console.log("Creating document in MongoDB...");
        const newReport = await InterviewReport.create({
            user: new mongoose.Types.ObjectId("6a09bf550ce49ed76e727801"),
            resume: "Prabir Rahman. Tech stack: React, Node.js, Express, MongoDB.",
            selfDescription: "Software Engineer looking for a backend node job.",
            jobDescription: "Looking for a Senior Backend Developer who is expert in Express and MongoDB.",
            ...aiResult
        });

        console.log("New Report successfully saved!");
        console.log({
            _id: newReport._id,
            matchScore: newReport.matchScore,
            title: newReport.title,
            technicalQuestionsCount: newReport.technicalQuestions?.length,
            behavioralQuestionsCount: newReport.behavioralQuestions?.length,
            skillGapsCount: newReport.skillGaps?.length,
            preparationPlanCount: newReport.preparationPlan?.length
        });

    } catch (e) {
        console.error("Test failed:", e);
    } finally {
        await mongoose.disconnect();
    }
}

testCreate();
