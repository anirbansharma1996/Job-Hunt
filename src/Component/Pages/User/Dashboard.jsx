import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  Select,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jobListAction } from "../../Redux/List/list.action";
import { useState } from "react";

export const Dashboard = () => {
  const [text, setText] = useState("");
  const { list, loading } = useSelector((state) => state.list);
  const login = useSelector((state) => state.login);

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(
    JSON.parse(localStorage.getItem("apply")) || []
  );
  //////////////////////////////////////////////////
  useEffect(() => {
    dispatch(jobListAction());
  }, []);
  if (list.length > 0 && data.length == 0) {
    setData(list);
  }
  //console.log(data);
  if (!login.token) {
    return <Navigate to="/login" />;
  }
  console.log(login);
  ///////////////////////////////////////////////////

  const handleContract = (v) => {
    setData(list?.filter((el) => el.contract.toLowerCase() == v));
  };

  const handleLocation = (v) => {
    setData(list?.filter((el) => el.location.toLowerCase() == v));
  };
  const handleSearch = () => {
    setData(
      list?.filter((el) => el.company.toLowerCase() == text.toLowerCase())
    );
  };
  const handleReset = () => {
    setData(list);
  };

  const handleApply = (id, el) => {
    setApplied([...applied, el]);
    let name;
    list?.map((el) => (el._id == id ? (name = el.company) : null));
    toast({
      title: "Congratulations",
      description: `You've successfully applied for ${name}`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setTimeout(() => {
      navigate("/apply");
    }, 1000);
  };
  localStorage.setItem("apply", JSON.stringify(applied));
  /////////////////////////////////

  ////////////////////////////////////////////////////////

  return (
    <>
      <Heading mt={"2rem"}>DASHBOARD</Heading>
      <Text>
        Job Opening for <b>{data?.length}</b> Companies
      </Text>
      <Text cursor={"pointer"} onClick={handleReset} color={"blue.400"}>
        RESET
      </Text>
      <Grid
        w={"50%"}
        m={"auto"}
        mt={"2rem"}
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
      >
        <GridItem w="100%">
          <Box display={"flex"}>
            <Input
              placeholder="Company Name"
              onChange={(e) => setText(e.target.value)}
            />
            <Button w={"10%"} onClick={handleSearch}>
              <FaSearch />
            </Button>
          </Box>
        </GridItem>
        <GridItem w="100%">
          <Select
            placeholder="Location"
            onChange={(e) => handleLocation(e.target.value)}
          >
            <option value="kolkata">Kolkata</option>
            <option value="noida">Noida</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
            <option value="hydrabad">Hydrabad</option>
          </Select>
        </GridItem>
        <GridItem w="100%">
          <Select
            onChange={(e) => handleContract(e.target.value)}
            placeholder="Contract"
          >
            <option value="fulltime">FULL TIME</option>
            <option value="parttime">PART TIME</option>
          </Select>
        </GridItem>
      </Grid>
      <Grid
        w={"90%"}
        m={"auto"}
        mt={"2rem"}
        templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={6}
        marginBottom={10}
      >

        {loading ? (
          <Spinner ml={["10rem","15rem","35rem"]} mt={"10rem"} marginBottom={"6rem"} />
        ) : (
          data?.map((el) => (
            <GridItem
              key={el._id}
              w="100%"
              p={3}
              boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
              border={"1px solid white"}
              borderRadius={"20px"}
            >
              <Heading fontSize={"2xl"} color={"green.600"} fontFamily={"body"}>
                {el.company}
              </Heading>
              <hr />
              <Text textAlign={"center"} px={3}>
                <b>POSITION:</b> {el.position.toUpperCase()}
              </Text>
              <Text>
                {" "}
                <b>CONTRACT :</b> {el.contract}
              </Text>

              <Text>
                {" "}
                <b>LOCATION :</b> {el.location}
              </Text>

              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"green.300"}
                margin={2}
                color={"white"}
                onClick={() => handleApply(el._id, el)}
              >
                EASY APPLY
              </Button>
            </GridItem>
          ))
        )}
      </Grid>
    </>
  );
};
