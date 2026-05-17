const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { generateInterviewReport } = require("../src/services/ai.service");

async function test() {
    try {
        console.log("Calling Gemini API...");
        const result = await generateInterviewReport({
            resume: "Prabir Rahman, Full Stack Developer with React, Node.js, and MongoDB experience.",
            selfDescription: "Passionate engineer who builds web applications.",
            jobDescription: "Looking for a React and Node developer to build custom interview plan platforms."
        });
        console.log("Gemini API Response:");
        console.log(JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Gemini API failed:", e);
    }
}

test();
