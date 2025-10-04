import { ChildDashboardItem } from "./ChildDashboardItem";
export interface DashboardItem {
  Count: number;
  DateTimeStampString: string;
  Discriminator: string;
  Id: number;
  Icon: string;
  Group: string;
  Message: string;
  Name: string;
  Ordinal: number;
  Status: string;
  Url: string;
  ChildList: ChildDashboardItem;
}
