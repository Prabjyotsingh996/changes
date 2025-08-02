import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  MessageSquare, 
  Settings, 
  Moon, 
  Sun, 
  Trash2,
  Bot,
  User,
  Menu,
  X
} from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you with various tasks like writing, analysis, coding, and more. What would you like to work on today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Getting Started", timestamp: new Date() }
  ]);
  const [currentConversation, setCurrentConversation] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      
      // Update conversation title if it's the first user message
      if (messages.length === 1) {
        const title = input.length > 30 ? input.substring(0, 30) + '...' : input;
        setConversations(prev => 
          prev.map(conv => 
            conv.id === currentConversation 
              ? { ...conv, title } 
              : conv
          )
        );
      }
      
      setInput("");
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse = {
          id: Date.now() + 1,
          text: "I understand your message. This is a simulated response from the AI assistant.",
          sender: "assistant",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const autoResizeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  };

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New conversation",
      timestamp: new Date()
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation.id);
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "assistant",
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`flex items-center justify-between px-6 py-3 border-b ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-600' : 'bg-green-500'
            }`}>
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-600 dark:text-green-400">University of Kashmir</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                English ↔ Kashmiri Translator
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <Settings size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } fixed md:relative md:translate-x-0 z-30 w-80 h-full border-r sidebar-slide flex flex-col`}>
          
          {/* Sidebar Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={startNewConversation}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border btn-hover ${
                darkMode 
                  ? 'border-gray-600 hover:bg-gray-700 text-white' 
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              } transition-colors`}
            >
              <Plus size={16} />
              New chat
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setCurrentConversation(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentConversation === conversation.id
                    ? darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conversation.title}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatTime(conversation.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className={`flex items-center justify-between p-4 border-b ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">AI Assistant</h1>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 message-enter ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <Bot size={16} />
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  <div className={`px-4 py-3 rounded-2xl message-bubble ${
                    message.sender === 'user'
                      ? darkMode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : darkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className={`text-xs mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-500'
                  }`}>
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <Bot size={16} />
                </div>
                <div className="max-w-[70%]">
                  <div className={`px-4 py-3 rounded-2xl message-bubble ${
                    darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className={`max-w-4xl mx-auto rounded-2xl border ${
              darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
            } p-2`}>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoResizeTextarea(e);
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Message AI Assistant..."
                  rows={1}
                  className={`flex-1 resize-none outline-none text-sm leading-relaxed input-focus focus-ring ${
                    darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
                  }`}
                  style={{
                    minHeight: '24px',
                    maxHeight: '200px'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`p-2 rounded-lg transition-colors btn-hover ${
                    input.trim()
                      ? darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      : darkMode 
                        ? 'bg-gray-600 text-gray-400' 
                        : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
            <p className={`text-xs text-center mt-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              AI Assistant can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
