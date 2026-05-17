const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// Let's define the schema using Type definitions of @google/genai SDK itself!
// Or try passing Zod schema if natively supported, or a clean JSON schema object.
// Wait, Google GenAI SDK's config.responseSchema uses the Type object like:
// {
//   type: Type.OBJECT,
//   properties: {
//     matchScore: { type: Type.INTEGER, description: "..." }
//   }
// }

const schemaUsingGenAIType = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        title: {
            type: Type.STRING,
            description: "The title of the job for which the interview report is generated"
        },
        technicalQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    answer: { type: Type.STRING }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: { type: Type.STRING } // low, medium, high
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    tasks: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["matchScore", "title", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function run() {
    try {
        console.log("Calling Gemini API with SDK-native Type schema...");
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Resume: Prabir, full stack React developer. Job: Node developer. Please generate full interview report with score, questions, skill gaps, prep plan and title.",
            config: {
                responseMimeType: "application/json",
                responseSchema: schemaUsingGenAIType,
            }
        });
        console.log("Response text:");
        console.log(response.text);
    } catch (e) {
        console.error("Failed:", e.message);
    }
}
run();
