import React from "react";
import DashboardCard from "./DashboardCard";

interface OrderStatusProps {
  data: {
    openOrders: number;
    inProgressOrders: number;
    readyToShipOrders: number;
    urgentOrders: number;
  };
}

const OrderStatus: React.FC<OrderStatusProps> = ({ data }) => (
  <DashboardCard title="Order Status">
    <p>Open Orders: {data.openOrders}</p>
    <p>In Progress Orders: {data.inProgressOrders}</p>
    <p>Ready to Ship Orders: {data.readyToShipOrders}</p>
    <p>Urgent Orders: {data.urgentOrders}</p>
  </DashboardCard>
);

export default OrderStatus;
