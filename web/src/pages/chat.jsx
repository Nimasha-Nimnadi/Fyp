import  { useState } from "react";
import { FaPaperclip } from "react-icons/fa"; // Attach file icon
import "./Chat.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // State to store uploaded file

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "You", type: "text" }]);
      setInput(""); // Clear input after sending
    } else if (file) {
      // If a file is selected, send it as a message
      setMessages([...messages, { text: URL.createObjectURL(file), sender: "You", type: "file" }]);
      setFile(null); // Clear the file after sending
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      setFile(selectedFile); // Set the file to be uploaded
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Have a Quenstion ? Ask from Professional </h1>
      </div>

      <div className="messages-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "You" ? "user-msg" : "other-msg"}`}
          >
            {msg.type === "text" ? (
              <span>{msg.text}</span>
            ) : (
              <img src={msg.text} alt="attachment" className="message-image" />
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        {/* This label will trigger the file input when clicked */}
        <label htmlFor="file-input" className="attach-button">
          <FaPaperclip />
        </label>

        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          className="file-input"
          onChange={handleFileChange}
          accept="image/*, .pdf, .docx" // You can adjust this based on your needs
        />

        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
