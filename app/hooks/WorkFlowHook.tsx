import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { Request } from "../types/Request";

export const FetchStandingDataAPI = {
  UseFetchStateMachines: (token: string) => {
    return useQuery<Request[], AxiosError>({
      queryKey: ["WorkFlow"],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/StandingData/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  },
};
