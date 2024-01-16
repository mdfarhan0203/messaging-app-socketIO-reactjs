import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
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
  Avatar,
  FormControl,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const SignIn = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
    console.log("ON CHANGE");
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      if (!loginData.email || !loginData.password) {
        alert("Please fill in all the fields");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users && users.find((user) =>user.email === loginData.email && user.password === loginData.password);
      if (!user) {
        alert("Invalid credentials or Data Sign Up");
        return;
      } else {
        navigate("/sidebar");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
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
                      type="email"
                      placeholder="email address"
                      name="email"
                      value={loginData.email}
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
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
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
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          <h3>New to us ?
          <Link to="/sign-up">
            <span className="sign__up">  Sign Up</span>
          </Link>
          </h3>
        </Box>
      </Flex>
    </div>
  );
};
export default SignIn;
