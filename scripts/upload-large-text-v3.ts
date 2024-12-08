import { createResource } from '../lib/actions/resources';
import fs from 'fs';
import path from 'path';

interface Chunk {
  content: string;
  startIndex: number;
  endIndex: number;
}

function splitTextIntoOverlappingChunks(text: string, maxChunkSize: number = 4000, overlap: number = 200): Chunk[] {
  const chunks: Chunk[] = [];
  
  // Split text into sections based on double newlines (paragraph breaks)
  const sections = text.split(/\n\n+/);
  
  let currentChunk = '';
  let currentStartIndex = 0;
  let textPosition = 0;
  
  for (const section of sections) {
    // If adding this section would exceed maxChunkSize, save current chunk and start new one
    if (currentChunk.length + section.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        startIndex: currentStartIndex,
        endIndex: textPosition - 1
      });
      
      // Start new chunk with overlap from previous chunk
      const lastChunkWords = currentChunk.split(' ').slice(-overlap/10); // Approximately 10 chars per word
      currentChunk = lastChunkWords.join(' ') + '\n\n';
      currentStartIndex = textPosition - currentChunk.length;
    }
    
    // If a single section is larger than maxChunkSize, split it by sentences
    if (section.length > maxChunkSize) {
      const sentences = section.match(/[^.!?]+[.!?]+/g) || [section];
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
          chunks.push({
            content: currentChunk.trim(),
            startIndex: currentStartIndex,
            endIndex: textPosition - 1
          });
          
          // Start new chunk with overlap from previous chunk
          const lastChunkWords = currentChunk.split(' ').slice(-overlap/10);
          currentChunk = lastChunkWords.join(' ') + ' ';
          currentStartIndex = textPosition - currentChunk.length;
        }
        currentChunk += sentence + ' ';
        textPosition += sentence.length + 1;
      }
    } else {
      currentChunk += section + '\n\n';
      textPosition += section.length + 2;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push({
      content: currentChunk.trim(),
      startIndex: currentStartIndex,
      endIndex: textPosition - 1
    });
  }
  
  return chunks;
}

function validateChunks(originalText: string, chunks: Chunk[]): boolean {
  // Sort chunks by start index
  const sortedChunks = [...chunks].sort((a, b) => a.startIndex - b.startIndex);
  
  // Check for gaps between chunks
  for (let i = 1; i < sortedChunks.length; i++) {
    const previousChunk = sortedChunks[i - 1];
    const currentChunk = sortedChunks[i];
    
    // There should be overlap between chunks
    if (currentChunk.startIndex > previousChunk.endIndex) {
      console.error(`Gap found between chunks at position ${previousChunk.endIndex}`);
      return false;
    }
  }
  
  // Check if first chunk starts at beginning
  if (sortedChunks[0].startIndex > 0) {
    console.error('First chunk does not start at beginning of text');
    return false;
  }
  
  // Check if last chunk ends at end
  if (sortedChunks[sortedChunks.length - 1].endIndex < originalText.length - 1) {
    console.error('Last chunk does not reach end of text');
    return false;
  }
  
  return true;
}

async function uploadLargeText() {
  try {
    // Read the text file
    const filePath = path.join(__dirname, '../data/continuing-care-contract-statutes.txt');
    const text = fs.readFileSync(filePath, 'utf-8');
    
    // Split text into overlapping chunks
    const chunks = splitTextIntoOverlappingChunks(text);
    
    // Validate chunks cover entire text
    if (!validateChunks(text, chunks)) {
      throw new Error('Chunk validation failed - text would not be completely embedded');
    }
    
    console.log(`Split text into ${chunks.length} overlapping chunks`);
    
    // Upload each chunk
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Uploading chunk ${i + 1}/${chunks.length} (${chunk.content.length} characters)`);
      console.log(`Chunk coverage: characters ${chunk.startIndex} to ${chunk.endIndex}`);
      
      await createResource({
        content: chunk.content
      });
    }
    
    console.log('Successfully uploaded all chunks');
    
    // Verify total character coverage
    const totalChars = chunks.reduce((sum, chunk) => sum + chunk.content.length, 0);
    console.log(`Total characters processed: ${totalChars}`);
    console.log(`Original text length: ${text.length}`);
    console.log(`Coverage ratio: ${(totalChars / text.length * 100).toFixed(2)}%`);
    
  } catch (error) {
    console.error('Error uploading text:', error);
    throw error;
  }
}

uploadLargeText().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
