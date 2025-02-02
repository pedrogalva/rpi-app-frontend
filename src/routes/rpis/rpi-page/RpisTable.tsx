import React from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

type Props = {
  rpis: {
    rpi_number: number;
    rpi_date: string;
    rpi_type: string;
    muvon_dispatches_count: number;
    read_status: string;
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

const RpisTable = (props: Props) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={tableSx}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Número da RPI</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
            <TableHeaderCell>Tipo</TableHeaderCell>
            <TableHeaderCell>Despachos da Move On</TableHeaderCell>
            <TableHeaderCell>Status de leitura</TableHeaderCell>
            <TableHeaderCell align="right">Explorar</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rpis
            .sort((a, b) => b.rpi_date.localeCompare(a.rpi_date))
            .map((rpi) => (
              <TableRow key={rpi.rpi_number}>
                <TableCell align="left">{rpi.rpi_number}</TableCell>
                <TableCell>{`${rpi.rpi_date.split("-")[2]}/${
                  rpi.rpi_date.split("-")[1]
                }/${rpi.rpi_date.split("-")[0]}`}</TableCell>
                <TableCell>{rpi.rpi_type}</TableCell>
                <TableCell>{rpi.muvon_dispatches_count}</TableCell>
                <TableCell>{rpi.read_status}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(`/rpis/${rpi.rpi_number}/${rpi.rpi_type}`);
                    }}
                  >
                    VIEW
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RpisTable;
