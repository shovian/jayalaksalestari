import React from "react";
import DashboardCard from "./DashboardCard";

interface DashboardSummaryProps {
  data: {
    totalInventoryCount: number;
    pendingOrders: number;
    orderFulfillmentRate: number;
    incomingShipments: number;
    outgoingShipments: number;
  };
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ data }) => (
  <DashboardCard title="Dashboard Summary">
    <p>Total Inventory Count: {data.totalInventoryCount}</p>
    <p>Pending Orders: {data.pendingOrders}</p>
    <p>Order Fulfillment Rate: {data.orderFulfillmentRate}%</p>
    <p>Incoming Shipments: {data.incomingShipments}</p>
    <p>Outgoing Shipments: {data.outgoingShipments}</p>
  </DashboardCard>
);

export default DashboardSummary;
