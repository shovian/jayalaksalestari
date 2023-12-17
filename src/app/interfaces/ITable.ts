import { ITableColumn } from "./ITableColumn";

export interface ITable {
  columns: ITableColumn[];
  data: any[];
  onViewDetail?: (itemId: any) => void;
  onEdit?: (itemId: any) => void;
  onDelete?: (itemId: any) => void;

  onCustom?: (itemId: any) => void;
  actionable?: boolean;
  canEdit?: boolean;
  canViewDetail?: boolean;
  canDelete?: boolean;
  customAction?: React.ReactNode;
}
