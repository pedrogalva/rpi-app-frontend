import { Box, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosCustom from "../../hooks";

import MessageContainer from "../components/message-container";
import Header from "../components/header";
import ChannelsTable from "./ChannelsTable";
import UpdateIntegrationModal from "./UpdateIntegrationModal";
import DeleteIntegrationModal from "./DeleteIntegrationModal";
import { filledButtonSx } from "../components/_style/button";

type DispatchesData = {
  dispatch_id: number;
  dispatch_name: string;
}[];

type SlackData = {
  channel_id: number;
  channel_name: string;
}[];

const IntegrationPage = () => {
  const [isCreateIntegrationOpen, setIsCreateIntegrationOpen] = useState(false);
  const [isDeleteIntegrationOpen, setIsDeleteIntegrationOpen] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const [integrationsData, refetchIntegrations] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_slack_integration/" + id
  );

  const [slackChannelsData, refetchChannels] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_slack_channels"
  );

  const [dispatchesData, refetchDispatches] = useAxiosCustom(
    process.env.REACT_APP_BACKEND_BASE_URL + "/rpi/get_dispatches"
  );

  const [deleteData, executeDelete] = useAxiosCustom(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/rpi/delete_slack_integration/${id}`,
      method: "DELETE",
    },
    { manual: true }
  );

  const handleFormClosure = (_isCreateIntegrationOpen: boolean) => {
    setIsCreateIntegrationOpen(_isCreateIntegrationOpen);
  };

  const handleDeleteFormClosure = (_isDeleteIntegrationOpen: boolean) => {
    setIsDeleteIntegrationOpen(_isDeleteIntegrationOpen);
  };

  const handleDeleteFormConfirm = async (_isDeleteIntegrationOpen: boolean) => {
    setIsDeleteIntegrationOpen(_isDeleteIntegrationOpen);
    await executeDelete();
    navigate("/");
  };

  if (
    integrationsData.loading ||
    slackChannelsData.loading ||
    dispatchesData.loading ||
    deleteData.loading
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
    dispatchesData.error ||
    deleteData.error
  ) {
    let errorVar = integrationsData.error
      ? integrationsData.error
      : slackChannelsData.error
      ? slackChannelsData.error
      : dispatchesData.error
      ? dispatchesData.error
      : deleteData.error
      ? deleteData.error
      : { message: "Erro" };
    return (
      <MessageContainer>
        <Box>Error loading integrations {errorVar.message}</Box>
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
          sx={{ cursor: "pointer" }}
          variant="contained"
          onClick={() => {
            setIsCreateIntegrationOpen(true);
          }}
        >
          EDITAR
        </Button>
        <Button
          sx={{ cursor: "pointer" }}
          variant="contained"
          color="error"
          onClick={() => {
            setIsDeleteIntegrationOpen(true);
          }}
        >
          APAGAR
        </Button>
      </Box>
      <ChannelsTable channels={integrationsData.data.data} />
      <UpdateIntegrationModal
        open={isCreateIntegrationOpen}
        selectedIntegration={formatSelectedData(integrationsData.data.data[0])}
        dispatchesData={formmatDataDispatches(dispatchesData.data.data)}
        channelsData={formmatDataChannels(slackChannelsData.data.data)}
        handleClose={() => handleFormClosure(!isCreateIntegrationOpen)}
        handleSubmission={() => refetchIntegrations()}
      />
      <DeleteIntegrationModal
        open={isDeleteIntegrationOpen}
        handleConfirm={() => handleDeleteFormConfirm(!isDeleteIntegrationOpen)}
        handleClose={() => handleDeleteFormClosure(!isDeleteIntegrationOpen)}
      />
    </Box>
  );
};

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

const formatSelectedData = (data: any) => {
  return {
    id: data.integration_id,
    channelName: data.channel_name,
    dispatchName: data.inpi_dispatch_name,
    createMoskitCard: data.create_moskit_card,
    active: data.active,
  };
};

export default IntegrationPage;
