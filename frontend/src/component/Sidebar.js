import "./chats/chat.css";
import React, { useState, useEffect, useRef } from "react";
import ChatSideBar from "./chats/ChatSideBar";
import ChatBody from "./chats/ChatBody";
import ChatFooter from "./chats/ChatFooter";
import { Box } from "@chakra-ui/react";
import { addMessageResponce, socket } from "../redux/user/userSlicer";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    console.log("messss",messages);
    localStorage.setItem("responseMessage", JSON.stringify(messages));
    dispatch(addMessageResponce(messages));
  }, [socket, messages, dispatch]);

  useEffect(() => {
    //scroll
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Box className="chat">
      <ChatSideBar />
      <Box className="chat__main">
        <ChatBody lastMessageRef={lastMessageRef} />
        <ChatFooter />
      </Box>
    </Box>
  );
}
