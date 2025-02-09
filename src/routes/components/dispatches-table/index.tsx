import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  dispatches: {
    dispatch_id: number;
    process_number: string;
    inpi_dispatch_type: string;
    complementary_text: string;
    dispatch_json: string;
    dispatch_date: string;
    rpi_number: number;
    previous_dispatch_id: number;
    dispacth_count: number;
    dispatch_identifier: string;
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

const DispatchesTable = (props: Props) => {
  return (
    <TableContainer component={Paper} sx={tableSx}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Número do processo</TableHeaderCell>
            <TableHeaderCell>Tipo do despacho</TableHeaderCell>
            <TableHeaderCell>Número da RPI</TableHeaderCell>
            <TableHeaderCell>Data do despacho</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dispatches
            .sort((a, b) =>
              a.inpi_dispatch_type.localeCompare(b.inpi_dispatch_type)
            )
            .map((dispa) => (
              <TableRow key={dispa.dispatch_id}>
                <TableCell align="left">{dispa.process_number}</TableCell>
                <TableCell>{dispa.inpi_dispatch_type}</TableCell>
                <TableCell>{dispa.rpi_number}</TableCell>
                <TableCell>{dispa.dispatch_date}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DispatchesTable;
