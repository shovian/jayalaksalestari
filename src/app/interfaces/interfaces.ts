interface Employee {
  name: string;
  email: string;
  role: string;
  logout(): void;
}

interface StafGudang extends Employee {
  saldo: number;
  verifyAttendance(): void;
  createFundRequest(request: FundRequest): void;
  // Additional properties and methods specific to Staf Gudang
}

interface ManagerGudang extends Employee {
  addItem(item: InventoryItem): void;
  assignItem(item: InventoryItem, project: Project): void;
  // Additional properties and methods specific to Manager Gudang
}

interface PemilikUsaha extends Employee {
  addProject(project: Project): void;
  approveFundRequest(request: FundRequest): void;
  // Additional properties and methods specific to Pemilik Usaha
}

interface AdminHRD extends Employee {
  // Additional properties and methods specific to Admin HRD
}

interface AdminKeuangan extends Employee {
  transferFundRequest(request: FundRequest): void;
  // Additional properties and methods specific to Admin Keuangan
}

interface InventoryItem {
  itemtype?: string;
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  budget?: number;
}
interface Inventory {
  items: InventoryItem[];
  showItems(): InventoryItem[];
}
interface FundRequest {
  employee: StafGudang;
  items: InventoryItem[];
  operationalCost: number;
  status: "processed" | "approved" | "transferred";
}

interface Project {
  name: string;
  items: InventoryItem[];
  contactPerson: string;
  budget: number;
  startProject?(): void;
  endProject?(): void;
}

interface Attendance {
  employeeId: string;
  date: Date;
  status: "attend" | "not-attend";
}

// interface User {
//   email: string;
//   password: string;
//   login(): void;
// }
