import { Project } from "../types/Project";
import config from "../../utils/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

const useFetchProjectList = (token: string) => {
  return useQuery<Project[], AxiosError>({
    queryKey: ["Project"],
    queryFn: () =>
      fetch(`${config.baseApiUrl}/api/Project/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });
};

export default useFetchProjectList;
