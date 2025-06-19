import { eq, desc } from 'drizzle-orm';
import { IStorage } from './storage';
import { 
  users, User, InsertUser,
  messages, Message, InsertMessage,
  courses, Course, InsertCourse,
  chatConversations, ChatConversation, InsertChatConversation,
  chatMessages, ChatMessage, InsertChatMessage
} from '@shared/schema';

// Import db dynamically to avoid circular dependency issues
let db: any;

try {
  // Import the database connection
  import('./db').then(dbModule => {
    db = dbModule.db;
    if (!db) {
      console.warn('PostgreSQL database connection is not available');
      setupFallbackDb();
    }
  }).catch(() => {
    console.error('Failed to import database module');
    setupFallbackDb();
  });
} catch (error) {
  console.error('Error importing database:', error);
  setupFallbackDb();
}

// Setup a fallback database object
function setupFallbackDb() {
  db = {
    select: () => ({ 
      from: () => ({ 
        where: () => [], 
        orderBy: () => [] 
      }) 
    }),
    insert: () => ({ 
      values: () => ({ 
        returning: () => [] 
      }) 
    })
  };
}

export class DatabaseStorage implements IStorage {
  private initialized = false;
  
  constructor() {
    console.log('PostgreSQL database storage initialized');
    // Setup initialization after db is available
    setTimeout(() => {
      this.initializeDatabase();
    }, 1000);
  }
  
  private async initializeDatabase() {
    if (this.initialized) return;
    
    try {
      // Check if we have a database connection
      if (db && typeof db.select === 'function') {
        console.log('Database connection is ready, initializing sample data');
        this.initialized = true;
        await this.initializeCoursesIfEmpty();
      } else {
        console.log('Database not yet ready, will retry...');
        // Retry after a delay
        setTimeout(() => {
          this.initializeDatabase();
        }, 2000);
      }
    } catch (error) {
      console.error('Error during database initialization:', error);
    }
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return undefined;
    }
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email));
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Create the new user with proper values
      const result = await db.insert(users).values({
        ...insertUser,
        subscriptionPlan: "none",
        isAdmin: false,
        fullName: insertUser.fullName || null
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Message operations
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
      const now = new Date();
      const result = await db.insert(messages).values({
        ...insertMessage,
        createdAt: now
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }
  
  async getMessages(): Promise<Message[]> {
    try {
      return await db.select().from(messages).orderBy(desc(messages.createdAt));
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }
  
  // Course operations
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    try {
      const result = await db.insert(courses).values({
        ...insertCourse,
        enrolledCount: 0,
        rating: 0,
        imageUrl: insertCourse.imageUrl || null,
        tags: insertCourse.tags || null
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    try {
      const [course] = await db.select().from(courses).where(eq(courses.id, id));
      return course;
    } catch (error) {
      console.error('Error getting course by ID:', error);
      return undefined;
    }
  }
  
  async getAllCourses(): Promise<Course[]> {
    try {
      return await db.select().from(courses).orderBy(courses.id);
    } catch (error) {
      console.error('Error getting all courses:', error);
      return [];
    }
  }
  
  // Chatbot operations
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    try {
      const now = new Date();
      const result = await db.insert(chatConversations).values({
        ...insertConversation,
        createdAt: now,
        updatedAt: now
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating chat conversation:', error);
      throw error;
    }
  }
  
  async getChatConversation(id: number): Promise<ChatConversation | undefined> {
    try {
      const [conversation] = await db.select().from(chatConversations).where(eq(chatConversations.id, id));
      return conversation;
    } catch (error) {
      console.error('Error getting chat conversation:', error);
      return undefined;
    }
  }
  
  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    try {
      const now = new Date();
      const result = await db.insert(chatMessages).values({
        ...insertMessage,
        createdAt: now
      }).returning();
      
      // Update the conversation's updatedAt timestamp
      await db.update(chatConversations)
        .set({ updatedAt: now })
        .where(eq(chatConversations.id, insertMessage.conversationId));
      
      return result[0];
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  }
  
  async getChatMessagesByConversation(conversationId: number): Promise<ChatMessage[]> {
    try {
      return await db.select()
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, conversationId))
        .orderBy(chatMessages.createdAt);
    } catch (error) {
      console.error('Error getting chat messages:', error);
      return [];
    }
  }
  
  // Initialize sample courses if there are none
  async initializeCoursesIfEmpty() {
    try {
      const existingCourses = await db.select({ count: courses.id }).from(courses);
      if (existingCourses.length > 0) return;
      
      console.log("Initializing sample courses in PostgreSQL database");
      
      // Sample courses to add
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
      
      // Add each course to the database
      for (const course of sampleCourses) {
        await this.createCourse(course);
      }
    } catch (error) {
      console.error('Error initializing courses:', error);
    }
  }
}

// Export an instance
export const databaseStorage = new DatabaseStorage();