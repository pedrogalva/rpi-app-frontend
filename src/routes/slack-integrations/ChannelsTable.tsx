import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  channels: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthday: string;
  }[];
};

const tableSx = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
};

const ChannelsTable = (props: Props) => {
  return (
    <TableContainer component={Paper} sx={tableSx}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birthday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.channels.map((channel) => (
            <TableRow key={channel.id}>
              <TableCell>{channel.first_name}</TableCell>
              <TableCell>{channel.last_name}</TableCell>
              <TableCell>{channel.email}</TableCell>
              <TableCell>{channel.birthday}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChannelsTable;
