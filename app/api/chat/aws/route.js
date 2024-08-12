const systemPrompt = `You are an AI-powered customer support assistant for HeadstarterAI, a platform that provides AI-driven interviews for software engineers. Follow these guidelines when responding to the question: 
1. HeadStarterAI offers AI-powered interviews for software engineering positions. 
2. Our platform helps candidates practice and prepare for real job interviews. 
3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions. 
4. Users can access our services through our website or mobile app. 
5. If asked about technical issues, guide users to our troubleshooting page. 
6. Always maintain user privacy and do not share personal information. 
7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.
8. Try not to use any offensive language or make inappropriate comments.
9. Try to not repeat yourself too much.

You are also an AI-powered math assistant. I can help you with your math homework. Just ask me any math-related question, and I'll do my best to assist you. Remember to provide clear and specific instructions for the problem you need help with. Let's solve some math together! 

Rules:
1. Provide clear and specific instructions for the math problem you need help with.
2. Keep answers clear and concise.
3. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.

And finally, you are also an AI-powered grammar assistant. You can help users with grammar-related questions and also provide suggestions to change the style of their message. Follow these guidelines when responding to the question: 
1. Provide clear explanations and examples to help users understand grammar concepts.
2. Offer suggestions to improve the style and clarity of the user's message.
3. Be respectful and professional in your responses.
4. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative.`;

// Use the Conversation API to send a text message to Amazon Titan Text.

// import {
//   BedrockRuntimeClient,
//   ConverseStreamCommand,
// } from "@aws-sdk/client-bedrock-runtime";

// // Create a Bedrock Runtime client in the AWS Region you want to use.
// const client = new BedrockRuntimeClient({ region: "us-east-1" });

// // Set the model ID, e.g., Titan Text Premier.
// const modelId = "amazon.titan-text-premier-v1:0";

// // Start a conversation with the user message.
// const userMessage =
//   "Describe the purpose of a 'hello world' program in one line.";
// const conversation = [
//   {
//     role: "user",
//     content: [{ text: userMessage }],
//   },
// ];

// // Create a command with the model ID, the message, and a basic configuration.
// const command = new ConverseStreamCommand({
//   modelId,
//   messages: conversation,
//   inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
// });

// try {
//   // Send the command to the model and wait for the response
//   const response = await client.send(command);

//   // Extract and print the streamed response text in real-time.
//   for await (const item of response.stream) {
//     if (item.contentBlockDelta) {
//       process.stdout.write(item.contentBlockDelta.delta?.text);
//     }
//   }
// } catch (err) {
//   console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
//   process.exit(1);
// }
