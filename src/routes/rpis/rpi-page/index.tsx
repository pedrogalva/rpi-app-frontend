import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import useAxiosCustom from "../../../hooks";
import MessageContainer from "../../components/message-container";
import Header from "../../components/header";
import RpisTable from "./RpisTable";

const RpiPage = () => {
  const _limit = 50;

  const [{ error, data, loading }, refetchRpis] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL + `/rpi/get_rpis?limit=${_limit}`
  );

  const handlePageChange = (page: number) => {
    refetchRpis({
      url:
        process.env.REACT_APP_BACKEND_BASE_URL +
        `/rpi/get_rpis?limit=${_limit}&page=${page}`,
    });
  };

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
        <Box>Error loading rpis {error.message}</Box>
        <Button variant="contained" onClick={() => refetchRpis()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header
        title={"RPIs"}
        subtitle={
          "Esta página contém todas as RPIs que contiveram algum despacho da Move On."
        }
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }} />
      <RpisTable rpis={data.data} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <Pagination
          count={Math.ceil(Number(data.total) / _limit)}
          color="primary"
          showFirstButton
          showLastButton
          onChange={(_, page) => {
            handlePageChange(page);
          }}
        />
      </Box>
    </Box>
  );
};

export default RpiPage;
