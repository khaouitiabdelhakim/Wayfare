"use client";
import { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa"; // Icon for the chat button

const ChatAssistant = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { user: "Assistant", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([
        ...messages,
        { user: "You", text: input },
        { user: "Assistant", text: "I'm here to help!" },
      ]);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full text-white shadow-lg hover:from-orange-500 hover:to-orange-700 transition"
      >
        <FaRegCommentAlt size={24} />
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed  right-8 w-[550px] h-[480px] bg-white rounded shadow-xl z-50 rounded-t-xl" style={{bottom:100}}>
          {/* Header */}
          <div className="rounded-t-xl p-4 border-b border-gray-200 bg-gradient-to-r from-orange-400 to-orange-600 text-white flex justify-between items-center">
            <span className="text-lg font-semibold">WayFare Assistant</span>
          </div>

          {/* Message Container */}
          <div className="h-[300px] overflow-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.user === "You" ? "text-right" : "text-left"}`}
              >
                <p
                  className={`${
                    msg.user === "You" ? "bg-orange-100" : "bg-orange-300"
                  } inline-block px-4 py-2 rounded-lg`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Form Container */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 rounded-t-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="w-full mt-2 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
