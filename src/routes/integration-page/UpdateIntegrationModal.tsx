import {
  Alert,
  Box,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useAxios from "axios-hooks";
import { useForm, Controller } from "react-hook-form";

import SelectDropdow from "../components/select";

type Props = {
  handleClose: () => void;
  handleSubmission: () => void;
  open: boolean;
  selectedIntegration: {
    id: number;
    channelName: string;
    dispatchName: string;
    createMoskitCard: boolean;
    active: boolean;
  };
  dispatchesData: {
    id: number;
    label: string;
  }[];
  channelsData: {
    id: number;
    label: string;
  }[];
};

const UpdateIntegrationModal = ({
  handleClose,
  handleSubmission,
  open,
  dispatchesData,
  channelsData,
  selectedIntegration,
}: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      rpi_dispatch_id: dispatchesData.find(
        (item) => item.label === selectedIntegration.dispatchName
      )?.id,
      slack_channel_id: channelsData.find(
        (item) => item.label === selectedIntegration.channelName
      )?.id,
      create_moskit_card: selectedIntegration.createMoskitCard,
      active: selectedIntegration.active,
    },
  });

  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/rpi/update_rpi_slack_integration`,
      method: "POST",
    },
    { manual: true }
  );

  const onFormSubmit = async (data: any) => {
    data.integration_id = selectedIntegration.id;
    await executePost({ data });
    handleSubmission();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {error && (
              <Alert severity="error">
                Sorry - there was an error updating the integration.
              </Alert>
            )}
            <Controller
              name="rpi_dispatch_id"
              control={control}
              render={({ field }) => (
                <SelectDropdow
                  data={dispatchesData}
                  defaultValue={
                    dispatchesData.find((item) => item.id === field.value)
                      ?.label
                  }
                  fieldName="Despacho"
                  {...field}
                />
              )}
            />
            <Controller
              name="slack_channel_id"
              control={control}
              render={({ field }) => (
                <SelectDropdow
                  data={channelsData}
                  defaultValue={
                    channelsData.find((item) => item.id === field.value)?.label
                  }
                  fieldName="Canal do Slack"
                  {...field}
                />
              )}
            />
            <Box>
              <Controller
                name="create_moskit_card"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Criar Moskit Card"
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Ativo?"
                  />
                )}
              />
            </Box>
            <Button variant="contained" type="submit" disabled={loading}>
              EDITAR
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateIntegrationModal;
