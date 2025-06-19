import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertCourseSchema, insertMessageSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // User registration
  app.post("/api/register", async (req, res) => {
    try {
      // Validate input using zod schema
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
      
      // Create new user
      const user = await storage.createUser(userData);
      
      // Return user data (excluding password)
      const { password, ...userResponse } = user;
      res.status(201).json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
  // User login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if user exists
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Verify password (in a real app, use bcrypt comparison)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Return user data (excluding password)
      const { password: _, ...userResponse } = user;
      res.status(200).json(userResponse);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    }
  });
  
  // Contact form submission
  app.post("/api/messages", async (req, res) => {
    try {
      // Validate input using zod schema
      const messageData = insertMessageSchema.parse(req.body);
      
      // Add contact information to the message
      console.log(`New message from ${messageData.name} (${messageData.email})`);
      console.log(`Subject: ${messageData.subject}`);
      console.log(`Message: ${messageData.message}`);
      console.log(`Contact: Forward to dnvortexai@gmail.com and 0638225148`);
      
      // Save message
      const message = await storage.createMessage(messageData);
      
      // In a production environment, this would trigger an email notification
      // to dnvortexai@gmail.com and SMS to 0638225148
      
      res.status(201).json({
        ...message, 
        forwardedTo: {
          email: "dnvortexai@gmail.com",
          phone: "0638225148"
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Error saving message:", error);
      res.status(500).json({ message: "Error saving message" });
    }
  });
  
  // Get all courses (for courses page)
  app.get("/api/courses", async (_req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Error fetching courses" });
    }
  });

  // Create new course (for admin)
  app.post("/api/courses", async (req, res) => {
    try {
      // Validate input using zod schema
      const courseData = insertCourseSchema.parse(req.body);
      
      // Save course
      const course = await storage.createCourse(courseData);
      
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Error creating course" });
    }
  });
  
  // AI Chatbot endpoints
  
  // Get or create conversation
  app.post("/api/chatbot/conversation", async (req, res) => {
    try {
      const { sessionId, userId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }
      
      // Create a new conversation or use existing one
      const conversation = await storage.createChatConversation({
        sessionId,
        userId: userId ? parseInt(userId) : null
      });
      
      res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating chat conversation:", error);
      res.status(500).json({ message: "Error creating chat conversation" });
    }
  });
  
  // Get conversation history
  app.get("/api/chatbot/conversation/:id/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.id);
      if (isNaN(conversationId)) {
        return res.status(400).json({ message: "Invalid conversation ID" });
      }
      
      const conversation = await storage.getChatConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      
      const messages = await storage.getChatMessagesByConversation(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Error fetching chat messages" });
    }
  });
  
  // Send a message and get a response
  app.post("/api/chatbot", async (req, res) => {
    try {
      // Get user message and conversation info
      const { message, conversationId } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Invalid message format" });
      }
      
      // If conversationId is provided, validate it exists
      if (conversationId) {
        const conversation = await storage.getChatConversation(conversationId);
        if (!conversation) {
          return res.status(404).json({ message: "Conversation not found" });
        }
        
        // Save the user message
        await storage.saveChatMessage({
          conversationId,
          content: message,
          isBot: false
        });
      }
      
      // Generate AI response based on keywords
      // In a production environment, this would connect to an AI service like OpenAI
      let response = "";
      
      const lowerMessage = message.toLowerCase();
      
      // Simple keyword matching
      if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price")) {
        response = "Our pricing plans start at $99/month for the Basic plan, $299/month for the Professional plan, and $599/month for the Enterprise plan. Each plan includes different features and capabilities. Would you like to know more about a specific plan?";
      } 
      else if (lowerMessage.includes("course") || lowerMessage.includes("class") || lowerMessage.includes("learn")) {
        response = "We offer several AI development and implementation courses, from beginner to advanced level. Our most popular courses include 'AI Fundamentals', 'Machine Learning Applications', and 'Neural Network Design'. Check out our Courses page for more details!";
      }
      else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
        response = "You can contact our team at dnvortexai@gmail.com or call us at 0638225148. Our office is located at 253 Albany Rd, Pelham, Pietermaritzburg, 3201.";
      }
      else if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("provide")) {
        response = "We offer a variety of AI services including custom AI development, AI integration, chatbot development, data analysis, and AI consulting. Would you like more information about any specific service?";
      }
      else if (lowerMessage.includes("website") || lowerMessage.includes("web") || lowerMessage.includes("site")) {
        response = "We provide comprehensive website development services with AI integration capabilities. Our websites are designed to be responsive, fast, and optimized for business growth.";
      }
      else if (lowerMessage.includes("chatbot") || lowerMessage.includes("bot") || lowerMessage.includes("assistant")) {
        response = "Yes, we develop custom AI chatbots like me! Our chatbots can be integrated with your website, mobile app, or business systems to provide 24/7 customer support and engagement.";
      }
      else if (lowerMessage.includes("support") || lowerMessage.includes("help") || lowerMessage.includes("issue")) {
        response = "For technical support, please contact our support team at dnvortexai@gmail.com or call 0638225148. We're available Monday to Friday, 9am-6pm SAST.";
      }
      else if (lowerMessage.includes("consult") || lowerMessage.includes("advice") || lowerMessage.includes("recommend")) {
        response = "We offer free 30-minute consultations to discuss your AI needs. Would you like to schedule a call with our team?";
      }
      else if (lowerMessage.includes("ai") || lowerMessage.includes("artificial intelligence") || lowerMessage.includes("machine learning")) {
        response = "At DN VORTEX, we specialize in artificial intelligence solutions that help businesses automate processes, gain insights from data, and enhance customer experiences. Would you like to know about a specific AI technology or application?";
      }
      // Default response if no keywords match
      else {
        const fallbackResponses = [
          "I'm not sure I understand. Could you please rephrase your question?",
          "Interesting question! To better assist you, could you provide more details?",
          "I'd like to help with that. Could you be a bit more specific about what you're looking for?",
          "For this specific inquiry, it might be best to contact our team directly at dnvortexai@gmail.com or call 0638225148.",
          "I'm still learning! For more detailed information, please check our website or contact our team."
        ];
        response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      }
      
      // Log the interaction
      console.log(`Chatbot interaction - User: "${message}" | Bot: "${response}"`);
      
      // Save the bot response if conversation exists
      if (conversationId) {
        await storage.saveChatMessage({
          conversationId,
          content: response,
          isBot: true
        });
      }
      
      // Return the response
      res.status(200).json({ message: response });
      
    } catch (error) {
      console.error("Error in chatbot API:", error);
      res.status(500).json({ message: "Error processing chatbot request" });
    }
  });

  // Get specific course
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Error fetching course" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
