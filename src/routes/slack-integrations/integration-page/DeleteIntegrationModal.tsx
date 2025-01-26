import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";

type Props = {
  handleClose: () => void;
  handleConfirm: () => void;
  open: boolean;
};

const DeleteIntegrationModal = ({
  handleClose,
  handleConfirm,
  open,
}: Props) => {
  const [loading] = useState(false);

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
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          Confirmar Exclusão
        </Typography>
        <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
          Você tem certeza que deseja excluir este item? Esta ação não pode ser
          desfeita.
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Excluir"
            )}
          </Button>
        </Box>{" "}
      </Box>
    </Modal>
  );
};

export default DeleteIntegrationModal;
