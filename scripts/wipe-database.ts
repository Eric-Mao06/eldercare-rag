import { db } from '../lib/db';
import { resources } from '../lib/db/schema/resources';
import { embeddings } from '../lib/db/schema/embeddings';

async function wipeDatabase() {
  try {
    // Delete all embeddings first due to foreign key constraint
    console.log('Deleting all embeddings...');
    await db.delete(embeddings);
    
    // Then delete all resources
    console.log('Deleting all resources...');
    await db.delete(resources);
    
    console.log('Database wiped successfully!');
  } catch (error) {
    console.error('Error wiping database:', error);
  }
}

wipeDatabase().catch(console.error);
