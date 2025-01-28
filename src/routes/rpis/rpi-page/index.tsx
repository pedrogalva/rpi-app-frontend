import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import useAxiosCustom from "../../../hooks";
import MessageContainer from "../../components/message-container";
import Header from "../../components/header";
import RpisTable from "./RpisTable";

const RpiPage = () => {
  const [{ error, data, loading }, refetchRpis] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_rpis?limit=50"
  );

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
    <Box>
      <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
        <Header
          title={"RPIs"}
          subtitle={
            "Esta página contém todas as RPIs que contiveram algum despacho da Move On."
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <RpisTable rpis={data.rpis} />
        <Pagination
          count={Math.ceil(Number(data.total) / 50)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RpiPage;
