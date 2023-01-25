import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { jobAction } from "../../Redux/Job/job.action";

export function Admin() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [contract, setContract] = useState("");
  const [location, setLocation] = useState("");
  const [ctc, setCtc] = useState("");
  const login = useSelector((state) => state.login);
  const job = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  // console.log(job);
  //////////////////////////////
  const postJob = {
    company,
    position,
    contract,
    location,
    ctc,
  };

  const handleJobSubmit = () => {
    dispatch(jobAction(postJob));
  };
  const handleListPage = () => {
    navigate("/list");
  };
  if (job.loading) {
    setTimeout(() => {
      toast({
        title: "Congratulations",
        description: `You've successfully Listed new Job `,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }, 1000);
  }

  ///////////////////////////////////
  if (!login.token) {
    return <Navigate to="/login" />;
  }

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Jobs Form
          </Heading>
          <Box onClick={handleListPage}>
            See the <Link color="blue.400">JOB LIST</Link>
          </Box>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="company" isRequired>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="position" isRequired>
                  <FormLabel>Position</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="contract" isRequired>
              <FormLabel>Contract</FormLabel>
              <Input
                type="text"
                placeholder=" Full Time/ Part Time"
                onChange={(e) => setContract(e.target.value)}
              />
            </FormControl>
            <FormControl id="ctc" isRequired>
              <FormLabel>Expected CTC</FormLabel>
              <Input
                type="number"
                placeholder=" XXX LPA"
                onChange={(e) => setCtc(e.target.value)}
              />
            </FormControl>
            <FormControl id="loaction" isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleJobSubmit}
              >
                {job.loading ? <Spinner /> : "SUBMIT"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
