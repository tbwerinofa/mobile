import { ResidentialUnit } from "../types/ResidentialUnit";
import config from "../../utils/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const useFetchResidentialUnitList = (id: number, token: string) => {
  return useQuery<ResidentialUnit[], AxiosError>({
    queryKey: ["ResidentialUnit"],
    queryFn: () =>
      fetch(`${config.baseApiUrl}/api/residentialunit/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });
};

export default useFetchResidentialUnitList;
