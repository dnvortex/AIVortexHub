import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon database to use WebSockets
neonConfig.webSocketConstructor = ws;

// Create database connection
let pool;
let db;

try {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set. PostgreSQL database will not be available.");
  } else {
    // Initialize the connection pool
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000, // 5 second connection timeout
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    });
    
    // Create Drizzle ORM instance
    db = drizzle({ client: pool, schema });
    console.log("PostgreSQL database connection established successfully");
    
    // Test the connection
    pool.query('SELECT NOW()').then(() => {
      console.log("PostgreSQL database connection verified");
    }).catch(err => {
      console.error("PostgreSQL connection test failed:", err.message);
    });
  }
} catch (error) {
  console.error("Error initializing PostgreSQL database:", error);
}

export { pool, db };
