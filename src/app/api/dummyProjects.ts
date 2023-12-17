import { TProject } from "../types/TProject";

const dummyProjects: TProject[] = [
  {
    id: 1,
    name: "Raja Brawijaya",
    items: [
      {
        id: 1,
        name: "Laptop",
        assignedQuantity: 15,
        unassignedQuantity: -5,
        price: 999.99,
      },
      {
        id: 2,
        name: "Smartphone",
        assignedQuantity: 20,
        unassignedQuantity: 20,
        price: 699.99,
      },
      {
        id: 3,
        name: "Headphones",
        assignedQuantity: 5,
        unassignedQuantity: 10,
        price: 149.99,
      },
      {
        id: 4,
        name: "Tablet",
        assignedQuantity: 10,
        unassignedQuantity: 5,
        price: 499.99,
      },
    ],
  },
  {
    id: 2,
    name: "Gebyar Brawijaya Qurani",
    items: [
      {
        id: 4,
        name: "Tablet",
        assignedQuantity: 5,
        unassignedQuantity: 5,
        price: 499.99,
      },
      {
        id: 5,
        name: "Camera",
        assignedQuantity: 2,
        unassignedQuantity: 8,
        price: 799.99,
      },
    ],
  },
  // Add more dummy projects as needed
];

export default dummyProjects;
