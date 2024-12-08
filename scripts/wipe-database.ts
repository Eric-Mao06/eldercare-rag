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
    process.exit(0);  // Exit successfully
  } catch (error) {
    console.error('Error wiping database:', error);
    process.exit(1);  // Exit with error
  }
}

wipeDatabase().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
