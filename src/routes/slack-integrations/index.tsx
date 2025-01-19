import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import useAxios from "axios-hooks";

import MessageContainer from "../components/message-container";
import Header from "../components/header";
import ChannelsTable from "./ChannelsTable";
import CreateIntegrationModal from "./CreateIntegrationModal";
import { filledButtonSx } from "../components/_style/button";

type DispatchesData = {
  dispatch_id: number;
  dispatch_name: string;
}[];

type SlackData = {
  channel_id: number;
  channel_name: string;
}[];

const SlackIntegrationPage = () => {
  const [isCreateIntegrationOpen, setIsCreateIntegrationOpen] = useState(false);

  const [integrationsData, refetchIntegrations] = useAxios(
    process.env.REACT_APP_BACKEND_BASE_URL +
      "/rpi/get_slack_integrations?limit=50"
  );

  const [slackChannelsData, refetchChannels] = useAxios(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_slack_channels"
  );

  const [dispatchesData, refetchDispatches] = useAxios(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_dispatches"
  );

  const handleFormClosure = (_isCreateIntegrationOpen: boolean) => {
    setIsCreateIntegrationOpen(_isCreateIntegrationOpen);
  };

  if (
    integrationsData.loading ||
    slackChannelsData.loading ||
    dispatchesData.loading
  ) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (
    integrationsData.error ||
    slackChannelsData.error ||
    dispatchesData.error
  ) {
    let errorVar = integrationsData.error
      ? integrationsData.error
      : slackChannelsData.error
      ? slackChannelsData.error
      : dispatchesData.error
      ? dispatchesData.error
      : { message: "Erro" };
    return (
      <MessageContainer>
        <Box>Error loading users {errorVar.message}</Box>
        <Button variant="contained" onClick={() => refetchIntegrations()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header
        title={"RPI App"}
        subtitle={
          "Esse app tem como finalidade facilitar a gestão de integrações da RPI com o Slack"
        }
      />
      <Box sx={filledButtonSx}>
        <Button
          variant="contained"
          onClick={() => {
            setIsCreateIntegrationOpen(true);
          }}
        >
          CADASTRAR INTEGRAÇÃO
        </Button>
      </Box>
      <ChannelsTable channels={integrationsData.data.data} />
      <CreateIntegrationModal
        open={isCreateIntegrationOpen}
        dispatchesData={formmatDataDispatches(dispatchesData.data.data)}
        channelsData={formmatDataChannels(slackChannelsData.data.data)}
        handleClose={() => handleFormClosure(!isCreateIntegrationOpen)}
        handleSubmission={() => refetchIntegrations()}
      />
    </Box>
  );
};

export default SlackIntegrationPage;

const formmatDataDispatches = (data: DispatchesData) => {
  return data.map((disp) => ({
    id: Number(disp.dispatch_id),
    label: disp.dispatch_name,
  }));
};

const formmatDataChannels = (data: SlackData) => {
  return data.map((disp) => ({
    id: Number(disp.channel_id),
    label: disp.channel_name,
  }));
};
