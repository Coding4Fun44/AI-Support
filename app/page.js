"use client";
require("dotenv").config();
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm the Headstarter Support Agent. How may I assist you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
    ]);
    const systemPrompt = `You are an AI-powered customer support assistant for HeadstarterAI, a platform that provides AI-driven interviews for software engineers. Follow these guidelines when responding to the question: 1. HeadStarterAI offers AI-powered interviews for software engineering positions. 2. Our platform helps candidates practice and prepare for real job interviews. 3. We cover a wide range of topics including algorithms, data structures, system design, and behavioral questions. 4. Users can access our services through our website or mobile app. 5. If asked about technical issues, guide users to our troubleshooting page. 6. Always maintain user privacy and do not share personal information. 7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a human representative. Question: ${message}`;
    console.log(process.env.API_KEY);
    const key =
      "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";
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [{ role: "user", content: systemPrompt }],
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    if (response.ok) {
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: json.choices[0].message.content },
      ]);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={"column"}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
