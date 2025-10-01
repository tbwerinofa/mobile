import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { Project } from "../types/Project";

export const FetchProjectAPI = {
  useFetchList: (token: string) => {
    return useQuery<Project[], AxiosError>({
      queryKey: ["Projects"],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/Project/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  },
  useFetchDetail: (id: number, token: string) => {
    return useQuery<Project[], AxiosError>({
      queryKey: ["Project" + id],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/Project//${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  },
};
