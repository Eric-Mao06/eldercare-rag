import { createResource } from '../lib/actions/resources';
import fs from 'fs';
import path from 'path';

function splitTextIntoChunks(text: string, maxChunkSize: number = 4000): string[] {
  const chunks: string[] = [];
  
  // Split text into sections based on double newlines (paragraph breaks)
  const sections = text.split(/\n\n+/);
  
  let currentChunk = '';
  
  for (const section of sections) {
    // If adding this section would exceed maxChunkSize, save current chunk and start new one
    if (currentChunk.length + section.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }
    
    // If a single section is larger than maxChunkSize, split it by sentences
    if (section.length > maxChunkSize) {
      const sentences = section.match(/[^.!?]+[.!?]+/g) || [section];
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        currentChunk += sentence + ' ';
      }
    } else {
      currentChunk += section + '\n\n';
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

async function uploadLargeText() {
  try {
    // Read the text file
    const filePath = path.join(__dirname, '../data/continuing-care-contract-statutes.txt');
    const text = fs.readFileSync(filePath, 'utf-8');
    
    // Split text into chunks
    const chunks = splitTextIntoChunks(text);
    
    console.log(`Split text into ${chunks.length} chunks`);
    
    // Upload each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Uploading chunk ${i + 1}/${chunks.length} (${chunk.length} characters)`);
      
      await createResource({
        content: chunk
      });
    }
    
    console.log('Successfully uploaded all chunks');
  } catch (error) {
    console.error('Error uploading text:', error);
    throw error;
  }
}

uploadLargeText().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
