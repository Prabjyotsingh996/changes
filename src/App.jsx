import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-gray-900"}>
      <header className="flex items-center justify-between px-4 py-3 bg-green-800 text-white">
        <div className="flex items-center">
          <img src="/images/kashmir-logo.png" alt="University of Kashmir Logo" className="h-12 w-12 mr-4" />
          <h1 className="text-lg font-semibold hidden sm:block">University of Kashmir</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-white text-green-800 font-semibold px-4 py-1 rounded hover:bg-green-100 transition">
            Sign Up
          </button>
          <button className="p-2 hover:bg-green-700 rounded" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-4 mt-10">
        <img src="/images/nit-logo.png" alt="NIT Srinagar Logo" className="h-10 mb-2" />
        <h2 className="text-2xl md:text-3xl font-bold">
          English <span className="text-green-700 dark:text-green-400">↔</span> 
          <span className="text-green-700 dark:text-green-400"> Kashmiri Translator</span>
        </h2>
        <div className="mt-4 flex flex-wrap justify-center items-center text-sm italic text-gray-600 dark:text-gray-300 gap-4 max-w-3xl">
          <span>"Achev khote che kuthe duur"</span>
          <span>"Imagination is more important than knowledge." – Albert Einstein</span>
          <span>"The best way to predict the future is to create it."</span>
        </div>

        <div className="mt-10 w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-96 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <span className="text-gray-400 dark:text-gray-500">Ask me anything or type to translate...</span>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="text-left px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center mt-4 bg-white dark:bg-gray-700 rounded-full shadow px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type here..."
              className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white px-2"
            />
            <button onClick={sendMessage} className="text-green-700 dark:text-green-400 hover:text-green-900">
              ➤
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
