import React from "react";
import {
  Alert,
  Box,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useAxios from "axios-hooks";

type Props = { handleClose: () => void; open: boolean };

const DeleteIntegrationModal = ({ handleClose, open }: Props) => {
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
      ></Box>
    </Modal>
  );
};

export default DeleteIntegrationModal;
