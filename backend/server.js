const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Resend } = require('resend'); // 1. Added Resend
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ["https://tech-shield.vercel.app", "http://localhost:5173", "https://tech-shield-solutions.vercel.app"] 
}));
app.use(express.json());

// Initialize APIs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY); // 2. Initialize Resend

// ------------------ CHATBOT ROUTE (No changes needed) ------------------
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: "You are the AI assistant for TechShield Solutions. Be professional and concise."
        });
        const result = await model.generateContent(message);
        res.json({ text: result.response.text() });
    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        res.status(500).json({ error: "AI Service Error" });
    }
});

// ------------------ INQUIRY ROUTE (NEW Resend logic) ------------------
app.post('/api/inquiry', async (req, res) => {
    const { firstName, lastName, email, service, message } = req.body;

    try {
        // Note: On Resend Free Tier without a domain, you MUST send FROM 'onboarding@resend.dev'
        const { data, error } = await resend.emails.send({
            from: 'TechShield <onboarding@resend.dev>', 
            to: ['vedester@gmail.com'], // Where you want to receive the lead
            subject: `🚀 New TechShield Inquiry: ${service}`,
            html: `
                <h2>New Business Inquiry</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Customer Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p style="padding: 10px; background: #f4f4f4;">${message}</p>
            `
        });

        if (error) {
            console.error("❌ Resend API Error:", error);
            return res.status(500).json({ error: "Email service failed" });
        }

        console.log("📩 Inquiry sent successfully via Resend API");
        res.json({ status: "success" });

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 TechShield Backend running on port ${PORT}`);
});