import "./chat.css";
import sound from "../../sound/notificationSound.mp3";
import { Flex, Text, Divider, Avatar, Heading } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import {useSelector} from 'react-redux'
import {getAllUsers,socket} from "../../redux/user/userSlicer"

const ChatSideBar = () => {
  const soundRef = useRef(new Audio(sound));
  const users = useSelector(getAllUsers);
  


  //Notification
  function showNotification(sender, text) {
    if (Notification.permission === "granted") {
      const options = {
        body: text,
      };

      const notification = new Notification(
        `New Message from ${sender}`,
        options
      );
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification(sender, text);
        }
      });
    }
  }


  const messageResponseHandler = async (data) => {
    await showNotification(data.name, data.text);
    if (data.socketID !== socket.id) {
      soundRef.current.play();
    }
  };
  useEffect(() => {
    socket.on("messageResponse", messageResponseHandler);

    return () => {
      socket.off("messageResponse", messageResponseHandler);
    };
  }, [socket]);

  // console.log("USERS CHATSIDEBAR", users);

 

  return (
    <div className="chat__sidebar">
      <Flex
        h="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={30}
        width="15rem"
        flexDir="column"
      >
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            ml={4}
          >
            <Heading as="h4" size="lg">
             Welcome
            </Heading>
          </Flex>
        </Flex>
        <Divider display={"flex"} />

        <Flex p="5%" flexDir="column" w="100%" as="nav">
          {users.map((user) => {
            return <p className="user__sidebar" key={user.socketID}><h3 className="sidebar__user__name">{user.fullName}</h3></p>;
          })}
        </Flex>
      </Flex>
    </div>
  );
};
export default ChatSideBar;
