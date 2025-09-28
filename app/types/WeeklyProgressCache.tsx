import { MilestoneResultSet } from "./MilestoneResultSet";

export interface WeeklyProgressCache {
  Id: number;
  Project: string;
  ProjectId: number;
  Contractor: string;
  CurrentClaim: string;
  TotalClaimed: string;
  BalanceClaim: string;
  UnitCount: number;
  ReportDateString: string;
  MilestoneResultSet: MilestoneResultSet[];
}
