"use client";

import { useState } from "react";
import { FaRegCommentAlt, FaTimes } from "react-icons/fa"; // Icons for chat button and close button
import { motion, AnimatePresence } from "framer-motion"; // For animations

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
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full text-white shadow-lg hover:from-orange-500 hover:to-orange-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRegCommentAlt size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed right-8 w-[350px] h-[480px] bg-white rounded-lg shadow-xl z-50"
            style={{ bottom: 100 }}
          >
            {/* Header */}
            <div className="rounded-t-lg p-4 border-b border-gray-200 bg-gradient-to-r from-orange-400 to-orange-600 text-white flex justify-between items-center">
              <span className="text-lg font-semibold">WayFare Assistant</span>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-orange-700 rounded-full transition"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Message Container */}
            <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`mb-3 ${
                    msg.user === "You" ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`${
                      msg.user === "You"
                        ? "bg-orange-100 text-gray-800"
                        : "bg-orange-300 text-white"
                    } inline-block px-4 py-2 rounded-lg max-w-[80%] break-words`}
                  >
                    {msg.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Form Container */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="w-full mt-2 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 transition"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;