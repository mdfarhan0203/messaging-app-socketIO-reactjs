import React, { useState } from "react";
import {
  Flex,
  Input,
  Stack,
  Box,
  FormControl,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import "./chat.css"
import { IoSend } from "react-icons/io5";

import {socket} from "../../redux/user/userSlicer"

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <Flex width={"100%"}>
        <Stack>
          <Box width={"50rem"}>
            <form onSubmit={handleSendMessage}  >
              <Stack
             
                spacing={4}
                p="1rem"
              >
                <FormControl>
                  <InputGroup>
                    <Input
                      className='message' 
                      type="text"
                      placeholder="message.........."
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                >
                 <IoSend />
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};
export default ChatFooter;
