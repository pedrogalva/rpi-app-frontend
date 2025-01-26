import { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./routes/context/AuthContext";

type Man = {
  manual: boolean;
};

const useAxiosCustom = (
  axiosConfig: AxiosRequestConfig | string,
  manual: Man | undefined = undefined
) => {
  const { logout, login } = useAuth();
  const currentPath = window.location.pathname.replace("/front_rpi", "");
  const navigate = useNavigate();

  if (typeof axiosConfig === "string") {
    axiosConfig = {
      url: axiosConfig,
      method: "GET",
    };
  }

  if (!axiosConfig.headers) axiosConfig.headers = {};

  axiosConfig.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  const result = useAxios(axiosConfig, manual);
  const [config] = result;

  if (config.error?.status === 401) {
    localStorage.removeItem("token");
    logout();

    if (!currentPath.includes("/auth")) {
      navigate("/auth?red=" + btoa(currentPath));
    }
  } else {
    login();
  }

  return result;
};

export default useAxiosCustom;
