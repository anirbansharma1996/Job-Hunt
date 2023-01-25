import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Color } from "../Theme";
export default function Navbar() {
  // const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  let prox = localStorage.getItem("proxy");
  //console.log(prox)
  const handleJob = () => {
    if (prox == false) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  const handleAppliedJob = () => {
    if (prox == false) {
      navigate("/login");
    } else {
      navigate("/apply");
    }
  };
  let name = localStorage.getItem("email");

  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("mock12");
    localStorage.setItem("proxy", false);
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 1000);
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleAc = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/admin");
    }
  };
  const handleSl = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/student_list");
    }
  };
  const handleCl = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/list");
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <Mobile />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontSize={["xs", "md", "xl"]}
          >
            <b>{name} </b>
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Box cursor={"pointer"} onClick={handleHome}>
              <Text as={"b"}>Home</Text>
            </Box>
          </Flex>
          {name?.includes("@masaischool.com") ? (
            <>
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Box cursor={"pointer"} onClick={handleAc}>
                  <Text as={"b"}>Add Comapny</Text>
                </Box>
              </Flex>
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Box cursor={"pointer"} onClick={handleCl}>
                  <Text as={"b"}>Company List</Text>
                </Box>
              </Flex>
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Box cursor={"pointer"} onClick={handleSl}>
                  <Text as={"b"}>Student List</Text>
                </Box>
              </Flex>
            </>
          ) : (
            <>
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Box cursor={"pointer"} onClick={handleJob}>
                  <Text as={"b"}>Find Jobs</Text>
                </Box>
              </Flex>
              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <Box cursor={"pointer"} onClick={handleAppliedJob}>
                  <Text as={"b"}>Applied</Text>
                </Box>
              </Flex>
            </>
          )}
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {name ? (
            <Button
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Button
                display={{ base: "inline-flex", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </>
          )}
          <Color />
        </Stack>
      </Flex>
    </Box>
  );
}

export function Mobile() {
  let prox = localStorage.getItem("proxy");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let name = localStorage.getItem("email");
  const navigate = useNavigate();
  const handleAppliedJob = () => {
    if (prox == false) {
      navigate("/login");
    } else {
      navigate("/apply");
    }
  };
  const handleJob = () => {
    if (prox == false) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };
  const handleAc = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/admin");
    }
  };
  const handleSl = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/student_list");
    }
  };
  const handleCl = () => {
    if (!prox) {
      navigate("/login");
    } else {
      navigate("/list");
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("mock12");
    localStorage.setItem("proxy", false);
    setTimeout(() => {
      window.location.reload();
      navigate("/");
    }, 1000);
  };
  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        <GiHamburgerMenu />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            MENU
            <Button
              onClick={handleLogOut}
              color={"white"}
              ml={["5rem","5rem","7rem"]}
              bg={"red.400"}
            >
              REST APP
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <Box
              p={3}
              border={"1px solid"}
              cursor={"pointer"}
              onClick={handleHome}
            >
              1.<Text p={6} as={"b"}>
                Home
              </Text>
            </Box>
            <br />
            {name?.includes("@masaischool.com") ? (
              <>
                <Box
                  p={3}
                  border={"1px solid"}
                  cursor={"pointer"}
                  onClick={handleAc}
                >
                  2.
                  <Text p={6} as={"b"}>
                    Add Comapny
                  </Text>
                </Box>
                <br />
                <Box
                  p={3}
                  border={"1px solid"}
                  cursor={"pointer"}
                  onClick={handleCl}
                >
                  3.
                  <Text p={6} as={"b"}>
                    Company List
                  </Text>
                </Box>
                <br />
                <Box
                  p={3}
                  border={"1px solid"}
                  cursor={"pointer"}
                  onClick={handleSl}
                >
                  4.
                  <Text p={6} as={"b"}>
                    Student List
                  </Text>
                </Box>
              </>
            ) : (
              <>
                <Box
                  p={3}
                  border={"1px solid"}
                  cursor={"pointer"}
                  onClick={handleJob}
                >
                  2.{" "}
                  <Text p={6} as={"b"}>
                    Find Jobs
                  </Text>
                </Box>

                <br />
                <Box
                  p={3}
                  border={"1px solid"}
                  cursor={"pointer"}
                  onClick={handleAppliedJob}
                >
                  3.{" "}
                  <Text p={6} as={"b"}>
                    Applied
                  </Text>
                </Box>
              </>
            )}
          </DrawerBody>

          <Button color={"blue.300"} onClick={onClose}>
            CLOSE
          </Button>
        </DrawerContent>
      </Drawer>
    </>
  );
}
