import { Alert, Box, Button, Modal, Checkbox } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";

import SelectDropdow from "../components/select";

type Props = {
  handleClose: () => void;
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
  open,
  dispatchesData,
  channelsData,
}: Props) => {
  const { register, handleSubmit } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/rpi/create_new_rpi_slack_integration`,
      method: "POST",
    },
    { manual: true }
  );

  const onFormSubmit = async (data: FieldValues) => {
    await executePost({ data });
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
        <>
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
                  Sorry - there was an error creating the integration
                </Alert>
              )}
              <SelectDropdow
                data={dispatchesData}
                defaultValue=""
                fieldName="Despacho"
                {...register("dispatch")}
              />
              <SelectDropdow
                data={channelsData}
                defaultValue=""
                fieldName="Canal do Slack"
                {...register("slackChannel")}
              />
              <Box>
                <Checkbox {...register("slackChannel")} />
                <>Criar card no Moskit?</>
              </Box>
              <Button variant="contained" type="submit" disabled={loading}>
                Create User
              </Button>
            </Box>
          </form>
        </>
      </Box>
    </Modal>
  );
};

export default CreateIntegrationModal;
