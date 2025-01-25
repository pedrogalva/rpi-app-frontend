import { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";

type Man = {
  manual: boolean;
};

const useAxiosCustom = (
  axiosConfig: AxiosRequestConfig | string,
  manual: Man | undefined = undefined
) => {
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
  const [config, refetch] = result;

  if (config.error?.status === 401) {
    localStorage.removeItem("token");
    navigate("/auth");
  }

  return result;
};

export default useAxiosCustom;
