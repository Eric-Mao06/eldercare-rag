import { createResource } from '../lib/actions/resources';
import fs from 'fs';
import path from 'path';

interface Chunk {
  content: string;
  startIndex: number;
  endIndex: number;
}

function normalizeText(text: string): string {
  return text
    // Replace multiple newlines with exactly two newlines
    .replace(/\n{3,}/g, '\n\n')
    // Replace multiple spaces with a single space
    .replace(/[ \t]+/g, ' ')
    // Trim whitespace from the beginning and end
    .trim();
}

function splitTextIntoOverlappingChunks(text: string, maxChunkSize: number = 4000, overlap: number = 200): Chunk[] {
  const chunks: Chunk[] = [];
  
  // Normalize the text first
  const normalizedText = normalizeText(text);
  
  // Split text into sections based on double newlines (paragraph breaks)
  const sections = normalizedText.split(/\n\n/);
  
  let currentChunk = '';
  let currentStartIndex = 0;
  let textPosition = 0;
  
  for (const section of sections) {
    // If adding this section would exceed maxChunkSize, save current chunk and start new one
    if (currentChunk.length + section.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        startIndex: currentStartIndex,
        endIndex: currentStartIndex + currentChunk.length
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
            endIndex: currentStartIndex + currentChunk.length
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
      endIndex: currentStartIndex + currentChunk.length
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
    
    // Allow small gaps (up to 2 newlines) between chunks
    const gapSize = currentChunk.startIndex - previousChunk.endIndex;
    if (gapSize > 2) {
      console.error(`Large gap found between chunks at position ${previousChunk.endIndex}`);
      return false;
    }
  }
  
  // Check if first chunk starts near the beginning
  if (sortedChunks[0].startIndex > 10) {
    console.error('First chunk starts too far from beginning of text');
    return false;
  }
  
  // Check if last chunk ends near the end
  const normalizedText = normalizeText(originalText);
  const lastChunkEnd = sortedChunks[sortedChunks.length - 1].endIndex;
  if (lastChunkEnd < normalizedText.length - 10) {
    console.error('Last chunk ends too far from end of text');
    return false;
  }
  
  return true;
}

async function uploadLargeText() {
  // Read the input file
  const inputPath = path.join(process.cwd(), 'data', 'title22.txt');
  const text = fs.readFileSync(inputPath, 'utf-8');
  
  // Split text into chunks
  const chunks = splitTextIntoOverlappingChunks(text);
  
  // Validate chunks
  if (!validateChunks(text, chunks)) {
    throw new Error('Chunk validation failed');
  }
  
  console.log(`Split text into ${chunks.length} chunks`);
  
  // Upload each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`Uploading chunk ${i + 1}/${chunks.length} (${chunk.content.length} characters)`);
    
    try {
      await createResource({
        content: chunk.content,
      });
    } catch (error) {
      console.error(`Error uploading chunk ${i + 1}:`, error);
      throw error;
    }
  }
  
  console.log('Upload complete');
}

uploadLargeText().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
