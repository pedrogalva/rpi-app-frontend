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
  anticipations: {
    anticipation_id: number;
    asaas_payment_id: string;
    anticipation_status: string;
    anticipated_at: string;
    asaas_installment_id: string;
    anticipation_type: string;
    asaas_client_id: string;
    payment_status: string;
    payment_created_at: string;
    payment_date: string;
    payment_total_value: number;
    account_name: string;
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

const AnticipationsTable = (props: Props) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={tableSx}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell align="left">Asaas Payment ID</TableHeaderCell>
            <TableHeaderCell>Data da Antecipação</TableHeaderCell>
            <TableHeaderCell>Tipo de Antecipação</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Asaas Installment ID</TableHeaderCell>
            <TableHeaderCell align="right">Explorar</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.anticipations
            .sort((a, b) =>
              b.payment_created_at.localeCompare(a.payment_created_at)
            )
            .map((anticipation) => (
              <TableRow key={anticipation.anticipation_id}>
                <TableCell align="left">
                  {anticipation.asaas_payment_id}
                </TableCell>
                <TableCell>
                  {anticipation.anticipated_at &&
                  anticipation.anticipated_at.split("-").length === 3
                    ? `${anticipation.anticipated_at.split("-")[2]}/${
                        anticipation.anticipated_at.split("-")[1]
                      }/${anticipation.anticipated_at.split("-")[0]}`
                    : "-"}
                </TableCell>
                <TableCell>{anticipation.anticipation_type}</TableCell>
                <TableCell>{anticipation.anticipation_status}</TableCell>
                <TableCell>{anticipation.asaas_installment_id}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/anticipations/${anticipation.anticipation_type}?anticipation=${anticipation.anticipation_id}`
                      );
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

export default AnticipationsTable;
