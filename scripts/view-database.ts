import { db } from '../lib/db';
import { resources } from '../lib/db/schema/resources';
import { embeddings } from '../lib/db/schema/embeddings';

async function viewDatabase() {
  try {
    console.log('\n=== Resources ===');
    const allResources = await db.select().from(resources);
    console.log(JSON.stringify(allResources, null, 2));

    console.log('\n=== Embeddings ===');
    const allEmbeddings = await db.select({
      id: embeddings.id,
      resourceId: embeddings.resourceId,
      content: embeddings.content,
    }).from(embeddings);
    console.log(JSON.stringify(allEmbeddings, null, 2));
    
    process.exit(0);  // Exit successfully
  } catch (error) {
    console.error('Error viewing database:', error);
    process.exit(1);  // Exit with error
  }
}

viewDatabase().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
