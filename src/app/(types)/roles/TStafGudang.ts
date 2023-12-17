import { TUserLogin } from "../TUserLogin";

export type TStafGudang = TUserLogin & {
  role: "staf_gudang";
  saldo: number;
};
