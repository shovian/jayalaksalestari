import { TBoughtItem } from "./TBoughtItem";
import { TBoughtNonItem } from "./TBoughtNonItem";

export type TFundRequest = {
  id: number;
  id_user: number;
  goods: TBoughtItem[];
  non_goods: TBoughtNonItem[];
};
