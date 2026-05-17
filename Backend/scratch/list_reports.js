const mongoose = require("mongoose");
const dotenv = require("dotenv");
const InterviewReport = require("../src/models/interviewReport.model");

dotenv.config({ path: "./.env" });

async function list() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const reports = await InterviewReport.find({}).sort({ createdAt: -1 });
        console.log(`Found ${reports.length} reports.`);
        
        if (reports.length > 0) {
            const r = reports[0];
            console.log("Latest Report details:");
            console.log({
                _id: r._id,
                jobDescriptionLength: r.jobDescription?.length,
                matchScore: r.matchScore,
                technicalQuestionsCount: r.technicalQuestions?.length,
                behavioralQuestionsCount: r.behavioralQuestions?.length,
                skillGapsCount: r.skillGaps?.length,
                preparationPlanCount: r.preparationPlan?.length,
                user: r.user
            });
            console.log("Technical Questions:", JSON.stringify(r.technicalQuestions, null, 2));
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

list();
