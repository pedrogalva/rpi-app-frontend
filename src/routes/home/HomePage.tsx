import React from "react";

import { Box } from "@mui/system";
import Header from "../components/header";

export const HomePage = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <Header
        title={"RPI App"}
        subtitle={
          "Esse App tem como intuito auxiliar a gestão da RPI. Utilize o menu à esquerda para navegar."
        }
      />
    </Box>
  );
};
