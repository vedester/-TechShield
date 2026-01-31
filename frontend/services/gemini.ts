//frontend/services/gemini.ts,
export const getChatResponse = async (message: string) => {
  try {
    const response = await fetch('https://techshield-backend.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    // Return the text field from the backend response
    return data.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Frontend fetch error:", error);
    return "Our support system is currently experiencing issues. Please contact us at +254 706 747884.";
  }
}; 