import { db } from '../db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddings } from '../db/schema/embeddings';

// Voyage AI embedding function
async function getVoyageEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`
    },
    body: JSON.stringify({
      model: 'voyage-3',
      input: text
    })
  });

  if (!response.ok) {
    throw new Error(`Voyage AI API error: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data[0].embedding;
}

async function getVoyageEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VOYAGE_API_KEY}`
    },
    body: JSON.stringify({
      model: 'voyage-3',
      input: texts
    })
  });

  if (!response.ok) {
    throw new Error(`Voyage AI API error: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data.map((item: any) => item.embedding);
}

// Normalize text for better matching
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s?.!]/g, '') // Remove special characters except basic punctuation
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim();
};

// Enhanced chunking with better content preservation
const generateChunks = (input: string): string[] => {
  // Clean up the input but preserve important characters
  const cleanedInput = input
    .replace(/\s+/g, ' ')  // Normalize whitespace but keep newlines
    .trim();

  // For very short inputs, keep as single chunk
  if (cleanedInput.length < 100) {
    return [cleanedInput];
  }

  // Split into paragraphs first
  const paragraphs = cleanedInput.split(/\n\s*\n/);
  const chunks: string[] = [];
  
  for (const paragraph of paragraphs) {
    // If paragraph is short enough, keep it as is
    if (paragraph.trim().length < 512) {
      if (paragraph.trim().length > 0) {
        chunks.push(paragraph.trim());
      }
      continue;
    }

    // For longer paragraphs, split into sentences
    const sentences = paragraph
      .split(/([.!?]+[\s\n]+)/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    let currentChunk = '';
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > 512) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());
  }

  return chunks;
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  // Keep original text structure
  const chunks = generateChunks(value);
  
  // Generate embeddings for normalized text
  const normalizedChunks = chunks.map(chunk => normalizeText(chunk));
  const embeddings = await getVoyageEmbeddings(normalizedChunks);

  // Return original text with embeddings
  return embeddings.map((embedding, i) => ({ 
    content: chunks[i], 
    embedding 
  }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const normalized = normalizeText(value);
  return await getVoyageEmbedding(normalized);
};

export const findRelevantContent = async (userQuery: string) => {
  const normalized = normalizeText(userQuery);
  const userQueryEmbedded = await generateEmbedding(normalized);
  
  // Use a dynamic similarity threshold based on query length
  const baseThreshold = 0.3;
  const threshold = Math.max(
    baseThreshold - (normalized.length > 20 ? 0.1 : 0),
    0.2
  );

  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;
  
  // Get more results initially for reranking
  const similarContent = await db
    .select({ 
      content: embeddings.content,
      similarity,
      resourceId: embeddings.resourceId
    })
    .from(embeddings)
    .where(gt(similarity, threshold))
    .orderBy(t => desc(t.similarity))
    .limit(8);  // Get more results for reranking

  // Rerank results considering both similarity and content length
  const reranked = similarContent
    .map(result => ({
      ...result,
      score: result.similarity * (1 + Math.min(result.content.length / 1000, 0.5))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);  // Return top 4 after reranking

  return reranked;
};
