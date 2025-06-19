import { 
  users, type User, type InsertUser, 
  messages, type Message, type InsertMessage, 
  courses, type Course, type InsertCourse,
  chatConversations, type ChatConversation, type InsertChatConversation,
  chatMessages, type ChatMessage, type InsertChatMessage
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  
  // Course operations
  createCourse(course: InsertCourse): Promise<Course>;
  getCourse(id: number): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;
  
  // Chatbot operations
  createChatConversation(conversation: InsertChatConversation): Promise<ChatConversation>;
  getChatConversation(id: number): Promise<ChatConversation | undefined>;
  saveChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessagesByConversation(conversationId: number): Promise<ChatMessage[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private courses: Map<number, Course>;
  private chatConversations: Map<number, ChatConversation>;
  private chatMessages: Map<number, ChatMessage>;
  
  private userId: number;
  private messageId: number;
  private courseId: number;
  private chatConversationId: number;
  private chatMessageId: number;
  
  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.courses = new Map();
    this.chatConversations = new Map();
    this.chatMessages = new Map();
    
    this.userId = 1;
    this.messageId = 1;
    this.courseId = 1;
    this.chatConversationId = 1;
    this.chatMessageId = 1;
    
    // Initialize with some sample courses
    this.initializeCourses();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { 
      ...insertUser, 
      id,
      subscriptionPlan: "none",
      isAdmin: false,
      fullName: insertUser.fullName || null
    };
    
    this.users.set(id, user);
    return user;
  }
  
  // Message operations
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const now = new Date();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: now
    };
    
    this.messages.set(id, message);
    return message;
  }
  
  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
  
  // Course operations
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.courseId++;
    const course: Course = {
      ...insertCourse,
      id,
      enrolledCount: 0,
      rating: 0,
      imageUrl: insertCourse.imageUrl || null,
      tags: insertCourse.tags || null
    };
    
    this.courses.set(id, course);
    return course;
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }
  
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }
  
  // Chatbot operations
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    const id = this.chatConversationId++;
    const now = new Date();
    const conversation: ChatConversation = {
      ...insertConversation,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    this.chatConversations.set(id, conversation);
    return conversation;
  }
  
  async getChatConversation(id: number): Promise<ChatConversation | undefined> {
    return this.chatConversations.get(id);
  }
  
  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageId++;
    const now = new Date();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: now
    };
    
    this.chatMessages.set(id, message);
    
    // Update the conversation's updatedAt timestamp
    const conversation = this.chatConversations.get(insertMessage.conversationId);
    if (conversation) {
      conversation.updatedAt = now;
      this.chatConversations.set(conversation.id, conversation);
    }
    
    return message;
  }
  
  async getChatMessagesByConversation(conversationId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values()).filter(
      message => message.conversationId === conversationId
    );
  }
  
  // Initialize the storage with some sample courses
  private initializeCourses() {
    const sampleCourses: InsertCourse[] = [
      {
        title: "AI Fundamentals",
        description: "Learn the basics of artificial intelligence, machine learning algorithms, and how to implement them in real-world scenarios.",
        level: "Beginner",
        duration: "12 weeks",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1677442135056-8bef01b5203a?auto=format&fit=crop&w=600&h=300",
        tags: ["Python", "TensorFlow", "ML Basics"]
      },
      {
        title: "Building AI Chatbots",
        description: "Design and develop conversational AI agents that can understand natural language and provide intelligent responses.",
        level: "Intermediate",
        duration: "8 weeks",
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1657426138271-7078ac050236?auto=format&fit=crop&w=600&h=300",
        tags: ["NLP", "JavaScript", "API Integration"]
      },
      {
        title: "Full-Stack AI Development",
        description: "Master the integration of AI services with modern web applications using React, Node.js, and cloud-based AI services.",
        level: "Advanced",
        duration: "16 weeks",
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&h=300",
        tags: ["React", "Node.js", "Firebase", "OpenAI"]
      },
      {
        title: "Computer Vision Applications",
        description: "Build and deploy computer vision applications for object detection, facial recognition, and image classification.",
        level: "Intermediate",
        duration: "10 weeks",
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1583207884889-d73594eb2199?auto=format&fit=crop&w=600&h=300",
        tags: ["Python", "OpenCV", "TensorFlow", "Image Processing"]
      },
      {
        title: "Natural Language Processing",
        description: "Deep dive into NLP techniques including sentiment analysis, named entity recognition, and text classification.",
        level: "Advanced",
        duration: "14 weeks",
        price: 449,
        imageUrl: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?auto=format&fit=crop&w=600&h=300",
        tags: ["Python", "NLTK", "SpaCy", "Transformers"]
      },
      {
        title: "AI for Business Intelligence",
        description: "Learn how to leverage AI for business analytics, predictive modeling, and data-driven decision making.",
        level: "Intermediate",
        duration: "8 weeks",
        price: 249,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=300",
        tags: ["Python", "Pandas", "Power BI", "Business Analytics"]
      }
    ];
    
    // Add sample courses to storage
    sampleCourses.forEach(course => {
      this.createCourse(course);
    });
  }
}

// Determine which storage implementation to use
let storageType = 'memory';

try {
  // Check if database environment variables are set
  const hasDatabase = !!process.env.DATABASE_URL;
  
  // Check if Firebase environment variables are set
  const hasFirebase = !!(process.env.FIREBASE_API_KEY && process.env.FIREBASE_PROJECT_ID);
  
  // Determine storage type
  if (hasDatabase) {
    storageType = 'database';
    console.log('PostgreSQL database environment variables detected');
  } else if (hasFirebase) {
    storageType = 'firebase';
    console.log('Firebase environment variables detected');
  }
} catch (error) {
  console.error("Error checking environment variables:", error);
}

// Choose storage implementation based on environment
let storage: IStorage = new MemStorage(); // Default to memory storage

// Function to set storage implementation - will be called after imports
async function initializeStorage() {
  if (storageType === 'database') {
    try {
      // Use dynamic import for database storage
      const { databaseStorage } = await import('./databaseStorage');
      storage = databaseStorage;
      console.log('Using database storage implementation');
      return;
    } catch (error) {
      console.error('Failed to load database storage:', error);
      // Fallback to memory storage
      storage = new MemStorage();
      console.log('Falling back to memory storage due to database error');
    }
  } else if (storageType === 'firebase') {
    try {
      // Use dynamic import for firebase storage
      const { firebaseStorage } = await import('./firebaseStorage');
      storage = firebaseStorage;
      console.log('Using firebase storage implementation');
      return;
    } catch (error) {
      console.error('Failed to load firebase storage:', error);
      // Fallback to memory storage
      storage = new MemStorage();
      console.log('Falling back to memory storage due to firebase error');
    }
  } else {
    console.log('Using memory storage implementation');
  }
}

// Initialize storage immediately but don't wait - the dynamic imports will resolve asynchronously
// Note: This is typically fine for a development server where the first requests will arrive after initialization
initializeStorage().catch(err => {
  console.error('Error during storage initialization:', err);
});

// Export the storage instance - this will be updated asynchronously when imports complete
export { storage };
