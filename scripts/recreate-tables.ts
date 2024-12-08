import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function recreateTables() {
  try {
    // Drop existing tables
    console.log('Dropping existing tables...');
    await db.execute(sql`DROP TABLE IF EXISTS embeddings CASCADE`);
    await db.execute(sql`DROP TABLE IF EXISTS resources CASCADE`);
    
    // Create resources table
    console.log('Creating resources table...');
    await db.execute(sql`
      CREATE TABLE resources (
        id varchar(191) PRIMARY KEY NOT NULL,
        content text NOT NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        updated_at timestamp DEFAULT now() NOT NULL
      );
    `);

    // Create vector extension if not exists
    console.log('Creating vector extension...');
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`);

    // Create embeddings table with 1024 dimensions
    console.log('Creating embeddings table...');
    await db.execute(sql`
      CREATE TABLE embeddings (
        id varchar(191) PRIMARY KEY NOT NULL,
        resource_id varchar(191) REFERENCES resources(id) ON DELETE CASCADE,
        content text NOT NULL,
        embedding vector(1024) NOT NULL
      );
    `);

    // Create index
    console.log('Creating vector index...');
    await db.execute(sql`
      CREATE INDEX embeddingIndex ON embeddings 
      USING hnsw (embedding vector_cosine_ops);
    `);

    console.log('Tables recreated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error recreating tables:', error);
    process.exit(1);
  }
}

recreateTables().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
