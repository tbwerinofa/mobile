import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { ProgressReport } from "../types/ProgressReport";
import { WeeklyProgressCache } from "../types/WeeklyProgressCache";

export const FetchProgressReportListDataAPI = {
  useFetchProgressReportList: (token: string) => {
    return useQuery<ProgressReport[], AxiosError>({
      queryKey: ["ProgressReport"],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/ProgressReport`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  },
  useFetchProgressReportById: (id: number, token: string) => {
    return useQuery<WeeklyProgressCache[], AxiosError>({
      queryKey: ["WeeklyProgressCache" + id.toString()],
      queryFn: () =>
        fetch(`${config.baseApiUrl}/api/ProgressReport/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });
  },
};
