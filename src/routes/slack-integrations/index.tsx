import { Box, Button } from "@mui/material";
import React from "react";
import useAxios from "axios-hooks";

import Header from "../../components/header";
import ChannelsTable from "./ChannelsTable";
import { filledButtonSx } from "../../components/_style/button";

const channels = [
  {
    integration_id: 1,
    dispatch_name: "abc",
    channel_name: "def",
    create_moskit_deal: false,
    active: true,
  },
  {
    integration_id: 2,
    dispatch_name: "ghi",
    channel_name: "jkl",
    create_moskit_deal: true,
    active: false,
  },
];

const SlackIntegrationPage = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://reqres.in/api/channels?delay=1"
  );

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header
        title={"Garmin-Bora App"}
        subtitle={
          "Esse app tem como finalidade atualizar os treinos criados pela boradentro do site da Garmin"
        }
      />
      <Button variant="contained" sx={filledButtonSx} onClick={() => {}}>
        CADASTRAR INTEGRAÇÃO
      </Button>
      <ChannelsTable channels={channels} />
    </Box>
  );
};

export default SlackIntegrationPage;
