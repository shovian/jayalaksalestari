import React from "react";
import DashboardCard from "./DashboardCard";

interface InventoryOverviewProps {
  data: {
    lowStockItems: string[];
    stockShortages: number;
  };
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ data }) => (
  <DashboardCard title="Inventory Overview">
    <p>Low Stock Items: {data.lowStockItems.join(", ")}</p>
    <p>Stock Shortages: {data.stockShortages}</p>
  </DashboardCard>
);

export default InventoryOverview;
