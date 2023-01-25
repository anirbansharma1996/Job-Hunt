import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
 
  TableContainer,
  Heading,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
export const Apply = () => {
  let company = JSON.parse(localStorage.getItem("apply"))||[];
  const login = useSelector((state) => state.login);
  if (!login.token) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Heading mt={"2rem"}>APPLIED COMPANIES</Heading>
      <TableContainer mt={"3rem"} w={"80%"} m={"auto"}>
          <Text>
            You have Applied for {company.length} companies
          </Text>
        <Table marginBottom={10} mt={4}variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Sl.No</Th>
              <Th>Company</Th>
              <Th>location</Th>
              <Th>Role</Th>
              <Th>Contract</Th>
              <Th>salary</Th>
              <Th>interview</Th>
            </Tr>
          </Thead>
          {company?.map((el, i) => (
            <Tbody>
              <Tr>
                <Td>{i + 1}.</Td>
                <Td>{el.company}</Td>
                <Td>{el.location}</Td>
                <Td>{el.position}</Td>
                <Td>{el.contract}</Td>
                <Td>₹ {el.ctc} LPA</Td>
                <Checkbox ml={"-2rem"} mt={4} size="md" colorScheme="green" >
                </Checkbox>
              </Tr>
              <hr />
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};
