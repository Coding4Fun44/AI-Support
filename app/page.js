"use client";
require("dotenv").config();
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const defaultMessages = [
    {
      role: "assistant",
      content:
        "Hi, I'm your personal support agent. How may I assist you today?",
    },
  ];
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm your personal support agent. How may I assist you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const clearMessages = async () => {
    setMessage("");
    setMessages(defaultMessages);
  };

  const sendMessage = async () => {
    setMessage("");

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "Typing..." },
    ]);

    const response = await fetch("/api/chat/headstarter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      let decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }

        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          if (lastMessage.content === "Typing...") {
            lastMessage.content = "";
          }
          let otherMessages = messages.slice(0, messages.length - 1);

          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

  return (
    <Box
      width="100vw"
      height={"100vh"}
      display={"flex"}
      sx={{ flexDirection: { xs: "column", md: "row" } }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        alignItems={""}
        p={2}
        pr={4}
        flexDirection={"column"}
        sx={{ textAlign: { xs: "center", md: "left" } }}
        maxWidth={"500px"}
      >
        <Typography variant={"h4"}>Chatbot v1</Typography>
        <Typography variant={"subtitle1"} color={"#D0D0D0"}>
          Powered by OpenAI
        </Typography>
        <Typography variant={"body1"} color={"#696969"}>
          <br></br>Hi! I'm the HeadstarterAI Chatbot. I can help you with any
          questions you have about the Headstarter program, math questions, or
          writing help.
        </Typography>

        <Typography variant={"body1"} color={"#696969"}>
          <br></br>Examples of questions you can ask me:
        </Typography>
        <Typography
          variant={"body1"}
          color={"#696969"}
          marginInline={2}
          marginTop={1}
          marginBottom={2}
          component={"ul"}
        >
          {
            ['What is HeadstarterAI about?','How does HeadstarterAI work?','What is 4005 + 23323?','What is the x-intercept for y = x^2 - 4?','How can I make the following text more professional?'].map((question, index) => {
              return <li key={index}>{question}</li>
            })
          }
        </Typography>

        <Typography variant={"body1"} color={"#696969"}>
          Ask me anything!
        </Typography>
      </Box>
      <Stack
        direction="column"
        width={"600px"}
        height={"700px"}
        border={"1px solid black"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
        borderRadius={"15px"}
        spacing={2}
      >
        <Stack
          bgcolor={"lightgray"}
          height={"50px"}
          width={"100%"}
          display={"flex"}
          borderRadius={"15px 15px 0 0"}
          justifyContent={"center"}
          spacing={2}
          pr={0.5}
        >
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button onClick={clearMessages} sx={{ borderRadius: 16 }}>
              <DeleteIcon />
            </Button>
          </Box>
        </Stack>
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow={"auto"}
          maxHeight={"100%"}
          px={2}
          py={1}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display={"flex"}
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
                color={"white"}
                width={"95%"}
                p={2}
                borderRadius={5}
              >
                <Typography whiteSpace={"pre-wrap"}>
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={"row"} spacing={2} p={2}>
          <TextField
            label={"Message"}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant={"outlined"}
            InputProps={{
              style: {
                borderRadius: 16,
              },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={sendMessage}
            sx={{ borderRadius: 16, textTransform: "none" }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
