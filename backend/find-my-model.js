// backend/find-my-model.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function findModel() {
    const key = process.env.GEMINI_API_KEY;
    console.log(`Checking key ending in: ...${key.slice(-4)}`);

    try {
        // We use a raw fetch to bypass SDK naming issues
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", data.error.message);
            return;
        }

        console.log("✅ SUCCESS! Here are your available models:");
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`👉 Use this name: "${m.name.split('/')[1]}"`);
            }
        });
    } catch (err) {
        console.error("❌ Connection failed:", err.message);
    }
}

findModel();