import { Box } from "@mui/system";
import React from "react";

import { subtitleSx, titleSx } from "../_style/sx";

type Props = {
  title: string;
  subtitle: string;
};

const Header = (props: Props) => {
  return (
    <Box>
      <Box sx={titleSx}>{props.title}</Box>
      <Box sx={subtitleSx}>{props.subtitle}</Box>
    </Box>
  );
};

export default Header;
