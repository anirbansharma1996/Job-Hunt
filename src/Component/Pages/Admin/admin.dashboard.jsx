import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
/////////////////////////////////////////////
export const AdminDash = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useSelector((state) => state.login);
  const toast = useToast();
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get("https://mock-data-mongodb.onrender.com/student")
        .then((res) => setUser(res.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (!login.token) {
    return <Navigate to="/login" />;
  }

  //-------------------------------------
  const handleClick = () => {
    if (name !== "") {
      const temp = user?.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
      setUser(temp);
      setName("");
      setState(!state);
    } else {
      setState(!state);
      getData();
      toast({
        title: "Empty Field",
        description: `Please Enter Valid Data`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  //////////////////////////////////
  return (
    <>
      <Heading mt={3}>ADMIN DASHBOARD</Heading>
      <Text>
        Total <b>{user?.length}</b> user
      </Text>
      <InputGroup m={"auto"} mt={6} w={["70%", "45%", "20%"]} size="md">
        <Input
          onChange={(e) => setName(e.target.value)}
          pr="4.5rem"
          type={"text"}
          placeholder="Enter Username"
          value={name}
        />
        <InputRightElement width={"4.5rem"}>
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {state ? "RESET" : "SHOW"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {loading ? (
        <Spinner mt={"10rem"} marginBottom={"6rem"} />
      ) : (
        <TableContainer w={"70%"} m={"auto"}>
          <Table marginBottom={10} mt={4} size="sm">
            <Thead>
              <Tr>
                <Th>Sl.No</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>profession</Th>
              </Tr>
            </Thead>
            {user?.map((el, i) => (
              <Tbody key={i}>
                <Tr>
                  <Td>{i + 1}.</Td>
                  <Td>{el.name}</Td>
                  <Td>{el.email}</Td>
                  <Td>
                    {el.email.includes("@masaischool.com")
                      ? "ADMIN"
                      : "STUDENT"}
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      )}
    </>
  );
};
//https://mock-data-mongodb.onrender.com/student
