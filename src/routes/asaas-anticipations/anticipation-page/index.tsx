import React, { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import useAxiosCustom from "../../../hooks";
import MessageContainer from "../../components/message-container";
import Header from "../../components/header";
import AnticipationsTable from "./AnticipationsTable";

const AnticipationPage = () => {
  const _limit = 50;

  const [{ error, data, loading }, refetchAnticipations] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL +
      `/anticipations/get_anticipations_installments?limit=${_limit}`
  );

  const handlePageChange = (page: number) => {
    refetchAnticipations({
      url:
        process.env.REACT_APP_BACKEND_BASE_URL +
        `/anticipations/get_anticipations_installments?limit=${_limit}&page=${page}`,
    });
    changePage(page);
  };

  const [actualPage, changePage] = useState(1);

  if (loading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (error) {
    return (
      <MessageContainer>
        <Box>Error loading anticipations {error.message}</Box>
        <Button variant="contained" onClick={() => refetchAnticipations()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header
        title={"Antecipações"}
        subtitle={
          "Esta página contém todas as antecipações em andamento, completas ou canceladas."
        }
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }} />
      <AnticipationsTable anticipations={data.data} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Pagination
          count={Math.ceil(Number(data.total) / _limit)}
          color="primary"
          showFirstButton
          showLastButton
          page={actualPage}
          onChange={(_, page) => {
            handlePageChange(page);
          }}
        />
      </Box>
    </Box>
  );
};

export default AnticipationPage;
