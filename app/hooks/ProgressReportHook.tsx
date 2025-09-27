import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { ProgressReport } from "../types/ProgressReport";

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
};
