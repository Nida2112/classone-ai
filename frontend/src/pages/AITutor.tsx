import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

function AITutor() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const question = message.trim();

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: question,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:4000/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: "student-demo-1",
            question,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text:
            data.response ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("AI Tutor error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "ai",
          text:
            "Sorry, I couldn't connect to the AI Tutor. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">CLASSONE AI</p>
          <h2>AI Tutor 🤖</h2>

          <p className="subtitle">
            Ask questions and get explanations designed for your
            Class 9 FBISE learning.
          </p>
        </div>
      </header>

      <section className="panel tutor-page">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">YOUR AI TUTOR</p>
            <h3>What are you learning today?</h3>
          </div>
        </div>

        <div className="tutor-messages">
          {messages.length === 0 && (
            <div className="tutor-welcome">
              <div className="tutor-icon">🤖</div>

              <h3>Hi! I'm your ClassOne AI Tutor.</h3>

              <p>
                Ask me about Mathematics, Physics, Chemistry,
                Computer Science, or any other Class 9 topic.
              </p>
            </div>
          )}

          {messages.map((item, index) => (
            <div
              key={index}
              className={
                item.role === "user"
                  ? "message user-message"
                  : "message ai-message"
              }
            >
              {item.text}
            </div>
          ))}

          {loading && (
            <div className="message ai-message">
              Thinking...
            </div>
          )}
        </div>

        <div className="tutor-input">
          <input
            type="text"
            placeholder="Ask your tutor something..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            disabled={loading}
          />

          <button
            className="primary-button"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Send →"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default AITutor;
