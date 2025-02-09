import React, { useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import { Box, Button, CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import useAxiosCustom from "../../../hooks";
import MessageContainer from "../../components/message-container";
import Header from "../../components/header";
import DispatchesTable from "../../components/dispatches-table";

const SingleRpiPage = () => {
  const _limit = 50;

  const [searchParams] = useSearchParams();
  const { rpi_type } = useParams();

  let backend_rpi_type = "marcas";

  if (rpi_type) {
    backend_rpi_type = rpi_type.toLowerCase();
  }

  const _rpi_num = searchParams.get("rpi_number")
    ? searchParams.get("rpi_number")
    : "todas as RPIs";

  const _url = `rpi_number=${searchParams.get("rpi_number")}`;

  const [{ error, data, loading }, refetchRpis] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL +
      `/rpi/dispatches/query_dispatches_${backend_rpi_type}?limit=${_limit}&${_url}`
  );

  const handlePageChange = (page: number) => {
    refetchRpis({
      url:
        process.env.REACT_APP_BACKEND_BASE_URL +
        `/rpi/dispatches/query_dispatches_${backend_rpi_type}?limit=${_limit}&${_url}&page=${page}`,
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
        <Box>Error loading rpis {error.message}</Box>
        <Button variant="contained" onClick={() => refetchRpis()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header title={"Despachos"} subtitle={"RPI: " + _rpi_num} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 8 }} />
      <DispatchesTable dispatches={data.data} />
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

export default SingleRpiPage;
