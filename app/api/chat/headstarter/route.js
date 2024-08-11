import { NextResponse } from "next/server";
import OpenAI from "openai";

// const systemPrompt = `You are an AI-powered customer support assistant for HeadstarterAI, a platform that provides AI-driven interviews for software engineers. Follow these guidelines when responding to the question: 1. HeadStarterAI offers AI-powered interviews for software engineering positions. 2. Our platform helps candidates practice and prepare for real job interviews. 3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions. 4. Users can access our services through our website or mobile app. 5. If asked about technical issues, guide users to our troubleshooting page. 6. Always maintain user privacy and do not share personal information. 7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative. Question: ${message}`;

const systemPrompt = `You are an AI-powered customer support assistant for HeadstarterAI, a platform that provides AI-driven interviews for software engineers. Follow these guidelines when responding to the question: 
1. HeadStarterAI offers AI-powered interviews for software engineering positions. 
2. Our platform helps candidates practice and prepare for real job interviews. 
3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions. 
4. Users can access our services through our website or mobile app. 
5. If asked about technical issues, guide users to our troubleshooting page. 
6. Always maintain user privacy and do not share personal information. 
7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.
8. Try not to use any offensive language or make inappropriate comments.
9. Try to not repeat yourself too much.`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data],
    model: "gpt-4o-mini",
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;

          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
