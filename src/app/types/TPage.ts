import { ITable } from "../interfaces/ITable";

export type TPage = {
  canAdd?: boolean;
  onAdd?: (id: string | null) => void;
  addId?: string | null;
  viewId?: string | null;
  editId?: string | null;
  deleteId?: string | null;
  addComponent?: React.ReactNode;
  viewComponent?: React.ReactNode;
  editComponent?: React.ReactNode;
  deleteComponent?: React.ReactNode;
  table?: ITable;
  name?: String;
  userType: String;
};
