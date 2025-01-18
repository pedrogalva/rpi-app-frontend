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
    inpi_dispatch_name: string;
    inpi_dispatch_id: string;
    channel_name: string;
    create_moskit_card: boolean;
    active: boolean;
    channel_hook_url: string;
  }[];
};

const tableSx = {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
};

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

const ChannelsTable = (props: Props) => {
  return (
    <TableContainer component={Paper} sx={tableSx}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Despacho</TableHeaderCell>
            <TableHeaderCell>Canal do Slack</TableHeaderCell>
            <TableHeaderCell>Criar deal Moskit?</TableHeaderCell>
            <TableHeaderCell>Ativo</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.channels.map((channel) => (
            <TableRow key={channel.integration_id}>
              <TableCell align="left">{channel.inpi_dispatch_name}</TableCell>
              <TableCell>{channel.channel_name}</TableCell>
              <TableCell>
                {channel.create_moskit_card ? "Sim" : "Não"}
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
