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
  dispatchesData: {
    id: number;
    label: string;
  }[];
  channelsData: {
    id: number;
    label: string;
  }[];
};

const CreateIntegrationModal = ({
  handleClose,
  handleSubmission,
  open,
  dispatchesData,
  channelsData,
}: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      rpi_dispatch_id: "",
      slack_channel_id: "",
      create_moskit_card: false,
      active: false,
    },
  });

  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/rpi/create_new_rpi_slack_integration`,
      method: "POST",
    },
    { manual: true }
  );

  const onFormSubmit = async (data: any) => {
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
                Sorry - there was an error creating the integration -{" "}
                {error.message}
              </Alert>
            )}
            <Controller
              name="rpi_dispatch_id"
              control={control}
              render={({ field }) => (
                <SelectDropdow
                  data={dispatchesData}
                  defaultValue={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  fieldName="Despacho"
                />
              )}
            />
            <Controller
              name="slack_channel_id"
              control={control}
              render={({ field }) => (
                <SelectDropdow
                  data={channelsData}
                  defaultValue={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  fieldName="Canal do Slack"
                />
              )}
            />
            <Controller
              name="create_moskit_card"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Criar card no Moskit?"
                />
              )}
            />
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Ativo?"
                />
              )}
            />

            <Button variant="contained" type="submit" disabled={loading}>
              CRIAR
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateIntegrationModal;
