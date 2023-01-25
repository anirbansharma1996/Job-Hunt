import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Login/login.action";

export function Login() {
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const login = useSelector((state) => state.login);
  //console.log(login);
  let LoginData = {
    email: logEmail,
    password: logPassword,
  };

  if (login.token != "" && logEmail.includes("@masaischool.com")) {
    localStorage.setItem("email", logEmail);
    toast({
      title: "Logged in as Admin.",
      description: "Welcome back to Admin's Page !!!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    return <Navigate to="/admin" />;
  }

  if (login.token != "") {
    localStorage.setItem("email", logEmail);
    toast({
      title: "Login Success.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    localStorage.setItem("proxy",true)
    return <Navigate to="/dashboard" />;
  }
  localStorage.setItem("proxy",false)

  const handleLogin = () => {
    dispatch(loginAction(LoginData));
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                onChange={(e) => setLogEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setLogPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: "column", sm: "row" }} align={"start"}>
                <Text>Or,</Text>
                <NavLink to="/signup">
                  <Link color={"blue.400"}>Sign Up</Link>
                </NavLink>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                {login.Loading ? <Spinner /> : "Log in"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
