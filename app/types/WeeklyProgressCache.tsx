export interface WeeklyProgressCache {
  Id: number;
  Project: string;
  Contractor: string;
  MilestoneOrdinal: number;
  MilestoneDefinition: boolean;
  UnitCount: number;
  CurrentCount: number;
  Budget: string;
  Rate: string;
  CurrentClaim: string;
  TotalClaimed: string;
  BalanceClaim: string;
  ServiceType: string;
}
