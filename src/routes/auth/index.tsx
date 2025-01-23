import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Box, CircularProgress, Button } from "@mui/material";
import useAxios from "axios-hooks";

import MessageContainer from "../components/message-container";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const GoogleLoginComp = () => {
  const navigate = useNavigate();

  const [{ loading, error }, verifyCreds] = useAxios(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/rpi/auth/verify`,
      method: "POST",
    },
    { manual: true }
  );

  const handleLoginSuccess = async (data: any) => {
    await verifyCreds({ data });
    navigate("/");
  };

  if (error) {
    return (
      <MessageContainer>
        <Box>
          Error loading integrations {error.message}. Try again. You must use
          your @moveonmarcas.com.br email.
        </Box>
      </MessageContainer>
    );
  }

  if (loading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }} component="section">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin
          theme="filled_blue"
          shape="rectangular"
          onSuccess={(credentialResponse) => {
            handleLoginSuccess(credentialResponse);
          }}
          onError={() => {
            console.log("Erro no login");
          }}
        />
      </GoogleOAuthProvider>
    </Box>
  );
};

export default GoogleLoginComp;
