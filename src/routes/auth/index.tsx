import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Box, CircularProgress, Button } from "@mui/material";

import useAxiosCustom from "../../hooks";
import { useAuth } from "../context/AuthContext";
import MessageContainer from "../components/message-container";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const GoogleLoginComp = () => {
  const { login, logout, validateLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (validateLogin()) {
      navigate("/");
    } else {
      logout();
    }
  }, [validateLogin, logout, navigate]);

  const [searchParams] = useSearchParams();

  const _url = `?red=${searchParams.get("red")}`;

  const [{ loading, error }, verifyCreds] = useAxiosCustom(
    {
      url: `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/verify${_url}`,
      method: "POST",
    },
    { manual: true }
  );

  const handleLoginSuccess = async (data: any) => {
    const response = await verifyCreds({ data });
    const token = response.data.token.access_token;

    if (token) {
      login();
      localStorage.setItem("token", token);

      if (response.data.redirect) {
        const url = atob(response.data.redirect);
        if (
          !url.includes("auth") &&
          !url.includes("null") &&
          !url.includes("undefined") &&
          !response.data.redirect.includes("null")
        ) {
          navigate(url);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  };

  if (error) {
    return (
      <MessageContainer>
        <Box>
          Error loading integrations {error.message}. Try again. You must use
          your @moveonmarcas.com.br email.
        </Box>
        <p></p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          RETRY
        </Button>
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
