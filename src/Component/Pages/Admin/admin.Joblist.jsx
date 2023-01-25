import React, { useState } from "react";
import {
  Heading,
  Text,
  Button,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jobListAction } from "../../Redux/List/list.action";
import { deleteJob, editJob } from "../../Redux/Job/job.action";
import { Navigate, useNavigate } from "react-router-dom";
export const Joblist = () => {
  const [id, setId] = useState("");
  const [cname, setCname] = useState("");
  const [updatedSalary, setUpdatedSalary] = useState(0);
  const [data, setData] = useState([]);
  const { list, loading } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [count, setCount] = useState(0);
  const login = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(jobListAction());
  }, [data]);

  const handleSave = () => {
    setData(list);
    dispatch(editJob(updatedSalary, id));
    onClose();
  };
  if (list.length > 0 && data.length == 0) {
    setData(list);
  }

  const handleEdit = (id) => {
    setId(id);
    onOpen();
    data?.map((el) => (el._id == id ? setCname(el.company) : null));
  };

  const handleDelete = (id) => {
    setData(list);
    dispatch(deleteJob(id));
    toast({
      title: "Deleted",
      description: `Successfully Removed One JOB from List`,
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setCount((count) => count + 1);
  };
  const handleFormPage = () => {
    navigate("/admin");
  };
  if (!login.token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Text
        onClick={handleFormPage}
        cursor={"pointer"}
        color={"blue.400"}
        align={"left"}
        ml={5}
      >
        {" "}
        <u>Go Back</u>{" "}
      </Text>
      <Heading mt={"1rem"}>COMPANY LIST</Heading>
      <TableContainer mt={"3rem"} w={"80%"} m={"auto"}>
        <Text>
          We have <b>{data?.length}</b> active companies
        </Text>
        <Table
          marginBottom={10}
          mt={"3rem"}
          variant="striped"
          colorScheme="teal"
        >
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Company</Th>
              <Th>location</Th>
              <Th>Role</Th>
              <Th>Contract</Th>
              <Th>salary</Th>
              <Th>update</Th>
              <Th>delete</Th>
            </Tr>
          </Thead>
          {loading ? (
            <Spinner
              ml={["10rem", "14rem", "30rem"]}
              mt={"8rem"}
              marginBottom={"8rem"}
            />
          ) : (
            data?.map((el, i) => (
              <Tbody>
                <Tr>
                  <Td>{i + 1}.</Td>
                  <Td>
                    <b>{el.company}</b>{" "}
                  </Td>
                  <Td>{el.location}</Td>
                  <Td>
                    <b>{el.position}</b>
                  </Td>
                  <Td>{el.contract}</Td>
                  <Td>
                    <b> ₹ {el.ctc} LPA</b>
                  </Td>
                  <Td>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      bg={"blue.400"}
                      onClick={() => handleEdit(el._id)}
                    >
                      UPDATE
                    </Button>
                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Updated CTC for{" "}
                          <Text color={"green.400"}>
                            {" "}
                            <b>
                              <u>{cname}</u>
                            </b>
                          </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel>New CTC</FormLabel>
                            <Input
                              onChange={(e) => setUpdatedSalary(e.target.value)}
                              ref={initialRef}
                              placeholder="XX LPA"
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={handleSave}
                            colorScheme="blue"
                            mr={3}
                          >
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Td>
                  <Td>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      bg={"red.400"}
                      onClick={() => handleDelete(el._id)}
                    >
                      DELETE
                    </Button>
                  </Td>
                </Tr>
                <hr />
              </Tbody>
            ))
          )}
        </Table>
      </TableContainer>
    </>
  );
};
