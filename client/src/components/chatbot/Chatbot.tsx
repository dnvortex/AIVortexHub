import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatConversation {
  id: number;
  sessionId: string;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    content: "Hello! I'm DN VORTEX AI Assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversation, setConversation] = useState<ChatConversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize conversation
  useEffect(() => {
    // Create conversation when chat is opened for the first time
    const initializeConversation = async () => {
      if (isOpen && !conversation) {
        try {
          // Generate a unique session ID
          const sessionId = `session_${generateId()}`;
          
          // Create a new conversation
          const response = await apiRequest("POST", "/api/chatbot/conversation", {
            sessionId
          });
          
          const newConversation = await response.json();
          setConversation(newConversation);
          
          console.log("Chatbot conversation initialized:", newConversation.id);
        } catch (error) {
          console.error("Failed to initialize chat conversation:", error);
          toast({
            title: "Chat Error",
            description: "Unable to initialize chat. Some features may be limited.",
            variant: "destructive",
          });
        }
      }
    };
    
    initializeConversation();
  }, [isOpen, conversation, toast]);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Sample responses based on keywords (fallback for offline use)
const responses: Record<string, string> = {
    "pricing": "Our pricing plans start at $99/month for the Basic plan, $299/month for the Professional plan, and $599/month for the Enterprise plan. Each plan includes different features and capabilities. Would you like to know more about a specific plan?",
    "courses": "We offer several AI development and implementation courses, from beginner to advanced level. Our most popular courses include 'AI Fundamentals', 'Machine Learning Applications', and 'Neural Network Design'. Check out our Courses page for more details!",
    "contact": "You can contact our team at dnvortexai@gmail.com or call us at 0638225148. Our office is located at 253 Albany Rd, Pelham, Pietermaritzburg, 3201.",
    "services": "We offer a variety of AI services including custom AI development, AI integration, chatbot development, data analysis, and AI consulting. Would you like more information about any specific service?",
    "website": "We provide comprehensive website development services with AI integration capabilities. Our websites are designed to be responsive, fast, and optimized for business growth.",
    "chatbot": "Yes, we develop custom AI chatbots like me! Our chatbots can be integrated with your website, mobile app, or business systems to provide 24/7 customer support and engagement.",
    "support": "For technical support, please contact our support team at dnvortexai@gmail.com or call 0638225148. We're available Monday to Friday, 9am-6pm SAST.",
    "consultation": "We offer free 30-minute consultations to discuss your AI needs. Would you like to schedule a call with our team?",
    "portfolio": "We've worked with businesses in various industries including healthcare, finance, retail, and education. Check out our Services page for case studies of our previous work.",
    "ai": "At DN VORTEX, we specialize in artificial intelligence solutions that help businesses automate processes, gain insights from data, and enhance customer experiences. Would you like to know about a specific AI technology or application?"
  };
  
  // Fallback responses when no specific match is found
  const fallbackResponses = [
    "I'm not sure I understand. Could you please rephrase your question?",
    "Interesting question! To better assist you, could you provide more details?",
    "I'd like to help with that. Could you be a bit more specific about what you're looking for?",
    "For this specific inquiry, it might be best to contact our team directly at dnvortexai@gmail.com or call 0638225148.",
    "I'm still learning! For more detailed information, please check our website or contact our team."
  ];

  const generateResponse = (query: string): string => {
    // Convert to lowercase for easier matching
    const lowerQuery = query.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    
    // If no match, return a random fallback
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const simulateTyping = (response: string, callback: (text: string) => void) => {
    setIsTyping(true);
    
    // Simulate delay (like AI processing)
    setTimeout(() => {
      callback(response);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const userInput = inputValue;
    setInputValue("");
    
    // Start typing indicator
    setIsTyping(true);
    
    // Send the message to our API
    try {
      // Include conversation ID if we have it
      const requestData = conversation 
        ? { message: userInput, conversationId: conversation.id } 
        : { message: userInput };
      
      const response = await apiRequest("POST", "/api/chatbot", requestData);
      const data = await response.json();
      
      // Small delay to make it seem more natural
      setTimeout(() => {
        const botMessage: Message = {
          id: generateId(),
          content: data.message,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Chatbot API error:", error);
      
      // Fallback to local response if API fails
      const botResponse = generateResponse(userInput);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: generateId(),
          content: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsTyping(false);
        
        toast({
          title: "Connection Issue",
          description: "Using offline responses. Please check your internet connection.",
          variant: "destructive",
        });
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot Button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <i className="fas fa-times text-white text-xl"></i>
        ) : (
          <i className="fas fa-robot text-white text-xl"></i>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-darkBg border border-gray-700 rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-primary p-4 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <i className="fas fa-robot text-white"></i>
                </div>
                <h3 className="ml-2 font-medium text-white">AI Assistant</h3>
              </div>
              <button onClick={toggleChat} className="text-gray-300 hover:text-white">
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-darkBg-lighter">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-gray-800 text-white rounded-tl-none"
                        : "bg-primary text-white rounded-tr-none"
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-gray-800 text-white p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-darkBg-lighter text-white border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-lg transition-colors"
                disabled={!inputValue.trim()}
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;