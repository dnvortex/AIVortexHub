import { IStorage } from './storage';
import { 
  User, InsertUser, 
  Message, InsertMessage, 
  Course, InsertCourse,
  ChatConversation, InsertChatConversation,
  ChatMessage, InsertChatMessage 
} from '@shared/schema';
import { getFirestore } from './firebaseAdmin';

// Firestore implementation of IStorage
export class FirebaseStorage implements IStorage {
  private db: any; // Using any type to avoid import issues
  
  constructor() {
    try {
      this.db = getFirestore();
      console.log("Firebase storage initialized");
    } catch (error) {
      console.error("Error initializing Firebase Firestore:", error);
      // Create an empty mock object if Firestore fails to initialize
      this.db = {
        collection: () => ({
          doc: () => ({
            get: async () => ({ exists: false, data: () => ({}) }),
            set: async () => ({})
          }),
          where: () => ({
            limit: () => ({
              get: async () => ({ empty: true, docs: [] })
            })
          }),
          orderBy: () => ({
            limit: () => ({
              get: async () => ({ empty: true, docs: [] })
            }),
            get: async () => ({ empty: true, docs: [] })
          }),
          get: async () => ({ empty: true, docs: [] })
        })
      };
    }
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const snapshot = await this.db.collection('users').where('id', '==', id).get();
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const snapshot = await this.db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const snapshot = await this.db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return undefined;
    return snapshot.docs[0].data() as User;
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    // Get highest id to assign new id
    const snapshot = await this.db.collection('users').orderBy('id', 'desc').limit(1).get();
    const id = snapshot.empty ? 1 : (snapshot.docs[0].data() as User).id + 1;
    
    const user: User = { 
      ...insertUser, 
      id,
      subscriptionPlan: "none",
      isAdmin: false,
      fullName: insertUser.fullName || null
    };
    
    await this.db.collection('users').doc(id.toString()).set(user);
    return user;
  }
  
  // Message operations
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    // Get highest id to assign new id
    const snapshot = await this.db.collection('messages').orderBy('id', 'desc').limit(1).get();
    const id = snapshot.empty ? 1 : (snapshot.docs[0].data() as Message).id + 1;
    
    const now = new Date();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: now
    };
    
    await this.db.collection('messages').doc(id.toString()).set(message);
    return message;
  }
  
  async getMessages(): Promise<Message[]> {
    const snapshot = await this.db.collection('messages').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map((doc: any) => doc.data() as Message);
  }
  
  // Course operations
  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    // Get highest id to assign new id
    const snapshot = await this.db.collection('courses').orderBy('id', 'desc').limit(1).get();
    const id = snapshot.empty ? 1 : (snapshot.docs[0].data() as Course).id + 1;
    
    const course: Course = {
      ...insertCourse,
      id,
      enrolledCount: 0,
      rating: 0,
      imageUrl: insertCourse.imageUrl || null,
      tags: insertCourse.tags || null
    };
    
    await this.db.collection('courses').doc(id.toString()).set(course);
    return course;
  }
  
  async getCourse(id: number): Promise<Course | undefined> {
    const doc: any = await this.db.collection('courses').doc(id.toString()).get();
    if (!doc.exists) return undefined;
    return doc.data() as Course;
  }
  
  async getAllCourses(): Promise<Course[]> {
    const snapshot = await this.db.collection('courses').orderBy('id').get();
    return snapshot.docs.map((doc: any) => doc.data() as Course);
  }
  
  // Chatbot operations
  async createChatConversation(insertConversation: InsertChatConversation): Promise<ChatConversation> {
    // Get highest id to assign new id
    const snapshot = await this.db.collection('chatConversations').orderBy('id', 'desc').limit(1).get();
    const id = snapshot.empty ? 1 : (snapshot.docs[0].data() as ChatConversation).id + 1;
    
    const now = new Date();
    const conversation: ChatConversation = {
      ...insertConversation,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    await this.db.collection('chatConversations').doc(id.toString()).set(conversation);
    return conversation;
  }
  
  async getChatConversation(id: number): Promise<ChatConversation | undefined> {
    const doc: any = await this.db.collection('chatConversations').doc(id.toString()).get();
    if (!doc.exists) return undefined;
    return doc.data() as ChatConversation;
  }
  
  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    // Get highest id to assign new id
    const snapshot = await this.db.collection('chatMessages').orderBy('id', 'desc').limit(1).get();
    const id = snapshot.empty ? 1 : (snapshot.docs[0].data() as ChatMessage).id + 1;
    
    const now = new Date();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: now
    };
    
    await this.db.collection('chatMessages').doc(id.toString()).set(message);
    
    // Update the conversation's updatedAt timestamp
    const conversationDoc = await this.db.collection('chatConversations').doc(insertMessage.conversationId.toString()).get();
    if (conversationDoc.exists) {
      await this.db.collection('chatConversations').doc(insertMessage.conversationId.toString()).update({
        updatedAt: now
      });
    }
    
    return message;
  }
  
  async getChatMessagesByConversation(conversationId: number): Promise<ChatMessage[]> {
    const snapshot = await this.db.collection('chatMessages')
      .where('conversationId', '==', conversationId)
      .orderBy('createdAt')
      .get();
    
    return snapshot.docs.map((doc: any) => doc.data() as ChatMessage);
  }
  
  // Initialize sample courses if there are none
  async initializeCoursesIfEmpty() {
    const snapshot = await this.db.collection('courses').get();
    if (!snapshot.empty) return;
    
    console.log("Initializing sample courses in Firebase");
    
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
    
    // Add each course to Firestore
    for (const course of sampleCourses) {
      await this.createCourse(course);
    }
  }
}

// Export an instance
export const firebaseStorage = new FirebaseStorage();