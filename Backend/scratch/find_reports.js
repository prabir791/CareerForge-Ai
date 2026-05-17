const mongoose = require("mongoose");
const dotenv = require("dotenv");
const InterviewReport = require("../src/models/interviewReport.model");

dotenv.config({ path: "./.env" });

async function find() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const reports = await InterviewReport.find({});
        console.log(`Total reports in MongoDB: ${reports.length}`);
        reports.forEach(r => {
            console.log({
                _id: r._id,
                user: r.user,
                title: r.title || "No Title",
                createdAt: r.createdAt
            });
        });

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

find();
