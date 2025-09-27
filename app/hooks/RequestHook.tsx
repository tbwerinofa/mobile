import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import config from "../../utils/config";
import { Request } from "../types/Request";

export const RequestDataAPI = {
  UseFetchRequests: (id: number, token: string) => {
    let data = useQuery<Request[], AxiosError>({
      queryKey: ["Request" + id.toString()],
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
};
