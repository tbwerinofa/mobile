import { ChildDashboardItem } from "./ChildDashboardItem";
export interface DashboardItem {
  Id: number;
  Ordinal: number;
  Name: string;
  Count: number;
  ChildList: ChildDashboardItem;
}
