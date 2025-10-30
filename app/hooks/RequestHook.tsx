import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { RequestContainer } from "../types/RequestContainer";

export const RequestDataAPI = {
  UseFetchRequests: (id: number, token: string) => {
    let data = useQuery<Request[], AxiosError>({
      queryKey: ["RequestByStateMachine" + id.toString()],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/Request/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });

    return data;
  },
  UseFetchRequestByStateandProject: (
    id: number,
    projectId: number,
    token: string
  ) => {
    let data = useQuery<Request[], AxiosError>({
      queryKey: [`RequestByStateMachine_${id}_Project_${projectId}`],
      queryFn: () =>
        fetch(
          `${config.baseApiUrl}/api/Request/?id=${id}&projectId=${projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json()),
    });

    return data;
  },
  useFetchRequestResidentialUnit: (id: number, token: string) => {
    let data = useQuery<RequestContainer, AxiosError>({
      queryKey: ["RequestResidentialUnit" + id.toString()],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/RequestResidentialUnit/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });

    return data;
  },
};
