import { TInventoryItem } from "./TInventoryItem";

export type TProject = {
  id: number;
  name: string;
  items: TInventoryItem[];
};
