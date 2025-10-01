import { Request } from "./Request";
import { RequestResidentialUnit } from "./RequestResidentialUnit";

export interface RequestContainer {
  Request: Request;
  //ProjectNo: string;
  //ReportDateString: string;
  RequestResidentialUnits: RequestResidentialUnit;
  //  IsWeeklyApproved: boolean;
  ////DocumentGuid: string;
  //CurrentCount: number;
  CurrentClaim: string;
}
