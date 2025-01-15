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
    integration_id: number;
    dispatch_name: string;
    channel_name: string;
    create_moskit_deal: boolean;
    active: boolean;
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
            <TableCell>Despacho</TableCell>
            <TableCell>Canal do Slack</TableCell>
            <TableCell>Criar deal Moskit?</TableCell>
            <TableCell>Ativo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.channels.map((channel) => (
            <TableRow key={channel.integration_id}>
              <TableCell>{channel.dispatch_name}</TableCell>
              <TableCell>{channel.channel_name}</TableCell>
              <TableCell>
                {channel.create_moskit_deal ? "Sim" : "Não"}
              </TableCell>
              <TableCell>{channel.active ? "Sim" : "Não"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChannelsTable;
