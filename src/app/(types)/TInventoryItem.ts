export type TInventoryItem = {
  id: number;
  name: string;
  assignedQuantity: number; // Quantity assigned to a project
  unassignedQuantity: number; // Quantity not yet assigned to a project
  price: number;
};
