import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const GoogleLoginComp = () => {
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Login bem-sucedido:", credentialResponse);
          navigate("/");
        }}
        onError={() => {
          console.log("Erro no login");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComp;
