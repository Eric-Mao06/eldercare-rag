import { createResource } from '@/lib/actions/resources';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const result = streamText({
      model: openai('gpt-4o-mini'), 
      messages,
      system: `You are a helpful assistant with access to a knowledge base. Follow these rules strictly:

      1. ALWAYS use the getInformation tool first for EVERY user message, even if it doesn't look like a question
      2. When responding:
         - If getInformation returns results, analyze ALL returned content and combine relevant information
         - Pay attention to the similarity scores - prefer information with higher scores
         - If the best match has a similarity below 0.5, mention that you're not completely certain
         - If no results are returned, clearly state that you don't have that information
      3. When the user shares information:
         - ALWAYS use addResource to save it immediately
         - Add proper punctuation and preserve the original case
         - If the information relates to the user (like preferences or facts about them), prefix it with "User: "
      
      Remember: 
      - Never make up information or combine facts that weren't explicitly stated
      - If multiple pieces of information seem contradictory, mention the contradiction
      - Always preserve the exact wording from the knowledge base when quoting facts`,
      tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.
            If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
          parameters: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => {
            console.log('Adding resource:', content);
            return createResource({ content });
          },
        }),
        getInformation: tool({
          description: `get information from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => {
            console.log('Getting information for:', question);
            return findRelevantContent(question);
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      { status: 500 }
    );
  }
}
