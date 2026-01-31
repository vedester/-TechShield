const nodemailer = require('nodemailer'); 
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ["https://tech-shield.vercel.app", "http://localhost:5173", "https://tech-shield-solutions.vercel.app"] 
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Email Transporter
const transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
    port: 465,
    secure: true, // MUST be true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ------------------ CHATBOT ROUTE ------------------
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "No message provided" });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: `
                You are the AI assistant for TechShield Solutions.
                Services: Software Development, IT Support, Networking, Cybersecurity.
                Be professional and concise.
            `
        });

        const result = await model.generateContent(message);
        res.json({ text: result.response.text() });

    } catch (error) {
        console.error("❌ Gemini API Error:", error.message);
        res.status(500).json({ error: "AI Service Error" });
    }
});

// ------------------ INQUIRY ROUTE ------------------
app.post('/api/inquiry', async (req, res) => {
    const { firstName, lastName, email, service, message } = req.body;

    if (!email || !message || !service) {
        return res.status(400).json({
            error: "Email, service, and message are required"
        });
    }

    try {
        await transporter.sendMail({
            from: `"TechShield Website" <${process.env.EMAIL_USER}>`,
            to: "vedester@gmail.com",
            replyTo: email,
            subject: `🚀 New TechShield Inquiry: ${service}`,
            html: `
                <h2>New Business Inquiry</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        console.log("📩 Inquiry email sent successfully");
        res.json({ status: "success" });

    } catch (error) {
        console.error("❌ Email Error:", error.message);
        res.status(500).json({ error: "Email service failed" });
    }
});



// ------------------ SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 TechShield Backend running on http://localhost:${PORT}`);
});
