import { TUserLogin } from "../TUserLogin";

export type TAdminKeuangan = TUserLogin & {
  role: "admin_keuangan";
};
