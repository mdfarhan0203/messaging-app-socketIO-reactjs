import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  //   Link,
  Avatar,
  FormControl,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { addUser, socket } from "../redux/user/userSlicer";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignUp = () => {
  const dispatch = useDispatch();
  const [updatedUser, setUpdatedUser] = useState([]);
  const navigator = useNavigate();
  const [newUserData, setnewUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setnewUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      if (!newUserData.email || !newUserData.password || !newUserData.fullName) {
        alert("Please fill in all the fields");
        return;
      }

      localStorage.setItem("idNumber", socket.id);
      const { fullName } = { ...newUserData };
      socket.emit("newUser", { fullName, socketID: socket.id });
      //
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = [...existingUsers, newUserData];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("userName", JSON.stringify(fullName));

      setUpdatedUser(updatedUsers);
      dispatch(addUser(updatedUsers));

      navigator("/");
      
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log("updatedUser", updatedUser);
  }, [updatedUser, dispatch]);

  return (
    <div>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
        gap="2rem"
      >
        <Stack
          flexDir="column"
          mb="3"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Sign Up </Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handlerSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                borderRadius="1rem"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={newUserData.fullName}
                      onChange={handlerChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      name="email"
                      value={newUserData.email}
                      placeholder="email address"
                      onChange={handlerChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type="password"
                      name="password"
                      value={newUserData.password}
                      placeholder="Password"
                      onChange={handlerChange}
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          <h3>
            Aready Hava Account ?{" "}
            <Link to="/">
              <span className="sign__in">Login</span>
            </Link>
          </h3>
        </Box>
      </Flex>
    </div>
  );
};
export default SignUp;
